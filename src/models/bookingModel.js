const mongoose = require("mongoose");
const { TRUE } = require("node-sass");

const bookingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    // default: Date.now.toISOString(),
    default: Date.now
  },
  takenTime: {
    type: String,
    required: true,
  },
  returnTime: {
    type: String,
    required: true,
  },
  booking_id: {
    type: Number,
    required: true,
    default: 1,
  },
  status: {
    type: String,
    enum: ["booked", "pending", "in-active"],
    required: true,
    default: "pending",
  },
  specialInstructions: {
    type: String,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
