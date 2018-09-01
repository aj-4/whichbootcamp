const Program = require('../models').Program;

module.exports = {
  fromBootcamp(req, res) {
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
        }));
    })
    return Promise.all(programPromises)
      .then(programSuccess => {
        req.body.bootcampSuccess.programs = programSuccess
        res.status(201).send(req.body.bootcampSuccess);
      })
      .catch(error => res.status(400).send(error));
  }
};