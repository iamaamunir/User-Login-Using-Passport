const express=require('express')
const userRouter = express.Router()
const passport = require('passport')
const userController = require('../controllers/userController')


userRouter.post('/register', userController.signUp)
userRouter.get('/register', userController.signUpExUser)
userRouter.post('/logout', userController.logOut)
userRouter.get('/login', userController.loginExUser)
userRouter.get('/changepassword', userController.changePasswordPage)
userRouter.post('/changepassword', userController.changePassword)
userRouter.post('/login', passport.authenticate('local', { failureRedirect: '/' }), userController.loginUser)


module.exports = userRouter