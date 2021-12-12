const express = require('express');
const router = express();
const { Drawings } = require('../../../models/drawing');
const {Likes} = require('../../../models/likes');
const { verifyToken } = require("../verifyToken");

router.get('/', verifyToken, (req, res)=>{
    Drawings.find({userID: req.user._id}, (drawing_error, posts)=>{
        if(drawing_error){
            res.send({'error': 'No drawings found'});
        }
        else{
            if(req.user){
                Likes.find({userID: req.user._id, createdOn: { $lte: req.createdOnBefore }}, 'postID', (likes_error, likedPosts)=>{
                    var result =  likedPosts.map(({ postID }) => postID)
                    return res.send({'drawingPosts': posts, 'likedPosts': result});
                })
            }
            else res.send({'error': 'User not found'})
        }
    })
});
router.get('/:username', verifyToken, (req, res)=>{
    var skip = parseInt(req.query.skip);
    var limit = parseInt(req.query.limit);
    var username = req.params.username;
    getUserDrawings(req, res, username, skip, limit);
});

function getUserDrawings(req, res, username, skip, limit) {
    Drawings.find({ username: username }, (drawing_error, posts)=>{
        if(posts.length == 0) return res.send({'notFound': true});
        if(drawing_error){
            res.send({'error': 'No drawings found'});
        }
        else{
            if (req.user) {
                getUserLikes(req, res, posts);
            }
            else return res.send({'drawingPosts': posts});
        }
    }).skip(skip).limit(limit)
}
function getUserLikes(req, res, posts) {
    Likes.find({userID: req.user._id, createdOn: { $lte: req.createdOnBefore }}, 'postID', (likes_error, likedPosts)=>{
        var result =  likedPosts.map(({ postID }) => postID)
        return res.send({'drawingPosts': posts, 'likedPosts': result});
    })
}

module.exports = router;