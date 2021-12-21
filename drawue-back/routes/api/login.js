const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const { User, validateLogin } = require('../../models/user');
const express = require('express');
const router = express.Router();

const maxAccessTokenAge = 1000 * 60 * 2;
const maxRefreshTokenAge = 1000 * 60 * 60 * 24 * 7;
router.post('/', async (req, res) => {
    // First Validate The HTTP Request
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let validated_username_or_email = req.body.username_email.toString();
 
    //  Now find the user by their email address
    let user = await User.findOne({$or: [{ username: validated_username_or_email}, {email: validated_username_or_email}]});
    if (!user) {
        return res.status(400).send('Incorrect username or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect username or password.');
    }
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'), {expiresIn: '1m'});
    const refreshToken = jwt.sign({ _id: user._id }, config.get('PrivateKey2'), { expiresIn: '7d' });
    
    setTokenCookies(token, refreshToken, res);
    
    res.status(200).send("Authorized");

});
function setTokenCookies(accessToken, refreshToken, res) {
    res.cookie('access-token', accessToken,{
        maxAge: maxAccessTokenAge,
        httpOnly: true,
    })
    res.cookie('refresh-token', refreshToken,{
        maxAge: maxRefreshTokenAge,
        httpOnly: true,
    })
}


module.exports = router;