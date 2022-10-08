const userModel = require('../models/userModel')
const passport = require('passport')



async function signUp(req,res){
    const user = req.body
    userModel.register(new userModel({username:user.username}), user.password, (err,user)=>{
        if(err){
            console.log(err)
            res.status(400).send(err)
        }
        else{
            passport.authenticate('local')(req,res, ()=>{
                res.redirect('/api/books')
            })
        }
    })
}

async function signUpExUser(req,res){
    res.render('signup')
}

async function loginUser(req,res){
    res.redirect('/api/books')
}

async function logOut(req,res){
    req.logout()
    res.redirect('/')
}

async function loginExUser(req,res){
    res.redirect('/api/books')
}


module.exports={signUp, signUpExUser, loginUser, logOut, loginExUser}
// module.exports = {signUp, signUpExUser}