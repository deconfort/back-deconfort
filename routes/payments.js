const express = require('express')
const router = express.Router()
const passport = require("../config/passport");

const { create, confirmPayment, failedPayment } = require('../controllers/PaymentController');

router.post('/', passport.authenticate("jwt", { session: false }), create);
router.get('/success', confirmPayment);
router.get('/failure', failedPayment);

module.exports = router