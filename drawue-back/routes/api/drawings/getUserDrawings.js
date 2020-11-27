const express = require('express');
const router = express();
const { Drawings } = require('../../../models/drawing');
const {Likes} = require('../../../models/likes');
const { verifyToken } = require("../verifyToken");

router.get('/', verifyToken, (req, res)=>{
    Drawings.find({userID: req.user._id}, (err, posts)=>{
        if(err){
            res.send({'error': 'No drawings found'});
        }
        else{
            if(req.user){
                Likes.find({userID: req.user._id, createdOn: { $lte: req.createdOnBefore }}, 'postID', (err, likedPosts)=>{
                    var result =  likedPosts.map(({ postID }) => postID)
                    return res.send({'drawingPosts': posts, 'likedPosts': result});
                })
            }
            else res.send({'error': 'User not found'})
        }
    })
});


module.exports = router;