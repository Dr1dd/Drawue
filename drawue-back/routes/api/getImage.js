const express = require('express');
const router = express();
var path = require('path');

router.get('/profile/drawing/:resolution/:path', (req, res) => {
    var resolution = req.params.resolution;
    var param_path = req.params.path;
    res.sendFile(path.join(__dirname, '../../uploads/drawings/', resolution, param_path));
});
router.get('/profile/pic/:token', (req, res) => {
    var token = req.params.token;
    res.sendFile(path.join(__dirname, '../../uploads/profile-pics/', token));
});
router.get('/drawing/pic/:resolution/:path', (req, res) => {
    var resolution = req.params.resolution;
    var param_path = req.params.path;
    res.sendFile(path.join(__dirname, '../../uploads/drawings/', resolution, param_path));
});
module.exports = router;