const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const PostNum = require('../models/PostNum');
const PostBackup = require('../models/PostBackup');
const moment = require('moment');

// index
router.get('/', async function(req, res){
    if(req.user){
        const paginate = await Post.paginate();
        const totalDocs = paginate.totalDocs;
        const maxPage = paginate.totalPages;
        const page = req.query.page;
        const limit = 10;
        const skip = (page-1)*limit;

        const search = searchDB(req.query);

        Post.find().sort({createdAt:-1}).skip(skip).limit(limit).exec(function (err,posts) {
            if(err) return res.json(err);
            res.render("board/board",{
                posts:posts, totalDocs:totalDocs, user:req.user, page:page, maxPage:maxPage, moment, search:search
            });
        });
    }else{
        res.send('<script>alert("잘못된 접근");location.href="/";</script>');
    };
});

function searchDB(query){
    if(query.searchType == "author"){
        console.log("sdfafd");
    }   
};

// new
router.get('/new', function(req, res){
    if(req.user){
        PostNum.findOne({title:"postNum"}, function(err, postnum){
        res.render('board/new', {user:req.user, postnum:postnum});
        });
    }else{
        res.send('<script>alert("잘못된 접근");location.href="/";</script>');
    };
});

// create
router.post('/', function(req, res){
    PostNum.findOne({title:"postNum"}, async function(err, postnum){
        if(err) return res.json(err);
        await postnum.number++;
        postnum.save();
    });
    Post.create(req.body, async function(err, post){
        if(err) return res.json(err);
        await res.redirect('/board');
    });
    PostBackup.create(req.body, function(err){
        if(err) return res.json(err);
    });
});

// show
router.get("/:id", function(req, res){
    if(req.user){
        Post.findOne({_id:req.params.id}, function(err, post){
            if(err) return res.json(err);
            post.views++;
            post.save();
            res.render('board/show', {post:post, user:req.user, page:req.query.page});
        });
    }else{
        res.send('<script>alert("잘못된 접근");location.href="/";</script>');
    };
});

// edit
router.get('/:id/edit', function(req, res){
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
router.put('/:id', function(req, res){
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
router.delete('/:id', function(req, res){
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