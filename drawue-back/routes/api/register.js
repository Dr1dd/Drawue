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
    let validated_username = req.body.username.toString();
    let validated_email = req.body.email.toString();
    let passwordMissMatchMessage = 'Passwords do not match!';
    if(req.body.password != req.body.confirmPassword) return res.status(400).send({'passwordConfirm': passwordMissMatchMessage});
    let user = await User.findOne({$or: [{ username: validated_username}, {email: validated_email}]});
    if(user){
       userTaken(user, validated_username, validated_email, res);
    }
    else{
        await createUser(req, res);
    }
});
function userTaken(user, username, email, res) {
    if(user.username == username)
        return res.status(400).send({'username':'This username is already taken!'});
    if(user.email == email)
        return res.status(400).send({'email': 'The email address you have entered is already registered!'});
}
async function createUser(req, res) {
    let new_user = new User({
        username: req.body.username.toString(),
        email: req.body.email.toString(),
        password: req.body.password.toString(),
        profilePic: 'default-user.png',
        emailConfirmed: false,
    });
    const salt = await bcrypt.genSalt(10);
    new_user.password = await bcrypt.hash(new_user.password, salt);
    await new_user.save();
    
    jwt.sign({_id: new_user._id}, config.get('Email_Secret'),{expiresIn: '1d'}, (err, emailToken)=>{
        sendEmail(req.body.email, emailToken);
        res.status(200).send({"successSend": "Confirmation email has been sent to:  "+req.body.email})
    });
}
router.post('/resend', async (req, res) => {
    let user_email = req.body.email.toString();
    let user = await User.findOne({ email: user_email });
    if(!user) res.send({"successSend": "User was not found"});
    jwt.sign({_id: user._id}, config.get('Email_Secret'),{expiresIn: '1d'}, (err, emailToken)=>{     
        sendEmail(user_email, emailToken);
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