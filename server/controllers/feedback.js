const Feedback = require('../models').Feedback;
const CryptoJS = require("crypto-js");

module.exports = {
  create(req, res, next) {
    console.log('got req', req.body);
    return Feedback
      .create({
        feedbackType: req.body.feedbackType,
        feedback: req.body.feedback
      })
      .then(() => {
        res.status(201).send({success: 'true'});
      })
      .catch(error => res.status(400).send(error));
  }
};