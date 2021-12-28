const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();

const maxAccessTokenAge = 1000 * 60 * 2;
const maxRefreshTokenAge = 1000 * 60 * 60 * 24 * 7;
router.get('/', async (req, res) => {
    if(req.user){
        const token = jwt.sign({ _id: req.user._id }, config.get('PrivateKey'), {expiresIn: '1m'});
        const refreshToken = jwt.sign({ _id: req.user._id }, config.get('PrivateKey2'), {expiresIn: '7d'});
        res.cookie('access-token', token,{
            maxAge: maxAccessTokenAge,
            httpOnly: true,
        });
        res.cookie('refresh-token', refreshToken,{
            maxAge: maxRefreshTokenAge,
            httpOnly: true,
        });
    }

    res.redirect('/');
    
  });
module.exports = router;