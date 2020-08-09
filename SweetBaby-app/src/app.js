// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
//const session = require('./node_modules/express-session');
const session = require('express-session');
//const recordame = require ('./middwares/middRecordame')

// ************ express() ************
var app = express();

// ************ Middlewares ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'user secret',
  resave: false,
  saveUninitialized: true,
}));
const middUserName = require ('./middwares/middUserName')
//app.use (middUserName);

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE


// ************ Template Engine ************
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const mainRouter = require('./routes/main'); // Rutas main
const productsRouter = require('./routes/products'); // Rutas /products
const usersRouter = require('./routes/users'); // Rutas /products
const apiRouterProducts = require('./routes/Api/productApi'); // Rutas Api/products
const apiRouterUsers = require('./routes/Api/userApi'); // Rutas Api/products


app.use('/',  mainRouter);
app.use('/products', productsRouter);
app.use('/user', usersRouter);
app.use('/api', apiRouterProducts);
app.use('/api', apiRouterUsers);


// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;
