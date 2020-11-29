const express = require('express');
const { Likes } = require('../../../models/likes');
const { Drawings } = require('../../../models/drawing');
const { User } = require('../../../models/user');
const { Comments } = require('../../../models/comment');
const { verifyToken } = require("../verifyToken");

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    console.log(req.body);
    comment = new Comments({
        postID: req.body.postID,
        userID: req.user._id,
        text: req.body.text,
    });
    comment.save()
    .then(()=>{
        res.status(200).send({'success': 'Comment has been added.'});
    })  
    .catch((err)=>{
        console.log(err);
    })

});
router.post('/reply', verifyToken, async (req, res) => {
    console.log(req.body);
    await Drawings.find({_id: req.body.commentID})
    comment = new Comments({
        postID: req.body.postID,
        userID: req.user._id,
        text: req.body.text,
    });
    comment.save()
    .then(()=>{
        res.status(200).send({'success': 'Comment has been added.'});
    })  
    .catch((err)=>{
        console.log(err);
    })

});
module.exports = router;