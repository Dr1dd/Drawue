const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
 
const Drawings = mongoose.model('Drawings', new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
    },
    title: {
        type: String,
        required: true,
        maxlength: 64,
    },
    description: {
        type: String,
        maxlength: 200,
    },
    drawing_path: {
        type: String,
        required: true,
    },
    tags: [String],

},{ timestamps: true }));
exports.Drawings = Drawings;
