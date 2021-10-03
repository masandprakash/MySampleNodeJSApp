const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');
const employeeRoute = require('./employees')

const router = express.Router();

module.exports = params => {
  const { speakersService } = params;

  router.get('/', async (request, response, next) => {
    try {
      if (typeof request.session.isAuthenticated == 'undefined') {
        request.session.isAuthenticated = false;
      } else if (request.session.isAuthenticated == true) {
        console.log('logged in...');
      }
      isAuthenticated = request.session.isAuthenticated;
      const artwork = await speakersService.getAllArtwork();
      const topSpeakers = await speakersService.getList();
      return response.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        artwork,
        isAuthenticated,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));
  router.use('/employees',employeeRoute(params));

  return router;
};
