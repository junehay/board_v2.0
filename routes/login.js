const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('./login_passport');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    port : 3306,
    user : 'June',
    password : 'hay',
    database : 'user'
});

// login
router.get('/', function(req, res){
    res.render('login.html');
});
router.post('/', passport.authenticate('login',{
    failureRedirect : '/fail'
    }),
    function(req, res){
        res.send('<script>alert("Login success");location.href="/board";</script>');
    }
);
router.get('/fail', function(req, res){
    res.send('<script>alert("Incorrect Id or Password ");location.href="/";</script>');
});

router.get('/board', function(req, res){
    res.render('board/board');
});

// logout
router.get('/logout', function(req, res){
    res.logout();
    res.redirect('/');
});

// signup
router.get('/signup', function(req, res){
    res.render('signup/signup.html');
});

/*router.post('/signup', function(req, res){
    const userid = req.body.userid;
    sequelize.findOne({userid:userid}, function(err, user){
        if(!user){
            return sequelize.create(req.body, function(err, user){
            if(err) return res.json(err);
            res.send('<script>alert("Sign up is complete");location.href="/";</script>')});}
            else{return res.send('<script>alert("아이디 중복");location.href="/signup";</script>');}
    });
});*/

router.post('/signup', function(req, res){
    try{
        const id = req.body.userid;
        const password = req.body.password;
        const name = req.body.name;

        pool.query('SELECT * FROM user WHERE userid= OR name=?', [id, name], function(err, data){
            if(data.length == 0){
                pool.query('INSERT INTO user VALUES(?,?,?)', [id, password, name], function(){
                    console.log(id, password, name);
                    res.redirect('/signup');
                });
            }
        });
            
    }catch(err){
        console.log(err);
        }   
});

module.exports = router;