const redis = require('../config/redis');
const {promisify} = require('util');
const getAsync = promisify(redis.get).bind(redis);
const {getReviewAverages, cacheReviewAverages} = require('../tasks/reviewsCache');
const Bootcamp = require('../models').Bootcamp;
const Review = require('../models').Review;
const Program = require('../models').Program;
const logger = require('../config/winston');

module.exports = {
  create(req, res, next) {
    const {name, verified, camel, 
      websiteURL, logoURL, miniLogoURL, 
      locations, languages, programs, 
      bcColor} = req.body;
    return Bootcamp
      .create({
        name,
        verified,
        camel,
        websiteURL,
        logoURL,
        miniLogoURL,
        locations,
        languages,
        programs,
        bcColor
      })
      .then(bootcamp => {
        logger.info(`[Bootcamp][Created] ${name}`);
        if (!bootcamp.dataValues.verified) {
          // triggered by adding a review with new bc
          res.status(201).send({success: true});
        } else {
          // triggered by verified full insert endpoint
          console.log('nexting');
          req.body.bootcampSuccess = bootcamp;
          next();
        }
      })
      .catch(error => {
        logger.error(`[Bootcamp][Create Failed]${name} [ERR] ${error}`);
        res.status(400).send(error)
      });
  },
  list(req, res, next) {
      return Bootcamp
        .findAll({
          where: {
            verified: 1
          },
          include: [{
            model: Program,
            as: 'Programs',
          }]
        })
        .then(bootcamps => {
          req.body.bootcamps = bootcamps;
          next();
        })
        .catch(error => {
          logger.error(`[Bootcamp][GET Failed] [ERR] ${error}`);
          res.status(400).send(error)
        })
  },
  getReviews(req, res) {
      getAsync('reviewsAveragedTime').then(updatedTS => {
        /*1800000*/
        let updateCacheInterval;

        if (process.env.NODE_ENV === 'production') {
          // updatedCacheInterval = 1800000;
          // every 10m
          updateCacheInterval = 360000;
        } else {
          updateCacheInterval = 5000;
        }

        if (!updatedTS || Date.now() - updatedTS > updateCacheInterval) {
            cacheReviewAverages().then(() => {
            // recurse after cache is set
            module.exports.getReviews(req, res);
          })
        } else {
          const getCachePromises = [];
          req.body.bootcamps.forEach(bootcamp => {
            getCachePromises.push(getReviewAverages(bootcamp));
          })
          Promise.all(getCachePromises)
          .then( () => {
            res.status(200).send(req.body.bootcamps);
          })
          .catch(err => {
            logger.error(`[CACHE][GET Review Avgs failed] [ERR] ${err}`);
          })
        }
      })
  }
};