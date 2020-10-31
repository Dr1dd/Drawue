
const { User } = require('../../../models/user');
var rug = require('random-username-generator');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const config = require('config');

passport.use(new FacebookStrategy({
    clientID: config.get('FacebookAppID'),
    clientSecret: config.get('FacebookAppSecret'),
    callbackURL: "http://localhost:5000/api/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email: profile.emails[0].value}, (err, user)=>{
        if (err) {
            return done(err);
        }
        if(user){
            done(null,user);
        }
        else{
            var new_password = generatePassword(12);
            rug.setAdjectives(['Fast', 'Dangerous', 'Bland', 'Slow', 'Speedy', 'Gamer', 'Drawer', 'Painter', 'Artistic']);
            rug.setSeperator('');
            var new_username = rug.generate();
            new_username = new_username.slice(0, 12);
            
            userNew = new User({
                username: String(new_username),
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
                        done(null, userNew);
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