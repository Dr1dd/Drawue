const e = require('express');
const express = require('express');
const { User } = require('../../models/user');
const { verifyToken } = require("./verifyToken");
const router = express.Router();
 
router.get('/', verifyToken, async (req, res) => {
    if(req.user){
        let user = await User.findOne({_id: req.user._id});
        if(user) return res.send({'login': true, 'path': user.profilePic, 'username': user.username, 'email': user.email, 'totalLikes': user.total_like_count, 'totalDrawings': user.drawing_counter, 'emailStatus': user.emailConfirmed});
        else return res.send({'login': false});
    }
    else return res.send(false);

});
module.exports = router;