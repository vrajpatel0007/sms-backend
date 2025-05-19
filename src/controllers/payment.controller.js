// const Payment = require('../models/Payment.model'); // Assuming your model is in a models directory
// const { payment, downloadInvoice } = require('../services/razorpay.service'); // Path to the Razorpay service

// // Create a new payment record and initiate payment
// const createPayment = async (req, res) => {
//     const { residentId, amount, paymentType, incomeId, societyId, paymentMethod } = req.body;

//     try {
//         // Validate input and create a payment record
//         const paymentRecord = new Payment({
//             residentid: residentId,
//             amount,
//             paymenttype: paymentType,
//             incomeId,
//             societyid: societyId,
//             paymentMethod
//         });

//         await paymentRecord.save();

//         // Initiate payment order with Razorpay
//         const order = await payment(amount * 100, 'INR', paymentRecord._id.toString());

//         res.status(201).json({ success: true, order, paymentRecord });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Fetch and download an invoice
// const fetchInvoice = async (req, res) => {
//     const { invoiceId } = req.params;

//     try {
//         const filePath = await downloadInvoice(invoiceId);

//         res.download(filePath, (err) => {
//             if (err) {
//                 throw new Error('Error sending file');
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// module.exports = {
//     createPayment,
//     fetchInvoice
// };
require("dotenv").config();
const Payment = require("../models/Payment.model");
const {
  payment,
  downloadInvoice,
  verifySignature,
} = require("../services/razorpay.service"); // assumed service

// Initiate Razorpay Order and create DB record
const createPayment = async (req, res) => {
  const { amount, paymentType, incomeId, paymentMethod } = req.body;
  console.log("🚀 ~ createPayment ~ req.body:", req.body)
  if ( !amount || !paymentType || !incomeId || !paymentMethod) {
    return res.status(400).json({
      success: false,
      message: "Payment validation failed: " + [
        !amount && "amount: Path `amount` is required.",
        !paymentType && "paymenttype: Path `paymenttype` is required.",
        !incomeId && "incomeId: Path `incomeId` is required.",
        !paymentMethod && "paymentMethod: Path `paymentMethod` is required.",
      ].filter(Boolean).join(", "),
    });
  }
  try {
    // 1. Create a DB record
    const paymentRecord = new Payment({
      residentid: req.user._id,
      amount,
      paymenttype: paymentType,
      incomeId,
      societyid: req.user.societyid,
      paymentMethod,
      haspaid: false,
    });
    console.log("🚀 ~ createPayment ~ paymentRecord:", paymentRecord)

    await paymentRecord.save();

    // 2. Create Razorpay order
    const order = await payment(
      amount * 100,
      "INR",
      paymentRecord._id.toString()
    );

    res.status(201).json({ success: true, order, paymentRecord });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Razorpay signature after frontend success
const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;
  const paymentId = req.params.id; // Assuming you pass payment ID in the URL params
  console.log("🚀 ~ verifyPayment ~ req.body;:", req.body)

  try {
    const isValid = verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature!" });
    }

    // Update DB to mark payment as paid
    await Payment.findByIdAndUpdate(paymentId, {
      haspaid: true,
      paymentdate: new Date(),
    });
    return res.redirect(`https://sms-frontend-plum.vercel.app/payment-success?refresh=${razorpay_payment_id}`)
    res
      .status(200)
      .json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Download invoice
const fetchInvoice = async (req, res) => {
  const { invoiceId } = req.params;

  try {
    const filePath = await downloadInvoice(invoiceId);
    res.download(filePath);
  } catch (error) {
    console.error("Invoice download error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getkey = async (req, res) => {
  try {
    const key = process.env.RAZORPAY_KEY_ID;
    res.status(200).json({ key });
  } catch (error) {
    console.error("Error fetching Razorpay key:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  createPayment,
  verifyPayment,
  fetchInvoice,
    getkey,
};
