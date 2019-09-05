const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    port : 3306,
    user : 'June',
    password : 'hay',
    database : 'user'
});

passport.serializeUser(function(user, done){
    console.log('serializeUser', user);
    done(null, user);
});

passport.deserializeUser(function(user, done){
    console.log('deserializeUser', user);
    done(null, user);
});


passport.use('local', new LocalStrategy({
    usernameField: 'userid',
    passwordField : 'password',
    passReqToCallback : false
}, 
    async function (userid, password, done) {
        const dbid = await pool.query('SELECT userid FROM user WHERE userid=?', [userid]);
        const dbpwd = await pool.query('SELECT password FROM user WHERE password=?', [password]);
        if(dbid.length != 0){
            if(dbpwd.length != 0){
                return done(null, userid);
            }else{
                return done(null, false);
            }
        }else{
            return done(null, false);
        }
    }
));

module.exports = passport;