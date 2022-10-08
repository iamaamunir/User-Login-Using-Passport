const bookModel = require('../models/bookModel')

async function createBook(req,res){
    const body = req.body
    await bookModel.create(body).then(()=>{
        res.status(201).send({
            data:body,
            message:'Book Successfully Created'
        })
    }).catch((err)=>{
        res.status(500).send(err.message)
    })
}

async function allBooks(req,res){
    bookModel.find()
        .then(books => {
            res.render('books', { user: req.user, books })
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

module.exports ={ createBook, allBooks}