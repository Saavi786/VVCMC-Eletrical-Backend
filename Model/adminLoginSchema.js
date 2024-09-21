const mongoose = require("mongoose");

const AdminLoginSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  Ward: {
    type: String,
    required: true,

  },
  HashPassword: {
    type: String,
    required: true,
  },
  SuperAdmin: {
    type: Boolean,
    default: false,
  },
});

const LoginData = mongoose.model("loginData", AdminLoginSchema);

module.exports = LoginData;
