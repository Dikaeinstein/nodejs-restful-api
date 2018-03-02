const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = require('./routes');

const app = express();
// Log incoming requests
app.use(logger('dev'));

// Parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up api routes
app.use('/api', router);

// catch all error handler
// Will print stack trace in development
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json((app.get('env') === 'development') ?
      {
        status: 'error',
        message: err.message,
        stack: err.stack,
      }
      :
      {
        status: 'error',
        message: err.message,
      });
});

module.exports = app;
