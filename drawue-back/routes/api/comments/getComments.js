const express = require('express');
const { Likes } = require('../../../models/likes');
const { Drawings } = require('../../../models/drawing');
const { User } = require('../../../models/user');
const { Comments } = require('../../../models/comment');
const { verifyToken } = require("../verifyToken");
var ObjectID = require('mongodb').ObjectID;

const router = express.Router();

const findUsers = function (res, user_list, comments) {
    User.find({_id: {$in: user_list} }, (user_error, users)=>{
        if(user_error) console.log(user_error);
        if(users){
            const mapUsersAndComments = async () => {
                return Promise.all(comments.map(x => {
                    return users.map(y => {
                        if (JSON.stringify(y._id) == JSON.stringify(x.userID)) {
                            return {comment:x, username:y.username, profilePic:y.profilePic};
                        }
                    });
                }));
            };
            mapUsersAndComments().then((merged) => {
                console.log(merged)
                const fixedArray = merged.map(x => x[0]);
                fixedArray.forEach(function (comment) {
                    comment.expanded = true;
                });
                res.status(200).send({ 'commentArray': fixedArray });
            });
        }
    })
    .select({ "username": 1, "_id": 1, "profilePic": 1}).lean();
}
router.post('/', verifyToken, async (req, res) => {
    let post_id;
    if (ObjectID.isValid(req.body.postID)) post_id = req.body.postID.toString();
    else res.status(400).send({'status': 'error', 'message': 'Invalid post ID'});
    await Comments.find({postID: post_id}, (err, comments)=>{
        if(err) console.log(err);
        else{
            let user_list = comments.map(a => a.userID);
            findUsers(res, user_list, comments);
        }
    }).lean();

});
module.exports = router;