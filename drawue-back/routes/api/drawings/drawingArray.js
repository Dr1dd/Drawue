const express = require('express');
const router = express();
const { Drawings } = require('../../../models/drawing');

router.get('/', (req, res)=>{
    Drawings.find({ createdOn: { $lte: req.createdOnBefore } }, (err, posts)=>{
        if(err){
            res.send({'error': 'No drawings found'});
        }
        res.send({'drawingPosts': posts})
    })
    .limit( 15)
    .sort( '-createdOn' )
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