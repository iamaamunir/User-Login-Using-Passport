const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL

function connectToMongoDB(){
    mongoose.connect(MONGODB_CONNECTION_URL)
    mongoose.connection.on('connected', ()=>{
        console.log('MongoDB connected Successfully')
    })
    mongoose.connection.on('error', ()=>{
        console.log('Unable to connect to MongoDb')
    })
}

module.exports = connectToMongoDB