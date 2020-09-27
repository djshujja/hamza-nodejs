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
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  takenTime: {
    type: Date,
    // required:true
  },
  returnTime: {
    type: Date,
    // required:true
  },
  booking_id: {
    type: Number,
    required: true,
    default: 1,
  },
  staus: {
    type: String,
    enum: ["booked", "pending", "in-active"],
    required: false,
    default: "pending",
  },
  specialInstructions: {
    type: String,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "products",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
