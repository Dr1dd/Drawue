const config = require('config');
const { User } = require('../../models/user');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const { _id } = jwt.verify(req.body.token, config.get('Email_Secret'));
        if(!_id ) return res.status(400).send("Email activation link has expired!");
        else{
            await verifyUser(_id);
        }
    }
    catch(err){
        return res.status(400).send("There has been an error while trying to activate account");
    }
});
async function verifyUser(id) {
    await User.findOne({_id: id}, function(err, user){
        if(user.emailConfirmed) return res.status(200).send("You have already confirmed this email!");
        else {
            user.emailConfirmed = true;
            user.save();
            return res.status(200).send("Your account has been activated successfully. You can now login.");
        }
    })
}
module.exports = router;
