const express = require('express');
const { Likes } = require('../../../models/likes');
const { Drawings } = require('../../../models/drawing');
const { verifyToken } = require("../verifyToken");
const e = require('express');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    console.log(req.body.postID);
    Likes.deleteOne({postID: req.body.postID, userID: req.user._id}).then(result => {
        if(result.deletedCount != 0){
            Drawings.findOneAndUpdate({_id: req.body.postID}, {$inc: { like_count: -1 }}, (err, response)=>{
                if(err) console.log(err);
                else return res.status(200).end();
            });
        }
        else{
            like = new Likes({
                postID: req.body.postID,
                userID: req.user._id
            });
            like.save().then(()=>{
                Drawings.findOneAndUpdate({_id: req.body.postID}, {$inc: { like_count: 1 }}, (err, response)=>{
                    if(err) console.log(err);
                    else return res.status(200).end();
                });
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    });

});
module.exports = router;