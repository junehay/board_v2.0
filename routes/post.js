const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//index show new create edit update delete

router.get('/', function(req, res){
    if(req.user){
        console.log(req.user);
        res.render('board/board');
    }else{
        res.send('<script>alert("잘못된 접근");location.href="/";</script>');
    }
});

// new
router.get('/new', function(req, res){
    if(req.user){
        console.log(req.user);
        res.render('board/new', {user:req.user});
    }else{
        res.send('<script>alert("잘못된 접근");location.href="/";</script>');
    }
});

// create
router.post('/', function(req, res){
    res.redirect('/board');
});

module.exports = router;