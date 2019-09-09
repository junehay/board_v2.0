const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const moment = require('moment');

// index
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
    };
});

// new
router.get('/new', function(req, res){
    if(req.user){
        console.log(req.user);
        res.render('board/new', {user:req.user});
    }else{
        res.send('<script>alert("잘못된 접근");location.href="/";</script>');
    };
});

// create
router.post('/', function(req, res){
    Post.create(req.body, function(err, post){
        if(err) return res.json(err);
        res.redirect('/board');
    });
});

// show
router.get("/:id", function(req, res){
    if(req.user){
        Post.findOne({_id:req.params.id}, function(err, post){
            if(err) return res.json(err);
            post.views++;
            post.save();
            res.render('board/show', {post:post, user:req.user});
        });
    }else{
        res.send('<script>alert("잘못된 접근");location.href="/";</script>');
    };
});

// edit
router.get("/:id/edit", function(req, res){
    if(req.user){
        Post.findOne({_id:req.params.id}, function(err, post){
            if(err) return res.json(err);
            res.render('board/edit', {post:post, user:req.user});
        });
    }else{
        res.send('<script>alert("잘못된 접근");location.href="/";</script>');
    };
});

// update
router.put("/:id", function(req, res){
    if(req.user){
       Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
           if(err) return res.json(err);
           res.redirect('/board/'+req.params.id);
       });
    }else{
        res.send('<script>alert("잘못된 접근");location.href="/";</script>');
    };
});

// delete
router.delete("/:id", function(req, res){
    if(req.user){
        Post.deleteOne({_id:req.params.id}, function(err){
            if(err) return res.json(err);
             res.redirect('/board');
        });
    }else{
        res.send('<script>alert("잘못된 접근");location.href="/";</script>');
    };
});

module.exports = router;