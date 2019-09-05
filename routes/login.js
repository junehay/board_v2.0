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
router.post('/', passport.authenticate('local',{
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
    if(req.user){
        console.log(req.user);
        res.render('board/board');
    }else{
        res.send('<script>alert("잘못된 접근");location.href="/";</script>');
    }
});

// logout
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// signup
router.get('/signup', function(req, res){
    res.render('signup/signup.html');
});

router.post('/signup', async function(req, res){
        const id = req.body.userid;
        const password = req.body.password;
        const name = req.body.name;

        const namecheck = await pool.query('SELECT name FROM user WHERE name=?', [name]);
        const idcheck = await pool.query('SELECT userid FROM user WHERE userid=?', [id]);
            if(idcheck.length != 0){
                return res.send('<script>alert("아이디 중복");location.href="/signup";</script>');
            };
            if(namecheck.length != 0){
                return res.send('<script>alert("이름 중복");location.href="/signup";</script>');
            };
            await pool.query('INSERT INTO user VALUES (?,?,?)', [id, password, name]);
                console.log(id, password, name);
                res.send('<script>alert("성공");location.href="/";</script>');
    });

module.exports = router;