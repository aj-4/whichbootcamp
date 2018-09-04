const Review = require('../models').Review;
const CryptoJS = require("crypto-js");
const logger = require('../config/winston');

module.exports = {
  create(req, res, next) {
    const bcName = req.body.bootcampName === 'unlisted' ? 
                   req.body.newBootcamp 
                   : req.body.bootcampName;
    return Review
      .create({
        bootcampId: req.body.bootcampId,
        bootcampName: bcName,
        email: req.body.email,
        goodInstructors: req.body.goodInstructors,
        jobSpeed: req.body.jobSpeed,
        worthTheMoney: req.body.worthTheMoney,
        wouldAttendAgain: req.body.wouldAttendAgain,
        futureOutlook: req.body.futureOutlook,
        average: req.body.average,
      })
      .then(() => {
        logger.info(`[Review][Created by] ${req.body.email} for ${bcName}`)
        next();
      })
      .catch(error => {
        logger.error(`[Review][Create Error] ${req.body.email} for ${bcName}`)
        res.status(400).send(error)
      });
  },
  confirmReview(req, res) {
    const emailCodeToEmail = CryptoJS.AES.decrypt(req.params.emailCode.replace('conf', '/'), 'Emailcrypt').toString(CryptoJS.enc.Utf8);

    return Review
      .update(
        {verified: true},
        {where: {email: emailCodeToEmail}}
      )
      .then(() => {
        logger.info(`[Review][Confirmed by]${emailCodeToEmail}`)
        res.status(201).send(`
        <!DOCTYPE html>
          <html>
            <head>
              <style>
                .container {position:relative;width:100vw;height:100vh;font-family:"Helvetica","sans-serif";}
                .content   {position:absolute;top:30%;left:50%;transform:translateX(-50%);text-align:center;}
                .heading   {font-size:18px;margin-bottom:30px;text-transform:uppercase;letter-spacing:3px;}
        				.thank-you {margin-bottom:10px}
              
                </style>
            </head>
              <body>
              
            <div class="container">
              <div class="content">
                <div class="heading">Thanks for Confirming!</div>
                <div class="thank-you">Your review will help improve the site</div>
                <a href="https://whichbootcamp.com">Return to site</a>
              </div>
            </div>
        
            </body>
          </html>

        `);
      })
      .catch(error => {
        logger.error(`[Review][Confirm Error] by ${emailCodeToEmail} [ERR] ${error}`)
        res.status(400).send(error)
      });
  }
};