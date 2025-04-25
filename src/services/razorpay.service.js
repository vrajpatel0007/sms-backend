// const fs = require('fs');
// const razorpay = require('razorpay');
// const path = require('path');

// // Read configuration from a separate file
// const config = JSON.parse(fs.path('../config/config.js', 'utf8'));

// // Initialize Razorpay with configuration
// const razorpayInstance = new razorpay({
//   key_id: config.razorpay_key_id,
//   key_secret: config.razorpay_key_secret,
// });
//   console.log("🚀 ~ key_id: ",  config.razorpay_key_id, config.razorpay_key_secret,)

// // Function to create a new dynamic order
// const payment = async (amount, currency = 'INR', receipt, paymentCapture = 1, notes = {}) => {
//   try {
//     const options = {
//       amount,
//       currency,
//       receipt,
//       payment_capture: paymentCapture,
//       notes
//     };
//     const order = await razorpayInstance.orders.create(options);
//     return order;
//   } catch (error) {
//     throw new Error('Error Payment: ' + error.message);
//   }
// };

// // Function to fetch and download an invoice
// const downloadInvoice = async (invoiceId) => {
//   try {
//     const invoice = await razorpayInstance.invoices.fetch(invoiceId);

//     // Prepare invoice data for downloading
//     const filePath = path.join(__dirname, 'invoices', `invoice_${invoiceId}.json`);
//     fs.writeFileSync(filePath, JSON.stringify(invoice, null, 2));

//     return filePath;
//   } catch (error) {
//     throw new Error('Error fetching invoice: ' + error.message);
//   }
// };

// module.exports = {
//   payment,
//   downloadInvoice
// };
require("dotenv").config();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

const payment = async (amount, currency, receipt) => {
    return await razorpay.orders.create({
        amount,
        currency,
        receipt,
        payment_capture: 1
    });
};

const verifySignature = (order_id, payment_id, signature) => {
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    hmac.update(order_id + "|" + payment_id);
    const generatedSignature = hmac.digest("hex");
    return generatedSignature === signature;
};

const downloadInvoice = async (invoiceId) => {
  try {
        const invoice = await razorpayInstance.invoices.fetch(invoiceId);
    
        // Prepare invoice data for downloading
        const filePath = path.join(__dirname, 'invoices', `invoice_${invoiceId}.json`);
        fs.writeFileSync(filePath, JSON.stringify(invoice, null, 2));
    
        return filePath;
      } catch (error) {
        throw new Error('Error fetching invoice: ' + error.message);
      }
};

module.exports = {
    payment,
    verifySignature,
    downloadInvoice
};
