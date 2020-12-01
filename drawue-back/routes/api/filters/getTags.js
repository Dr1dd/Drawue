const express = require('express');
const { Drawings } = require('../../../models/drawing');
// const { verifyToken } = require("../verifyToken");

const router = express.Router();

router.get("/", async (req, res) => {
    await Drawings.aggregate([
        {'$unwind': "$tags"},
        {'$group': {_id:"$tags", count:{$sum:1}}}
    ], (err, tags)=>{
        var filtered = tags.filter(function (tag) {
            return tag._id !='';
          });
        var filteredArray = [];
        for (var i = 0; i < filtered.length; i++) {
            filteredArray.push(filtered[i]._id);
        }
        return res.status(200).send({'tagArray': filteredArray});
    }).limit(11).sort({count: -1});
});
module.exports = router;