const mongoose = require('mongoose')
const schema = mongoose.Schema

const bookSchema = new schema({
    title:{
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: false
    },
    year: {
        type: Number,
        required: true,
        max: [2022, 'Year must be less than or equal to 2020'] //validation with custom message
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, 'ISBN must be unique'] //validation with custom message
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be greater than or equal to 0'] //validation with custom message
    },
    createAt : {
        type: Date,
        default: Date.now
    },
    lastUpdateAt : {
        type: Date,
        default: Date.now
    },
})

const bookModel =  mongoose.model('books', bookSchema)
module.exports =bookModel