const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');

// DB
mongoose.set('useNewUrlParser', true);   
mongoose.set('useFindAndModify', false);  
mongoose.set('useCreateIndex', true);     
mongoose.connect(process.env.MONGO); 
const db = mongoose.connection; 
db.once("open", function(){
    console.log("DB connected");
});
db.on("error", function(err){
    console.log("DB ERROR : ", err);
});

// express
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({
    secret : 'asdk345j345j5bjksf',
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000 * 60 * 60
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', require('./routes/login'));

// server
app.listen(3000, function(){
    console.log('server on, port : 3000');
});