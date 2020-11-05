const config = require('config');
const { User, validateEmail, validatePassword } = require('../../models/user');
const bcrypt = require('bcrypt');
global.crypto = require('crypto');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) =>{
    var newObj = {'email': req.body.restoreEmail};
    const { error } = validateEmail(newObj);
    if (error) {
        return res.status(400).send({"sendError": error.details[0].message});
    }
    User.findOne({email: req.body.restoreEmail}, function(err, user){
        if(!user){
            res.status(400).send({"sendError": "No Account with that email found."});
        }
        var token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 3600000;
        user.save(function(err) {
            if(err) console.log(err);

            console.log('http://localhost:5000/reset/'+token);
        });
        res.end();
    
    })

});

router.post('/reset', async (req, res) =>{
    var pass =req.body.password;
    var passObj = {'password': pass};
    const { error } = validatePassword(passObj);
    if(error){
      res.send({ errorMessage: error.details[0].message });
    }
    const salt = await bcrypt.genSalt(10);
    pass = await bcrypt.hash(pass, salt);
    User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            res.send({ errorMessage: "Password reset token is invalid or has expired."});
        }
        if(req.body.password == req.body.confirmPassword){
            user.password = pass;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save().then(()=>{
                return res.send({ success: "Password has been successfully changed."});
            })
            .catch(()=>{
                return res.status(400).send({ errorMessage: "An error occurred while trying to set new password"});
            });
        }
        else{
            res.send({passConfirm: "Passwords do not match!"});
        }
  });
});
router.post('/valid', async (req, res)=>{
    User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            res.status(400).send({ errorMessage: "Password reset token is invalid or has expired."});
        }
        else res.send();
  });
});

module.exports = router;