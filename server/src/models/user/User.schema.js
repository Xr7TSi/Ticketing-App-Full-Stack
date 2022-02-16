const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
    maxLength: 100,
  },
  password: {
    type: String,
    required: true,
    maxLength: 100,
  },
  company: {
    type: String,
    maxLength: 100,
  },
  address: {
    type: String,
    maxLength: 100,
  },
  phone: {
    type: String,
    maxLength: 25,
  },
  refreshJWT: {
    token: {
      type: String,
      maxLength: 500,
      default: "",
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = {
  // "User" creates the mongoDb table "users"
  UserSchema: mongoose.model("User", UserSchema),
};
