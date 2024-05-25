const mongoose = require("mongoose");

const Payment = mongoose.model(
  "Payment",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    currency: String,
    price: Number,
    token: String,
    dateProcessed: Date,
    bought: []
  })
);

module.exports = Payment;