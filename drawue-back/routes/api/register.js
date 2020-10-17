const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../../models/user');

const mailgun = require("mailgun-js"); 

const DOMAIN = "sandbox8b099beb9c7046cb8bbf1b0e64b2f452.mailgun.org";
const mg = mailgun({apiKey: "3cc2bcf53e6b13ac8b03ceb5616b5173-2fbe671d-b1ae1cd6", domain: DOMAIN});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({$or: [{ username: req.body.username}, {email: req.body.email}]});
    if(user){
        if(user.username == req.body.username)
            return res.status(400).send('This username is already taken!');
        if(user.email == req.body.email)
            return res.status(400).send('The email address you have entered is already registered!');
    }
    else{
        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            emailConfirmed: false,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'), {expiresIn: '1m' });
        const refreshToken = jwt.sign({ _id: user._id }, config.get('PrivateKey2'), {expiresIn: '1d'});
        await user.save();
        jwt.sign({_id: user._id}, config.get('Email_Secret'),{expiresIn: '1d'}, (err, emailToken)=>{
            // var transport = nodemailer.createTransport({
            //     host: "localhost",
            //     port: 1025,
            //     auth: {
            //       user: "project.1",
            //       pass: "secret.1"
            //     }
            //   });
               console.log("https://localhost.com/api/confirmation/"+emailToken);
            //   const email = new Email({
            //     transport: transporter,
            //     send: true,
            //     preview: false,
            //   });
            //   email.send({
            //     message: {
            //       to: 'd91f7b2ef5-3de0db@inbox.mailtrap.io',
            //       subject: 'Confirm Email',
            //       text: 'https://localhost.com/api/confirmation/'+emailToken,
            //     },
            //   })
            //   .then(() => res.status(200).send({"successSend": "Confirmation email has been sent to:  "+req.body.email}))
            //   .catch((err) => console.log(err)); 
        });
    }
    
    //res.status(200).send(req.body.username);
});
module.exports = router;