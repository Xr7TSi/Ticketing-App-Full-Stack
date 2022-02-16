const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResetPinSchema = new Schema({
  pin: {
    type: String,
    required: true,
    maxLength: 6,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    maxLength: 100,
  },
  addedAt: {
    type: Date,
    required:true,
    default: Date.now,
  },
});

module.exports = {
  // "Reset_Pin" creates the mongoDb table "reset_pins"
  ResetPinSchema: mongoose.model("Reset_pin", ResetPinSchema),
};
