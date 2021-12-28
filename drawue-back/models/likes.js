const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
 
const Likes = mongoose.model('Likes', new mongoose.Schema({
    postID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

},{ timestamps: true }));
exports.Likes = Likes;
