const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

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

// routes
app.use('/', require('./routes/login'));

// server
app.listen(3000, function(){
    console.log('server on, port : 3000');
});