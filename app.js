'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');

const db = require('./models');
const { sequelize, Book } = require('./models');
const {Op} = db.Sequelize;

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// Project Requirements
let indexRouter = require('./routes/index')
app.use('/api', indexRouter)

/* Test Database Connection. Return a success or failure message, 
depending on whether the database connection was successful.
*/
app.get('/', async(req, res) => {
  await sequelize.sync()
  try {
    console.log("Connection successful!")
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
