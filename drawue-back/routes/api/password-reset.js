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
    let validated_email = req.body.restoreEmail.toString();
    User.findOne({email: validated_email}, function(user_err, user){
        if(!user){
            res.status(400).send({"sendError": "No Account with that email found."});
        }
        var token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 3600000;
        user.save(function(user_save_err) {
            if(user_save_err) console.log(user_save_err);
            sendResetEmail(validated_email);
            return res.status(200).send("Reset token has been sent to"+ validated_email)
        });
        res.end();
    })

});
function sendResetEmail(email) {
     var transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'breanna47@ethereal.email',
            pass: 'GATtSQuHj6xhXkCdRS'
        }
    });
    transporter.sendMail({
        from: '"Alphonso DuBuque" alphonso.dubuque@ethereal.email', // sender address
        to: email, // list of receivers
        subject: "Reset password", // Subject line
        text: "http://localhost:5000/reset/"+token, // plain text body
        html: "<b>http://localhost:5000/reset"+token+"</b>", // html body
    });
}
router.post('/reset', async (req, res) =>{
    var pass =req.body.password;
    var passObj = {'password': pass};
    const { error } = validatePassword(passObj);
    if(error){
      res.send({ errorMessage: error.details[0].message });
    }
    const salt = await bcrypt.genSalt(10);
    pass = await bcrypt.hash(pass, salt);
    let reset_token = req.body.token.toString();
    User.findOne({ resetPasswordToken: reset_token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
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
router.post('/valid', async (req, res) => {
    let reset_token = req.body.token.toString();
    User.findOne({ resetPasswordToken: reset_token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            res.status(400).send({ errorMessage: "Password reset token is invalid or has expired."});
        }
        else res.send();
  });
});

module.exports = router;