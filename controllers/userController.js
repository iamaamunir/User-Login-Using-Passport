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
    res.render('index')
}

async function loginExUser(req,res){
    res.render('login')
}

async function changePassword(req,res){
    const userInfo = req.body
    await userModel.findOne({username:userInfo.username}, (err,user)=>{
        if(err){
            res.render('reset', {error:err})
        }
        else{
            user.changePassword(userInfo.password, userInfo.new_password, (err,user)=>{
                if(err){
                    res.status(500).send({error:err})
                }
                else{
                    res.render('reset', {error:null, success:'Password changed successfully'})
                }
            })
        }
    })
}

async function changePasswordPage(req,res){
    res.render('reset')
}

module.exports={signUp, signUpExUser, loginUser, logOut, loginExUser, changePasswordPage, changePassword}
// module.exports = {signUp, signUpExUser}