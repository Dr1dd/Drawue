const express = require('express');
const { Drawings } = require('../../../models/drawing');

const router = express.Router();

router.get("/", async (req, res) => {
    await Drawings.aggregate([
        {'$unwind': "$tags"},
        {'$group': {_id:"$tags", count:{$sum:1}}},
        {'$sort': {count: -1}}
    ], (err, tags)=>{
        var filtered = tags.filter(function (tag) {
            return tag._id !='';
          });
        var filteredArray = [];
        for (let filtered_tag of filtered) {
            filteredArray.push(filtered_tag._id);
        }
        return res.status(200).send({'tagArray': filteredArray});
    }).limit(11);
});
module.exports = router;