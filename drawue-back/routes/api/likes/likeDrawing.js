const express = require('express');
const { Likes } = require('../../../models/likes');
const { Drawings } = require('../../../models/drawing');
const { User } = require('../../../models/user');
const { verifyToken } = require("../verifyToken");
var ObjectID = require('mongodb').ObjectID;

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    let post_id;
    if (ObjectID.isValid(req.body.postID)) post_id = req.body.postID.toString();
    else res.status(400).send({'status': 'error', 'message': 'Invalid post ID'});
    Likes.deleteOne({postID: post_id, userID: req.user._id}).then(result => {
        if(result.deletedCount != 0){
           dislikeLikedPost(req, res)
        }
        else{
            likeDrawing(req, res);
        }
    });

});
function dislikeLikedPost(req, res) {
    let post_id;
    if (ObjectID.isValid(req.body.postID)) post_id = req.body.postID.toString();
    else res.status(400).send({'status': 'error', 'message': 'Invalid post ID'});
    updateLikeStatus(req, res, post_id, -1);
}
function likeDrawing(req, res) {
    let like = new Likes({
        postID: req.body.postID.toString(),
        userID: req.user._id.toString()
    });
    let post_id;
    if (ObjectID.isValid(req.body.postID)) post_id = req.body.postID.toString();
    else res.status(400).send({'status': 'error', 'message': 'Invalid post ID'});
    like.save().then(()=>{
       updateLikeStatus(req, res, post_id, 1);
    })
    .catch((like_error)=>{
        console.log(like_error);
    })
}
function updateLikeStatus(req, res, post_id, status_value) {
    Drawings.findOneAndUpdate({_id: post_id}, {$inc: { like_count: status_value }}, (drawing_error, drawing)=>{
        if(drawing_error) console.log(drawing_error);
        else {
            if(req.body.author_username){
                User.findOneAndUpdate({username: req.body.author_username}, {$inc: { total_like_count: status_value }}, (user_error, user)=>{
                    if(user_error) console.log(user_error);
                    else return res.status(200).send({'status':true});
                });
            }
            else return res.status(200).send({'status':true});
        }
    });
}
module.exports = router;