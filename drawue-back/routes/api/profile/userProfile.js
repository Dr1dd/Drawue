const express = require('express');
const { User } = require('../../../models/user');
const { verifyToken } = require("../verifyToken");

const router = express.Router();

router.get("/user", verifyToken, async (req, res) => {
    let user = await User.findOne({ _id: req.user._id });
    if(user){
        res.status(200).send({"username": user.username, "email": user.email})
    }
});
router.get("/user/:username", async (req, res) => {
    var username = req.params.username;
    let user = await User.findOne({ username: username });
    if(user){
        res.status(200).send({"profilePic": user.profilePic, "likeCount": user.total_like_count, "drawings": user.drawing_counter})
    }
});
module.exports = router;