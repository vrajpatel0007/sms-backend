const express = require('express');
const { createPayment, fetchInvoice, verifyPayment , getkey} = require('../controllers/payment.controller');
const { authUser } = require('../middleware/auth'); // assumed middleware for authentication

const router = express.Router();

// Route to create a new payment and initiate Razorpay order
router.post('/create',authUser, createPayment);

// Route to download an invoice
router.get('/invoice/:invoiceId',authUser, fetchInvoice);

router.get('/razorpay/key',authUser, getkey);

router.post('/verifypayment/:id', verifyPayment);


module.exports = router;
