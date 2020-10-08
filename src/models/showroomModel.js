const mongoose = require("mongoose");

const showroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // callTracking: {
  //   type: String,
  //   enum: ["Enabled", "Disabled"],
  //   default: "Disabled",
  // },

  status: {
    type: String,
    enum: ["Active", "Paused"],
    default: "Active",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dealer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "dealers",
  },
});

module.exports = mongoose.model("Showroom", showroomSchema);
