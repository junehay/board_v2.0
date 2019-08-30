const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', function(req, res){
    res.render('login.html');
});

// signup
router.get('/signup', function(req,res){
    res.render('signup/signup.html');
});

router.post('/', function(req,res){
    User.create(req.body, function(err, user){
        if(err) return res.json(err);
        res.redirect('/');
    });
});

module.exports = router;