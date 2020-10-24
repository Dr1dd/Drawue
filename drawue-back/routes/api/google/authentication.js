var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../../../models/user');
const config = require('config');
const bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: config.get('GoogleClientID'),
    clientSecret: config.get('GoogleClientSecret'),
    callbackURL: "http://localhost:5000/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({email: profile.emails[0].value}, (err, user)=>{
        if (err) {
            return done(err);
        }
        if(user){
            cb(null,user);
        }
        else{
            var password = generatePassword(12);
            userNew = new User({
                username: req.body.username,
                email: profile.emails[0].value,
                password: password,
                emailConfirmed: profile.emails[0].verified == true ? true : false,
            });
            const salt = bcrypt.genSalt(10);
            userNew.password = bcrypt.hash(userNew.password, salt);
            userNew.save().then(()=>{
                cb(null, userNew);
            });
        }
    });

  }
));
function generatePassword(length) {
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
module.exports = passport;