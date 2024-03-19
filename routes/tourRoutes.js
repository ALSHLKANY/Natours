/* eslint-disable import/no-useless-path-segments */
const express = require('express');
const tourControllers = require('../controllers/tourControllers');
const authControllers = require('../controllers/authControllers');
const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);
router
  .route('/top-:n-cheap')
  .get(tourControllers.aliasTopTour, tourControllers.getAllTours);

router.route('/tours-stats').get(tourControllers.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authControllers.protect,
    authControllers.restrictTO('admin', 'lead-guide', 'guide'),
    tourControllers.getMonthlyPlan,
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourControllers.getTourWithin);

router.route('/distances/:latlng/unit/:unit').get(tourControllers.getDistances);

router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(
    authControllers.protect,
    authControllers.restrictTO('admin', 'lead-guide'),
    tourControllers.createTour,
  );
router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(
    authControllers.protect,
    authControllers.restrictTO('admin', 'lead-guide'),
    tourControllers.uploadTourImages,
    tourControllers.resizeTourImages,
    tourControllers.updateTour,
  )
  .delete(
    authControllers.protect,
    authControllers.restrictTO('admin', 'lead-guide'),
    tourControllers.deleteTour,
  );

module.exports = router;
