// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const config = require('config');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    res.status(200).send(req.body.username);
});
module.exports = router;