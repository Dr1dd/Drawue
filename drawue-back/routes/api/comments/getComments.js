const express = require('express');
const { Likes } = require('../../../models/likes');
const { Drawings } = require('../../../models/drawing');
const { User } = require('../../../models/user');
const { Comments } = require('../../../models/comment');
const { verifyToken } = require("../verifyToken");

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    await Comments.find({postID: req.body.postID}, (err, comments)=>{
        if(err) console.log(err);
        else{
            let result = comments.map(a => a.userID);
            User.find({_id: {$in: result}, }, (err, users)=>{
                if(err) console.log(err);
                if(users){
                    const getData = async () => {
                        return Promise.all(comments.map(x => {
                            return users.map(y => {
                                if (JSON.stringify(y._id) == JSON.stringify(x.userID)) {
                                    return {comment:x, username:y.username, profilePic:y.profilePic};
                                }
                            });
                        }));
                    };
                    getData().then((merged)=>{
                        res.status(200).send({'commentArray': merged[0]});
                    });
                }
            })
            .select({ "username": 1, "_id": 1, "profilePic": 1});
        }
    });

});
module.exports = router;