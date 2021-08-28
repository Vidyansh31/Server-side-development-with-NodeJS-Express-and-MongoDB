var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// importing Session and Session file store
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const Promotions = require('./models/promotion');
const leaders = require('./models/leader');

const url ='mongodb://localhost:27017/confusion';

const connect = mongoose.connect(url);

connect.then((db)=>{
  console.log('Connected Correctly to server');
},(err)=>{console.log(err);});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321'));

// using Session in app
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized:false,
  resave: false,
  store : new FileStore()
}));

function auth(req, res, next) {
  console.log(req.session);
  // check if the session is set or not
  if(!req.session.user)
  {
    //If not Set then we need to get authentication
    var authHeader = req.headers.authorization;

    if(!authHeader) {
        var err = new Error('You are not authenticated');
    
        res.setHeader('WWW-Authenticate','Basic');
        err.statuscode = 401;
        return next(err);
        
      }
      var auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
      var username = auth[0];
      var password = auth[1];
    
      if(username==="admin" && password==="password")
      {
        //Creating a Session
        req.session.user = "admin";
        next();//authorized
      }
      else
      {
        var err = new Error('You are not authorized');
    
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
      }
     
  }
  else{
    if(req.session.user === 'admin')
    {
      console.log('req.session: ',req.session);
      next();
    }
    else{
      var err = new Error('You are not authorized');
    
       
        err.status = 401;
        return next(err);
    }
  }
  
}

app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

// catch 404 and forward to error handler
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

module.exports = app;
