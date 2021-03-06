var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

require('dotenv').config()
var mongoose = require('mongoose');

mongoose.connect(`mongodb://mario:mario123@ds157901.mlab.com:57901/hacktiv8-overflow`,{ useNewUrlParser: true },function(err){
  if(err){
    console.log(err);
  }else{
    console.log('connected')
  }
})
// require('./models/answer');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var questionRouter = require('./routes/question')
var answerRouter = require('./routes/answer')

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/question', questionRouter)
app.use('/answer', answerRouter)

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


// var CronJob = require('cron').CronJob;
// const nodemailer = require('nodemailer');
// new CronJob('* */1 * * * *', function() {
//     console.log('You will see this message every second');
//   }, null, true, 'America/Los_Angeles');
var cron = require('./middlewares/cron')
cron()


module.exports = app;
