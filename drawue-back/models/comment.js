const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Comments = mongoose.model('Comments', new mongoose.Schema({
    postID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    text:{
        type: String,
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
    },
    children: [mongoose.Schema.Types.ObjectId],

},{ timestamps: true }));
exports.Comments = Comments;
