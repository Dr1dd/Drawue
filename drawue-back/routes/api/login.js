const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const { User, validateLogin } = require('../../models/user');
const express = require('express');
const router = express.Router();

 
router.post('/', async (req, res) => {
    // First Validate The HTTP Request
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    //  Now find the user by their email address
    let user = await User.findOne({$or: [{ username: req.body.username_email}, {email: req.body.username_email}]});
    if (!user) {
        return res.status(400).send('Incorrect username or password.');
    }
    if(user.emailConfirmed==false) return res.status(400).send('Please confirm your email address before logging in.');
    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect username or password.');
    }
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'), {expiresIn: '1m'});
    const refreshToken = jwt.sign({ _id: user._id }, config.get('PrivateKey2'), {expiresIn: '7d'});
    res.cookie('access-token', token,{
        maxAge: 1000*60*2,
        httpOnly: true,
    })
    res.cookie('refresh-token', refreshToken,{
        maxAge: 1000*60*60*24*7,
        httpOnly: true,
    })
    res.status(200).send("Authorized");

});


module.exports = router;