const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if(req.user){
        const token = jwt.sign({ _id: req.user._id }, config.get('PrivateKey'), {expiresIn: '1m'});
        const refreshToken = jwt.sign({ _id: req.user._id }, config.get('PrivateKey2'), {expiresIn: '7d'});
        res.cookie('access-token', token,{
            maxAge: 1000*60*2,
            httpOnly: true,
        });
        res.cookie('refresh-token', refreshToken,{
            maxAge: 1000*60*60*24*7,
            httpOnly: true,
        });
    }

    res.redirect('/');
    
  });
module.exports = router;