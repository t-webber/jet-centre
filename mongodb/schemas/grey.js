const mongoose = require('mongoose')

// GRIS
const studyPostSchema = new mongoose.Schema({
    content: {
        type: mongoose.ObjectId,
        ref: 'flexContent'},
        authors : [{type: mongoose.ObjectId, ref: 'admin'}],
        type: String,
        keywords: String,
        study: {
            type: mongoose.ObjectId,
            ref: 'study'}
})

const flexContentSchema = new mongoose.Schema({
    items: [{type:mongoose.ObjectId, ref:'flexItem'}]
})

const flexItemSchema = new mongoose.Schema({
    content: String,
    type: String
})

module.exports = {studyPostSchema, flexContentSchema, flexItemSchema}