import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const URL_VERIFY_OTP = "https://otp.thaibulksms.com/v2/otp/verify";

const verifyOTP = async (token, otp) => {
  const payload = `key=${process.env.KEY}&secret=${process.env.SECRET}&token=${token}&otp=${otp}`;
  const headers = {
    accept: "application/json",
    "content-type": "application/x-www-form-urlencoded",
  };
  const response = await axios.post(URL_VERIFY_OTP, payload, headers);
  return response.data;
};

export default verifyOTP;
