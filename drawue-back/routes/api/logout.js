const express = require('express');
const router = express.Router();
 
router.get('/', async (req, res) => {
    res.cookie('access-token', '',{
        maxAge: 0,
        httpOnly: true,
    });
    res.cookie('refresh-token', '',{
        maxAge: 0,
        httpOnly: true,
    });
    res.end("Logged off");
});
module.exports = router;