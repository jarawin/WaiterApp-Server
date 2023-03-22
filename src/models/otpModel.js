import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    match: /^0[0-9]{9}$/,
  },
  token: {
    type: String,
    required: true,
  },
  ref: {
    type: String,
    required: true,
  },
  lastRequest: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const OTPModel = mongoose.model("OTP", otpSchema);
export default OTPModel;
