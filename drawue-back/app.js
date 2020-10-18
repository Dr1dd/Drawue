const config = require('config');
const express = require('express');
var path = require('path');
var helmet = require('helmet');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var cors = require('cors');

var register = require('./routes/api/register');
var verification = require('./routes/api/verification');

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

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//working routes
app.use('/api/auth/register', register);
app.use('/api/auth/verification', verification);


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
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(PORT, ()=>{
    console.log("listening on port "+PORT);
});

module.exports = app;