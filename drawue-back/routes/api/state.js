const e = require('express');
const express = require('express');
const { User } = require('../../models/user');
const { verifyToken } = require("./verifyToken");
const router = express.Router();
 
router.get('/', verifyToken, async (req, res) => {
    let user = await User.findOne({_id: req.user._id});
    if(user) return res.send({'login': true, 'path': user.profilePic, 'username': user.username});
    else return res.status(200).send({'login': false});

});
module.exports = router;