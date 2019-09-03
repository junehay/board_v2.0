const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('./login_passport');

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
router.get('/signup', function(req,res){
    res.render('signup/signup.html');
});
router.post('/signup', function(req,res){
    const userid = req.body.userid;
    User.findOne({userid:userid}, function(err, user){
        if(!user){
            return User.create(req.body, function(err, user){
            if(err) return res.json(err);
            res.send('<script>alert("Sign up is complete");location.href="/";</script>')});}
            else{return res.send('<script>alert("아이디 중복");location.href="/signup";</script>');}
    });
});

module.exports = router;