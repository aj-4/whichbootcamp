const bootcampController = require('../controllers').bootcamps;
const reviewController = require('../controllers').reviews;
const feedbackController = require('../controllers').feedback;
const programController = require('../controllers').programs;
const emailController = require('../controllers').emails;

module.exports = (app) => {
    app.get('/confirm/:emailCode', reviewController.confirmReview)
    
    app.post('/api/bootcamps', bootcampController.create, programController.fromBootcamp);
    app.get('/api/bootcamps', bootcampController.list, bootcampController.getReviews);

    app.post('/api/review', reviewController.create, emailController.sendConfirmation, bootcampController.create);
    app.post('/api/feedback', feedbackController.create);
    // app.get('/api/bootcamps/reviews', bootcampController.getReviews);

    app.post('/send', emailController.sendConfirmation);

  };