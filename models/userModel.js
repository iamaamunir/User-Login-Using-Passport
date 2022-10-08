const mongoose = require('mongoose')
const schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new schema({
    username: String,
    password: String
})

userSchema.plugin(passportLocalMongoose)



const userModel = mongoose.model('users', userSchema)

module.exports = userModel