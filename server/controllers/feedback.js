const Feedback = require('../models').Feedback;
const logger = require('../config/winston');

module.exports = {
  create(req, res, next) {
    const {feedbackType, feedback} = req.body;
    return Feedback
      .create({
        feedbackType,
        feedback
      })
      .then(() => {
        logger.info(`[Feedback][${feedbackType}] ${feedback}`)
        return res.status(201).send({success: 'true'});
      })
      .catch((error) => {
        logger.error(`[Feedback][${feedbackType}] ${feedback} [ERR] ${error}`)
        return res.status(400).send(error)
      });
  }
};