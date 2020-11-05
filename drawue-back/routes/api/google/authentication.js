var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const {generatePassword, generateUsername } = require('../../../helpers/generators');
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
            var new_password = generatePassword(12);
            rug.setAdjectives(['Fast', 'Dangerous', 'Bland', 'Slow', 'Speedy', 'Gamer', 'Drawer', 'Painter', 'Artistic']);
            rug.setSeperator('');
            var new_username = rug.generate();
            new_username = new_username.slice(0, 12);
            generateUsername(new_username)
                .then((newUsername)=>{

                    userNew = new User({
                        username: String(newUsername),
                        email: profile.emails[0].value,
                        password: new_password,
                        profilePic: 'default-user.png',
                        emailConfirmed: true,
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
                })
                .catch((err)=>{
                    if (err) return err;
                });
        }
    });

  }
));

module.exports = passport;