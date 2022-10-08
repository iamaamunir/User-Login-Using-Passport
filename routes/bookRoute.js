const express = require('express')
const bookRouter = express.Router()
const bookController = require('../controllers/bookController')

bookRouter.route('/createbook').post(bookController.createBook)
bookRouter.route('/books').get(bookController.allBooks)

module.exports = bookRouter