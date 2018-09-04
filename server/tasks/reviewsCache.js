const redis = require('../config/redis');
const Bootcamp = require('../models').Bootcamp;
const Review = require('../models').Review;
const {promisify} = require('util');
const hgetallAsync = promisify(redis.hgetall).bind(redis);
const logger = require('../config/winston');
/* 
data model
{
  1: {
    goodInstructors: {
      positive: 4
      negative: 2
    },
    worthTheMoney: {
      positive: 4,
      negative: 1
    }
  }
}
*/

const questions = [
  'goodInstructors',
  'jobSpeed',
  'worthTheMoney',
  'wouldAttendAgain',
  'futureOutlook'
]

const incrementReviewType = (buckets, bootcampId, question, positiveOrNegative) => {
  if (!buckets[bootcampId][question][positiveOrNegative]) {
    buckets[bootcampId][question][positiveOrNegative] = 0;
  }
  buckets[bootcampId][question][positiveOrNegative]++;
}

const initializeQuestions = (buckets, bootcampId) => {
  // should run once per bucket
  for (let question of questions) {
    buckets[bootcampId][question] = {
      positive: 0,
      negative: 0
    }
  }
}

const fillQuestionBucket = (buckets, bootcamp) => {
  initializeQuestions(buckets, bootcamp.id);
  let reviewCount = 0;
  bootcamp.Reviews.forEach(reviewObject => {
    const review = reviewObject.dataValues;
    const {bootcampId} = review;
    if (!review.verified) {
      return;
    } else {
      reviewCount++
    }
    for (let question of questions) {
      // review may be NULL, so only count FALSE for negative
      if (review[question] === false) {
        incrementReviewType(buckets, bootcampId, question, 'negative');
      } else if (review[question] === true) {
        incrementReviewType(buckets, bootcampId, question, 'positive');
      } 
    }
  })
  redis.hset(`bootcamp-reviews-${bootcamp.id}`, 'reviewCount', reviewCount);
}

const getBucketAverages = (buckets, bootcamp) => {
  const bootcampId = bootcamp.id;
  for (let question of questions) {
    let average;
    let totalAnswers = (buckets[bootcampId][question]['positive'] + buckets[bootcampId][question]['negative'])
    if (!totalAnswers) {
      average = 0;
    } else {
      average = buckets[bootcampId][question]['positive'] / totalAnswers;
    }
    buckets[bootcampId][question]['average'] = average;
    redis.hset(`bootcamp-reviews-${bootcampId}`, question, average);
  }
}

const setMetaScore = (buckets, bootcamp) => {
  const bootcampId = bootcamp.id;
  let questionCount = Object.keys(buckets[bootcampId]).length;
  let scoreSum = 0;
  for (let question of questions) {
    if (!buckets[bootcampId][question]['average']) questionCount--;
    scoreSum = scoreSum + buckets[bootcampId][question]['average'];
  }
  let metaScore;
  if (!questionCount) {
    metaScore = 0;
  } else {
    metaScore = scoreSum / questionCount;
  }
  redis.hset(`bootcamp-reviews-${bootcampId}`, 'metaScore', metaScore);
}

const processReviews = (bootcampReviews) => {
  const buckets = [];
  bootcampReviews.forEach(bootcamp => {
    buckets[bootcamp.id] = {};
    fillQuestionBucket(buckets, bootcamp);
    getBucketAverages(buckets, bootcamp);
    setMetaScore(buckets, bootcamp);
  })
}

module.exports = {
    cacheReviewAverages() {
        return Bootcamp
          .findAll({
            include: [{
              model: Review,
              as: 'Reviews',
            }],
          })
          .then(bootcampReviews => {
            redis.set('reviewsAveragedTime', Date.now());
            return processReviews(bootcampReviews)
          })
          .catch(err => logger.error(`[REDIS][ERR] Setting bootcamps err: ${err}`))
    },
    getReviewAverages(bootcamp) {
      return hgetallAsync(`bootcamp-reviews-${bootcamp.id}`)
            .then(res => {
              bootcamp.dataValues.avgReviewStats = res;
              return res;
            })
            .catch(err => logger.error(`[REDIS][ERR] Retrieving bootcamps err: ${err}`))
    }
}