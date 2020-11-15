const express = require('express');
const router = express();
const { Drawings } = require('../../../models/drawing');
const { verifyToken } = require("../verifyToken");

router.get('/', verifyToken, (req, res)=>{
    Drawings.find({userID: req.user._id}, (err, posts)=>{
        if(err){
            res.send({'error': 'No drawings found'});
        }
        res.send({'drawingPosts': posts})
    })
});


module.exports = router;