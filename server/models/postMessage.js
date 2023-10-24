const mongoose = require('mongoose');

const postMessageSchema = mongoose.Schema({
    title: { type: String },
    message: { type: String },
    creator: { type: String },
    tags: { type: Array },
    selectedFile: String,
    likeCount: { type: Number, default: 0 }
}, { versionKey: false, timestamps: true })

module.exports = {
    postMessageSchema: mongoose.model('postMessages', postMessageSchema)
}