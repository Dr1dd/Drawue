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
            res.status(200).send({'commentArray': comments});
        }
    });

});
module.exports = router;