const dotenv = require('dotenv');
dotenv.config();
const express      = require('express');
const path         = require('path');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const cors = require('cors');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}

const strategy = new jwtStrategy(opts, (payload, next) => {
  // get user from db
  const user = null;
  next(null, user);
});

passport.use(strategy);
app.use(passport.initialize());

mongoose
  .connect('mongodb://rmayo:password123@ds131905.mlab.com:31905/vue_chat', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// Middleware
app.use('/style', express.static(__dirname + '/style'));
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// default value for title local
app.locals.title = 'Chat Server';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
const auth = require('./routes/auth/auth');
app.use('/', index);
app.use('/auth', auth)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const port = process.env.PORT || 3001;
http.listen(port, () => {
    console.log( `Listening on port ${port}!`);
})
io.on('connection', (socket) => {
  var address = socket.handshake;
  console.log('There\'s a connection, with ID ', socket.id);
  socket.on('SEND_MESSAGE', (data) => {
      console.log(data);
      io.emit('MESSAGE', data)
  })
})

module.exports = app;
