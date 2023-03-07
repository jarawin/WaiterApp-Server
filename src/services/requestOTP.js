import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const URL_REQUEST_OTP = "https://otp.thaibulksms.com/v2/otp/request";

const requestOTP = async (msisdn) => {
  const payload = `key=${process.env.KEY}&secret=${process.env.SECRET}&msisdn=${msisdn}`;
  const headers = {
    accept: "application/json",
    "content-type": "application/x-www-form-urlencoded",
  };

  const response = await axios.post(URL_REQUEST_OTP, payload, headers);
  return response.data;
};

export default requestOTP;
