const express = require('express');
const { Drawings } = require('../../../models/drawing');
const { Comments } = require('../../../models/comment');
const { verifyToken } = require("../verifyToken");
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    let post_id;
    if (ObjectID.isValid(req.body.postID)) post_id = req.body.postID.toString();
    else res.status(400).send({'status': 'error', 'message': 'Invalid post ID'});
    let comment = new Comments({
        postID: req.body.postID,
        userID: req.user._id,
        text: req.body.text,
        parent: null,
        children: [],
    });
    comment.save()
        .then(() => {
        
        Drawings.findOneAndUpdate({_id: post_id}, {$inc: { comment_count: 1 }}, (err)=>{
            if(err) console.log(err);
            else  res.status(200).send({'comment': comment});
        });
    })  
    .catch((err)=>{
        console.log(err);
    })

});
router.post('/reply', verifyToken, async (req, res) => {
    let comment_id;
    if (ObjectID.isValid(req.body.commentID)) comment_id = req.body.commentID.toString();
    else res.status(400).send({'status': 'error', 'message': 'Invalid comment ID'});
    await Comments.findOne({_id: comment_id}, (comment_error, comment)=>{
        if(comment_error) console.log(comment_error);
        let reply = new Comments({
            postID: req.body.postID,
            userID: req.user._id,
            text: req.body.text,
            parent: req.body.commentID,
            children: [],
        });
        reply.save((reply_error, r)=>{
            if(reply_error) console.log(reply_error);
            else {
                comment.children.push(r._id)
                comment.save()
                .then(()=>{
                    Drawings.findOneAndUpdate({_id: req.body.postID}, {$inc: { comment_count: 1 }}, (drawing_error, response)=>{
                        if(drawing_error) console.log(drawing_error);
                        else res.status(200).send({'reply': reply});
                    });
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        })
    });

});
module.exports = router;