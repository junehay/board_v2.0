const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const moment = require('moment');

//index show new create edit update delete

router.get('/', function(req, res){
    if(req.user){
        console.log(req.user);
        Post.find({})
        .sort({createdAt:-1})
        .exec(function(err, posts){
            if(err) return res.json(err);
            res.render('board/board', {posts:posts, moment});
        });
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
    Post.create(req.body, function(err, post){
        if(err) return res.json(err);
        res.redirect('/board');
    });
});

module.exports = router;