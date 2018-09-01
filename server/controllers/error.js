const winston = require('../config/winston')

module.exports = {
    clientErrorHandler(err, req, res, next) {
        // req.xhr detects ajax requests
        if (req.xhr) {
            winston.error(`CLIENT ERROR - ${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({ error: 'Something went wrong...' })
        } else {
            next(err)
        }
    },
    errorHandler (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        winston.error(`[${err.status || 500}] - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

        // render the error page
        res.status(err.status || 500);
        res.send('error');
    }
}