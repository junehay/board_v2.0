const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser(function(user,done){
    const result = user;
    result.password="";
    console.log('deserializeUser');
    done(null, result);
});

passport.use('login', new LocalStrategy({
    usernameField: 'userid',
    passwordField : 'password',
    passReqToCallback : true
}, 
function (req, userid, password, done) {
    User.findOne({ userid : userid , password : password }, function (err,user) {
        if (!user){
            return done(null, false);
        }else{
            return done(null, user);
        }
    });
}
));

module.exports = passport;