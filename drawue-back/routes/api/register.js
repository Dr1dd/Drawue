const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../../models/user');


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
               console.log("http://localhost:8080/verification/"+emailToken);
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
            res.status(200).send({"successSend": "Confirmation email has been sent to:  "+req.body.email});
        });
    }
});
module.exports = router;