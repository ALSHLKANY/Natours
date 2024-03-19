const express = require('express');
const reviewControllers = require('../controllers/reviewControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.use(authControllers.protect);

router
  .route('/')
  .get(reviewControllers.getAllReviews)
  .post(
    authControllers.restrictTO('user'),
    reviewControllers.setTourUserIds,
    reviewControllers.createReviews,
  );

router
  .route('/:id')
  .get(reviewControllers.getReview)
  .patch(
    authControllers.restrictTO('user', 'admin'),
    reviewControllers.updateReview,
  )
  .delete(
    authControllers.restrictTO('user', 'admin'),
    reviewControllers.deleteReview,
  );
module.exports = router;
