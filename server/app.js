//引入模块
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mysql = require('mysql');
myConnection = require('express-myconnection'),
dbOptions = {
    // host: '120.79.142.109',
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'manage'
};

var index = require('./routes/index');
var users = require('./routes/users');
var instrument = require('./routes/instrument');
var equipment = require('./routes/equipment');
var tools = require('./routes/tools');
var chemical = require('./routes/chemical');
var material = require('./routes/material');
var history = require('./routes/history');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname,'public'))); 
app.use(express.static(path.join(__dirname,'dist'))); 
app.use(myConnection(mysql, dbOptions, 'single')); //作为中间件来使用

app.use('/', index);
app.use('/users', users);
app.use('/instrument', instrument);
app.use('/tools', tools);
app.use('/equipment', equipment);
app.use('/chemical', chemical);
app.use('/material', material);
app.use('/history', history);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
