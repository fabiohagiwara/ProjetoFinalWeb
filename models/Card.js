const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Card = new Schema({
    word: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    tword: {
        type: String,
        required: true
    },
    tlanguage: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("cards",Card)
module.exports = Card