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
  callTracking: {
    type: String,
    enum: ["Enabled", "Disabled"],
    default: "Disabled",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Showroom", showroomSchema);
