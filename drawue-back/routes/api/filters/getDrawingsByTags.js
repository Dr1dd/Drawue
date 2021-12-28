const express = require('express');
const { Drawings } = require('../../../models/drawing');
const { Likes } = require('../../../models/likes');
const { Comments } = require('../../../models/comment');
const { verifyToken } = require("../verifyToken");

const router = express.Router();

router.post("/", verifyToken,  async (req, res) => {
    var tags = req.body.tags;
    var skip = req.body.skip;
    if(skip === 0) var limit = 30;
    else limit = 30;
    var sort = {};
    switch(req.body.sort){
        case '':
            sort['createdAt'] = -1;
            break;
        case 'Recent':
            sort['createdAt'] = -1;
            break;
        case 'Likes':
            sort['like_count'] = -1;
            break;
        default:
            sort['createdAt'] = -1;
            break;
    }
    await getDrawingsByTags(req, res, skip, limit, sort, tags);
});
async function getDrawingsByTags(req, res, skip, limit, sort, tags) { 
    let drawing_tags = tags;
    drawing_tags.forEach(element => {
        element.toString().toLowerCase();
    });
    await Drawings.find({tags: {$in: drawing_tags }}, (drawing_error, posts)=>{
        if(drawing_error){
            res.send({'error': 'No drawings found'});
        }
        if(posts.length == 0) return res.send({'notFound': true});
        if(req.user){
            
            getDrawingLikes(req, res, skip, limit, posts);
        }
        else{
            return res.send({'drawingPosts': posts}); 
        }
    })
    .skip(skip)
    .limit(limit)
    .sort(sort);
}
function getDrawingLikes(req, res, skip, limit, posts) {
    Likes.find({userID: req.user._id, createdOn: { $lte: req.createdOnBefore }}, 'postID', (likes_error, likedPosts)=>{
                var result =  likedPosts.map(({ postID }) => postID)
                if(req.body.filter == 'commented'){
                   getDrawingComments(req, res, skip, limit, posts, result);
                }
                else return res.send({'drawingPosts': posts, 'likedPosts': result});
            })
            .skip(skip)
            .limit(limit)
            .sort( {'createdAt': -1});
}
function getDrawingComments(req, res, skip, limit, posts, result) {
 Comments.find({userID: req.user._id, createdOn: { $lte: req.createdOnBefore }}, 'postID', (comments_error, commentedPosts)=>{
        var resultComments = [...new Set(commentedPosts.map(item => JSON.stringify(item.postID)))];
        resultComments= resultComments.map(item => JSON.parse(item));
        return res.send({'drawingPosts': posts, 'likedPosts': result, 'commentedPosts': resultComments});
    })
    .skip(skip)
    .limit(limit)
    .sort({'createdAt': -1});
}
module.exports = router;