const express = require('express');
const { Drawings } = require('../../../models/drawing');
const { Likes } = require('../../../models/likes');
const { verifyToken } = require("../verifyToken");

const router = express.Router();

router.post("/", verifyToken,  async (req, res) => {
    var tags = req.body.tags;
    var skip = req.body.skip;
    if(skip === 0) var limit = 30;
    else limit = 30;
    console.log(tags);
    await Drawings.find({tags: {$in: tags }}, (err, posts)=>{
        if(err){
            res.send({'error': 'No drawings found'});
        }
        if(posts.length == 0) return res.send({'notFound': true});
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
    .sort( '-createdOn' );
});
module.exports = router;