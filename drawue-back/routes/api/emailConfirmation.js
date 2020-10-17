const config = require('config');
const { User, validateEmail, validatePassword } = require('../../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/:token', async (req, res) => {
    try{
        const { _id } = jwt.verify(req.params.token, config.get('Email_Secret'));
        await User.findOne({_id: _id}, function(err, user){
            user.confirmed = true;
            user.save();
           // res.render('confirmed', { confirmedMessage: "Your account has been activated successfully. You can now login."});
        })
    }
    catch(err){
        //res.render('error', { 'errorMessage': "Account confirmation link may have expired."});
    }
});
module.exports = router;
