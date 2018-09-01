const winston = require('winston');
const { createLogger, format, transports } = winston
const { combine, timestamp, simple, colorize, printf } = format
const appRoot = require('app-root-path');

const logFormat = printf(info => {
    return `${info.timestamp} | ${info.level} | ${info.message}`;
  });
  

const options = {
    console: {
        format: combine(
            colorize(),
            simple()
        ),
        handleExceptions: true,
    }
}

const logger = createLogger({
    level: 'info',
    // format: combine(
    //     timestamp({format: 'YYYY-MM-DD HH:ss:mm'}),
    //     prettyPrint(),
    // ),
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new transports.File({
        format: combine(
            timestamp({format: 'YYYY-MM-DD HH:ss:mm'}),
            logFormat
        ),
        filename: `${appRoot}/logs/combined.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 2
      }),
      new transports.File({
        format: combine(
            timestamp({format: 'YYYY-MM-DD HH:ss:mm'}),
            logFormat
        ),
        filename: `${appRoot}/logs/error.log`, 
        level: 'error', 
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 2,
      })
    ],
    exitOnError: false
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console(options.console));
  }

  logger.stream = {
    write: function(message, encoding) {
            // use the 'info' log level so the output 
            // will be picked up by both transports (file and console)
            logger.info('[morgan] ' + message);
        },
    };
  
  module.exports = logger;