const express = require('express');
const router = express();
const { Drawings } = require('../../../models/drawing');
const { Likes } = require('../../../models/likes');
const { verifyToken } = require("../verifyToken");


router.post('/', verifyToken, (req, res)=>{
    var skip = req.body.skip;
    if(skip === 0) var limit = 30;
    else limit = 30;
    Drawings.find({createdOn: { $lte: req.createdOnBefore } }, (err, posts)=>{
        if(err){
            res.send({'error': 'No drawings found'});
        }
        if(req.user){
            Likes.find({userID: req.user._id, createdOn: { $lte: req.createdOnBefore }}, 'postID', (err, likedPosts)=>{
                var result =  likedPosts.map(({ postID }) => postID)
                return res.send({'drawingPosts': posts, 'likedPosts': result});
            })
            .skip(skip)
            .limit(limit)
            .sort( '-createdOn' );
        }
        else{
            return res.send({'drawingPosts': posts}); 
        }
    })
    .skip(skip)
    .limit(limit)
    .sort( '-createdOn' )
});
router.post('/post-info', verifyToken, (req, res)=>{
    Drawings.findOne({_id: req.body.drawingID }, (err, post)=>{
        if(err){
            res.send({'error': 'Drawing not found'});
        }
        var likeStatus;
        if(req.user){
            Likes.countDocuments({postID: req.body.drawingID, userID: req.user._id }, (err, count)=>{
                if(count == 0) likeStatus =false;
                else likeStatus =true;
                return res.send({'drawingPost': post, 'likeStatus': likeStatus});
            });
        }
        else {
            likeStatus =true;
            return res.send({'drawingPost': post, 'likeStatus': likeStatus});
        }
    })
});
router.get('/carousel', (req, res)=>{
    Drawings.find({ createdOn: { $lte: req.createdOnBefore } }, (err, posts)=>{
        if(err){
            res.send({'error': 'No drawings found'});
        }
        res.send({'drawingPosts': posts})
    })
    .limit(10)
    .sort( '-createdOn' )
});

module.exports = router;