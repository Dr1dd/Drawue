const express = require('express');
const router = express();
var path = require('path');

router.get('/:token', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../../uploads/profile-pics/', req.params.token));
});

module.exports = router;