const express = require('express');
const { Drawings } = require('../../../models/drawing');
const { Comments } = require('../../../models/comment');
const { verifyToken } = require("../verifyToken");

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    comment = new Comments({
        postID: req.body.postID,
        userID: req.user._id,
        text: req.body.text,
        parent: null,
        children: [],
    });
    comment.save()
    .then(()=>{
        Drawings.findOneAndUpdate({_id: req.body.postID}, {$inc: { comment_count: 1 }}, (err, response)=>{
            if(err) console.log(err);
            else  res.status(200).send({'comment': comment});
        });
    })  
    .catch((err)=>{
        console.log(err);
    })

});
router.post('/reply', verifyToken, async (req, res) => {
    await Comments.findOne({_id: req.body.commentID}, (err, comment)=>{
        if(err) console.log(err);
        reply = new Comments({
            postID: req.body.postID,
            userID: req.user._id,
            text: req.body.text,
            parent: req.body.commentID,
            children: [],
        });
        reply.save((err, r)=>{
            if(err) console.log(err);
            else {
                comment.children.push(r._id)
                comment.save()
                .then(()=>{
                    Drawings.findOneAndUpdate({_id: req.body.postID}, {$inc: { comment_count: 1 }}, (err, response)=>{
                        if(err) console.log(err);
                        else res.status(200).send({'reply': reply});
                    });
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        })
    });

});
module.exports = router;