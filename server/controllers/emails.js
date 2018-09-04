const nodemailer = require('nodemailer');
const CryptoJS = require("crypto-js");
const logger = require('../config/winston');

module.exports = {
    sendConfirmation(req, res, next) {
        
        let emailCode = CryptoJS.AES.encrypt(req.body.email, 'Emailcrypt').toString();
        console.log('emailCode is', emailCode, typeof emailCode)
        emailCode = emailCode.split('/').join('conf');

        console.log('got hash from email', emailCode);

        const confirmURL = process.env.NODE_ENV === 'production' ? 'https://whichbootcamp.com/confirm' : 'http://localhost:3001/confirm'

        logger.info(`[Email][Generated hash] for ${req.body.email}`);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'apietsch4@gmail.com',
                pass: 'rlrdovxvqnnwgtcw'
            }
        })
        const mailOptions = {
            from: `confirm@whichbootcamp.com`,
            to: `${req.body.email}`,
            subject: `Confirm Your Review For ${req.body.bootcampName}`,
            text: `Thanks for your Review! Please confirm with this link: ${confirmURL}/${emailCode}`,
            html: `<a href=${`${confirmURL}/${emailCode}`}>Click Here To Submit Your Review!</a><h3>Thanks for your Review!</h3>`,
            replyTo: `support@whichbootcamp.com`
          }
        transporter.sendMail(mailOptions, function(err, response) {
            if (err) {
                logger.error(`[Email][Invalid Email] ${req.body.email} [ERR] ${err}`);
                res.status(400).send({success: 'false', error: 'Email does not exist'});
            } else {
                logger.info(`[Email][Confirmation sent!] for ${req.body.email}`);
                if (!req.body.bootcampId) {
                    req.body.name = req.body.newBootcamp;
                    next();
                } else {
                    res.status(201).send(JSON.stringify({success: true}))
                }
            }
        })
    },
    sendNewBootcampAlert(req, res, next) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'apietsch4@gmail.com',
                pass: 'rlrdovxvqnnwgtcw'
            }
        })
        const mailOptions = {
            from: `support@whichbootcamp.com`,
            to: `support@whichbootcamp.com`,
            subject: `New Bootcamp Request: ${req.body.bootcampName}`,
            text: `${req.body.message}`,
            replyTo: `support@whichbootcamp.com`
          }
        return transporter.sendMail(mailOptions, function(err, response) {
            if (err) {
                console.error('there was an error: ', err);
            } else {
                return res.status(200).send(response);
            }
        })
    }
}

