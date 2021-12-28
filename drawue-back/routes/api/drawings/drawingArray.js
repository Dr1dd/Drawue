const express = require('express');
const router = express();
const { Drawings } = require('../../../models/drawing');
const { Likes } = require('../../../models/likes');
const { Comments } = require('../../../models/comment');
const { verifyToken } = require("../verifyToken");
var ObjectID = require('mongodb').ObjectID;


router.post('/', verifyToken, (req, res)=>{
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
   galleryDrawings(req, res, skip, sort, limit);
});
function galleryDrawings(req, res, skip, sort, limit) {
     Drawings.find({createdOn: { $lte: req.createdOnBefore } }, (err, posts)=>{
        if(err){
            res.send({'error': 'No drawings found'});
        }
        if(posts.length == 0) return res.send({'notFound': true});
        if(req.user){
            getLikedPosts(req, res, skip, limit, posts);
        }
        else{
            return res.send({'drawingPosts': posts}); 
        }
    })
    .skip(skip)
    .sort(sort)
    .limit(limit);
}
function getLikedPosts(req, res, skip, limit, posts) {
    Likes.find({userID: req.user._id, createdOn: { $lte: req.createdOnBefore }}, 'postID', (likes_error, likedPosts)=>{
        var result =  likedPosts.map(({ postID }) => postID)
        if(req.body.filter == 'commented'){
            getCommentedPosts(req, res, skip, limit, posts, result);
        }
        else return res.send({'drawingPosts': posts, 'likedPosts': result});
    })
    .skip(skip)
    .limit(limit)
    .sort({'createdAt': -1});
}
function getCommentedPosts(req, res, skip, limit, posts, result) {
    Comments.find({userID: req.user._id, createdOn: { $lte: req.createdOnBefore }}, 'postID', (post_error, commentedPosts)=>{
        var resultComments = [...new Set(commentedPosts.map(item => JSON.stringify(item.postID)))];
        resultComments= resultComments.map(item => JSON.parse(item));
        return res.send({'drawingPosts': posts, 'likedPosts': result, 'commentedPosts': resultComments});
    })
    .skip(skip)
    .limit(limit)
    .sort({'createdAt': -1});
}
router.post('/post-info', verifyToken, (req, res) => {
    let drawing_id;
    if (ObjectID.isValid(req.body.drawingID)) drawing_id = req.body.drawingID.toString();
    else res.status(400).send({'status': 'error', 'message': 'Invalid post ID'});
    Drawings.findOne({_id: drawing_id }, (drawings_error, post)=>{
        if(drawings_error){
            res.send({'error': 'Drawing not found'});
        }
        var likeStatus;
        if(req.user){
            Likes.countDocuments({postID: drawing_id, userID: req.user._id.toString() }, (likes_error, count)=>{
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
router.get('/carousel', verifyToken, (req, res)=>{
    Drawings.find({ createdOn: { $lte: req.createdOnBefore } }, (drawings_error, posts)=>{
        if(drawings_error){
            res.send({'error': 'No drawings found'});
        }
        else{
            if(req.user){
                Likes.find({userID: req.user._id, createdOn: { $lte: req.createdOnBefore }}, 'postID', (likes_error, likedPosts)=>{
                    var result =  likedPosts.map(({ postID }) => postID)
                    return res.send({'drawingPosts': posts, 'likedPosts': result});
                })
                .limit(10)
                .sort( '-createdOn' );
            }
            else return res.send({'drawingPosts': posts, 'likedPosts': []});
        }
    })
    .limit(10)
    .sort( '-createdOn' )
});


module.exports = router;