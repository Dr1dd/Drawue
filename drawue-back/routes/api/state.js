const express = require('express');
const { verifyToken } = require("./verifyToken");
const router = express.Router();
 
router.get('/', verifyToken, async (req, res) => {
    if(req.user) return res.send(true);
    else res.status(200).send(false);
});
module.exports = router;