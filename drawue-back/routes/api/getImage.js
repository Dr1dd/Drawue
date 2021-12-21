const express = require('express');
const router = express();
var path = require('path');

router.get('/profile/drawing/:resolution/:path', (req, res) => {
    getDrawingImage(res, req);
});
router.get('/profile/pic/:token', (req, res) => {
    var token = req.params.token.toString();
    res.sendFile(path.join(__dirname, '../../uploads/profile-pics/', token));
});
router.get('/drawing/pic/:resolution/:path', (req, res) => {
    getDrawingImage(res, req);
});
function getDrawingImage(res, req) {
    var resolution = req.params.resolution.toString();
    var param_path = req.params.path.toString();
    res.sendFile(path.join(__dirname, '../../uploads/drawings/', resolution, param_path));
}
module.exports = router;