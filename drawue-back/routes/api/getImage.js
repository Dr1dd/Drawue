const express = require('express');
const router = express();
var path = require('path');

router.get('/profile/drawing/:resolution/:path', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../uploads/drawings/', req.params.resolution, req.params.path));
});
router.get('/profile/pic/:token', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../uploads/profile-pics/', req.params.token));
});
router.get('/drawing/pic/:resolution/:path', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../uploads/drawings/', req.params.resolution, req.params.path));
});
module.exports = router;