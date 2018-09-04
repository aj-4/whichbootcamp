const Program = require('../models').Program;
const logger = require('../config/winston');

module.exports = {
  fromBootcamp(req, res) {
    console.log('creating program', req.body.programs);
    const programPromises = [];
    const programs = JSON.parse(req.body.programs);
    programs.forEach(program => {
        programPromises.push(Program
        .create({
          title: program.title,
          camel: program.camel,
          cost: program.cost,
          details: program.details,
          duration: program.duration,
          otherDetails: program.otherDetails,
          bootcampId: req.body.bootcampSuccess.id,
        }))
    })
    return Promise.all(programPromises)
      .then(programSuccess => {
        req.body.bootcampSuccess.programs = programSuccess
        logger.info(`[Programs][Created] ${programSuccess}`);
        res.status(201).send(req.body.bootcampSuccess);
      })
      .catch(error => {
        logger.error(`[Programs][Create failed] [ERR] ${error}`);
        res.status(400).send(error)
      });
  }
};