const mongoose = require('mongoose')
const { Schema } = mongoose

const comicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A title is required."],
        minlength: [1, "At least 1 character is required."]
    },
    author: {
        type: String,
        required: [true, "An author is required."],
        minlength: [1, "At least 1 character is required."]
    },
    publisher: {
        type: String
    }, 
    genre: {
        type: String,
        required: [true, "A genre is required."],
        minlength: [1, "At least 1 character is required."]
    },
    number_of_pages: {
        type: String,
        required: [true, "The number of pages is required."],
        minlength: [1, "A number is required."],
        maxlength: [3, "The max number is less than 1000."]
    },
    starRating: {
        type: Number,
        required: [true, "The start rating is required."],
        min: [1, "The minimum star rating is 1."],
        max: [5, "The maximum star rating is 5."]
    },
    synopsis: {
        type: String,
        required: [true, "The synopsis is required."]
    }, 
    image: {
        type: String
    }
})

const Comic = mongoose.model('comics', comicSchema)

module.exports = Comic
