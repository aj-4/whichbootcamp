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
    return Bootcamp
      .create({
        name: req.body.name,
        verified: req.body.verified,
        camel: req.body.camel,
        websiteURL: req.body.websiteURL,
        logoURL: req.body.logoURL,
        miniLogoURL: req.body.miniLogoURL,
        locations: req.body.locations,
        languages: req.body.languages,
        programs: req.body.programs,
        bcColor: req.body.bcColor
      })
      .then(bootcamp => {
        req.body.bootcampSuccess = bootcamp;
        next();
      })
      .catch(error => res.status(400).send(error));
  },
  list(req, res, next) {
      return Bootcamp
        .findAll({
          include: [{
            model: Program,
            as: 'Programs',
          }]
        })
        .then(bootcamps => {
          req.body.bootcamps = bootcamps;
          next();
        })
        .catch(error => res.status(400).send(error))
  },
  getReviews(req, res) {
      getAsync('reviewsAveragedTime').then(updatedTS => {
        /*1800000*/
        let updateCacheInterval;

        if (process.env.NODE_ENV === 'production') {
          // updatedCacheInterval = 1800000;
          // every 10m
          updateCacheInterval = 3600000 
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
          .catch(err => console.log('error setting promises', err))
        }
      })
  }
};