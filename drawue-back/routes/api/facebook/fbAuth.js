
const { User } = require('../../../models/user');
var rug = require('random-username-generator');
const {generatePassword, generateUsername } = require('../../../helpers/generators');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const config = require('config');


const AdjectivesList = [
    'Fast', 'Dangerous', 'Bland', 'Slow', 'Speedy', 'Gamer', 'Drawer', 'Painter', 'Artistic'
];
const temp_generated_password_length = 12;
passport.use(new FacebookStrategy({
    clientID: config.get('FacebookAppID'),
    clientSecret: config.get('FacebookAppSecret'),
    callbackURL: "http://localhost:5000/api/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email: profile.emails[0].value}, (user_error, user)=>{
        if (user_error) {
            return done(user_error);
        }
        if(user){
            done(null,user);
        }
        else{
            var new_password = generatePassword(temp_generated_password_length);
            rug.setAdjectives(AdjectivesList);
            rug.setSeperator('');
            var new_username = rug.generate();
            new_username = new_username.slice(0, temp_generated_password_length);

            generateUsername(new_username)
                .then((newUsername)=>{

                    let userNew = new User({
                        username: String(newUsername),
                        email: profile.emails[0].value,
                        password: new_password,
                        profilePic: 'default-user.png',
                        emailConfirmed: true,
                    });
                    bcrypt.genSalt(10, function(salt_error, salt) {
                        if (salt_error) return next(salt_error);            
                        bcrypt.hash(userNew.password, salt, function(hash_error, hash) {
                            if (hash_error) return hash_error;
                            userNew.password = hash;
                            userNew.save().then(()=>{
                                done(null, userNew);
                            });
                        });
                    });
                })
                .catch((generate_username_error)=>{
                    if (generate_username_error) return generate_username_error;
                });
            
        }
    });
  }
));
module.exports = passport;