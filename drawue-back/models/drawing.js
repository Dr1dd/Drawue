const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
 
const Drawings = mongoose.model('Drawings', new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
    },
    username:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxlength: 32,
    },
    description: {
        type: String,
        maxlength: 200,
    },
    drawing_path: {
        type: String,
        required: true,
    },
    like_count:{
        type: Number,
        default: 0,
    },
    comment_count:{
        type: Number,
        default: 0,
    },
    tags: [String],

},{ timestamps: true }));
exports.Drawings = Drawings;
