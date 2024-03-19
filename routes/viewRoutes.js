const express = require('express');
const viewControllers = require('../controllers/viewControllers');
const authControllers = require('../controllers/authControllers');
const bookingControllers = require('../controllers/bookingControllers');

const router = express.Router();

router.get(
  '/',
  bookingControllers.createBookingCheckout,
  authControllers.isLoggedIn,
  viewControllers.getOverview,
);
router.get('/tour/:slug', authControllers.isLoggedIn, viewControllers.getTour);
router.get('/login', authControllers.isLoggedIn, viewControllers.getLoginForm);
router.get('/me', authControllers.protect, viewControllers.getAccount);
router.get('/my-tours', authControllers.protect, viewControllers.getMyTours);

router.post(
  '/submit-user-data',
  authControllers.protect,
  viewControllers.updateUserData,
);

module.exports = router;
