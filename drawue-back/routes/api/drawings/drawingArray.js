const express = require('express');
const router = express();
const { Drawings } = require('../../../models/drawing');

router.get('/', (req, res)=>{
    var filter;
    if(req.body.drawingID){
        filter = {_id: req.body.drawingID, createdOn: { $lte: req.createdOnBefore } };
    }
    else filter = {createdOn: { $lte: req.createdOnBefore } };
    Drawings.find({createdOn: { $lte: req.createdOnBefore } }, (err, posts)=>{
        if(err){
            res.send({'error': 'No drawings found'});
        }
        res.send({'drawingPosts': posts})
    })
    .limit( 15)
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