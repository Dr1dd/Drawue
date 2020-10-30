var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../../../models/user');
const config = require('config');
const bcrypt = require('bcrypt');
var rug = require('random-username-generator');

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
            return cb(err);
        }
        if(user){
            cb(null,user);
        }
        else{
            var password = generatePassword(12);
            rug.setName(['Gonzales', 'Gytis', 'John', 'America']);
            rug.setAdjectives(['Fast', 'Dangerous', 'Bland', 'Slow', 'Speedy', 'Gamer', 'Drawer', 'Painter', 'Artistic']);
            rug.setSeperator('');
            var new_username = rug.generate();
            new_username = new_username.slice(0, 12);
            userNew = new User({
                username: new_username,
                email: profile.emails[0].value,
                password: password,
                profilePic: 'default-user.png',
                emailConfirmed: true,
                registrationComplete: false,
            });
            bcrypt.genSalt(10, function(err, salt) {
                if (err) return next(err);            
                bcrypt.hash(userNew.password, salt, function(err, hash) {
                    if (err) return err;
                    userNew.password = hash;
                    userNew.save().then(()=>{
                        cb(null, userNew);
                    });
                });
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