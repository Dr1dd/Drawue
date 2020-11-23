const express = require('express');
const router = express();
const { Drawings } = require('../../../models/drawing');

router.post('/', (req, res)=>{
    var skip = req.body.skip;
    if(skip === 0) var limit = 30;
    else limit = 30;
    Drawings.find({createdOn: { $lte: req.createdOnBefore } }, (err, posts)=>{
        if(err){
            res.send({'error': 'No drawings found'});
        }
        res.send({'drawingPosts': posts})
    })
    .skip(skip)
    .limit(limit)
    .sort( '-createdOn' )
});
router.post('/post-info', (req, res)=>{
    Drawings.findOne({_id: req.body.drawingID }, (err, post)=>{
        if(err){
            res.send({'error': 'Drawing not found'});
        }
        res.send({'drawingPost': post})
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