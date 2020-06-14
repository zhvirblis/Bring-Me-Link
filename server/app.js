const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');
const reg = require('./routes/reg');
const link = require('./routes/link');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const jwtAuth = require('socketio-jwt-auth');
const conf = require('./conf');
const cors = require('cors');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

io.use(jwtAuth.authenticate({
    secret: conf.secret
}, function(payload, done) {
    return done(null, payload);
}));

io.on('connection', function (socket) {
    console.log('socket connect ' + socket.id);
    socket.join('user_room'+socket.request.user.id);
});

app.use('/', routes);
app.use('/', reg);
app.use('/', link(io));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.json(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.json(err);
});

app.set('port', process.env.PORT || 3000);

module.exports = server;

