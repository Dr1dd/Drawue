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
module.exports = router;