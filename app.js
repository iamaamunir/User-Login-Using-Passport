const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const bookRoute = require('./routes/bookRoute')
const userRoute = require('./routes/userRoute')
require('dotenv').config()
const userModel = require('./models/userModel')
const connectEnsureLogin = require('connect-ensure-login'); 
const passport = require('passport');
const session = require('express-session'); 

const dbConnection = require('./dbConfig/db')
dbConnection()
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 2 * 60 * 1000 } // 2 mins
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize()); // initialize passport middleware
app.use(passport.session()); // use passport session middleware

passport.use(userModel.createStrategy()); // use the user model to create the strategy

// serialize and deserialize the user object to and from the session
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// views engine
app.set('views','views')
app.set('view engine', 'ejs')

// home page
app.get('/', (req,res)=>{
    res.render('index')
})

// Book Route
app.use('/api/books', connectEnsureLogin.ensureLoggedIn('/api/login'), bookRoute)

// user route
app.use('/api',userRoute)

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log('Running at PORT', PORT)
})

