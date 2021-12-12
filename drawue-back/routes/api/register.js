const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const { User, validate } = require('../../models/user');


router.post('/', async (req, res) => {
    var {confirmPassword, ...validationBody} = req.body;
    const { error } = validate(validationBody);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    if(req.body.password != req.body.confirmPassword) return res.status(400).send({'passwordConfirm': 'Passwords do not match!'});
    let user = await User.findOne({$or: [{ username: req.body.username}, {email: req.body.email}]});
    if(user){
        if(user.username == req.body.username)
            return res.status(400).send({'username':'This username is already taken!'});
        if(user.email == req.body.email)
            return res.status(400).send({'email': 'The email address you have entered is already registered!'});
    }
    else{
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePic: 'default-user.png',
            emailConfirmed: false,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        
        jwt.sign({_id: user._id}, config.get('Email_Secret'),{expiresIn: '1d'}, (err, emailToken)=>{
            sendEmail(req.body.email, emailToken);
            res.status(200).send({"successSend": "Confirmation email has been sent to:  "+req.body.email})
        });
    }
});
router.post('/resend', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if(!user) res.send({"successSend": "User was not found"});
    jwt.sign({_id: user._id}, config.get('Email_Secret'),{expiresIn: '1d'}, (err, emailToken)=>{     
        sendEmail(req.body.email, emailToken);
        res.send({"successSend": "Email has been resent!"});
    });
});
 
async function sendEmail(emailAddress, emailToken){
        var transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'lavonne.block@ethereal.email',
                pass: '2TGmPQD75dXpCQKna8'
            }
          });
          transporter.sendMail({
            from: '"Lavonne Block" lavonne.block@ethereal.email', // sender address
            to: emailAddress, // list of receivers
            subject: "Confirm Email Address", // Subject line
            text: "http://localhost:5000/verification/"+emailToken, // plain text body
            html: "<b>http://localhost:5000/verification/"+emailToken+"</b>", // html body
          });
}
module.exports = router;