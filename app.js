require('dotenv').config()
const path = require('path');
const Raven = require('raven')
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const winston = require('./server/config/winston')
const error = require('./server/controllers/error')

const app = express();
const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001;

if (process.env.NODE_ENV === 'production') {
  Raven.config('https://b2d0d26c00b842978a7a5652d077f76d@sentry.io/1272805').install();
  app.use(Raven.requestHandler());
}

app.set('etag', false);

// if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(path.join(__dirname,'client/build')));
  app.use(express.static(path.join(__dirname,'client/build')));
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny', {stream: winston.stream}));

require('./server/routes')(app);
app.get('*', function(req, res, next) {
  // This middleware throws an error, so Express will go straight to
  // the next error handler
  setImmediate(() => { next(new Error('Error')); });
});

app.use(Raven.errorHandler());
app.use(error.clientErrorHandler);
app.use(error.errorHandler);

app.listen(PORT, () => console.log(`listening on ${PORT}...`));