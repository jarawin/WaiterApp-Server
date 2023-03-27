import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://api-v2.thaibulksms.com/sms";

const SMS_KEY = "ChOLs87aU7iVJpnohscBvpIlRP9UdK";
const SMS_SECRET = "vB4AJmVf-Cnno72HO6G9ms7GZ7rMQI";

// export const requestOTP = async (msisdn) => {
//   const payload = `key=${process.env.SMS_KEY}&secret=${process.env.SMS_SECRET}&msisdn=${msisdn}`;
//   const headers = {
//     accept: "application/json",
//     "content-type": "application/x-www-form-urlencoded",
//   };
//   try {
//     const response = await axios.post(`${BASE_URL}/request`, payload, headers);
//     return response;
//   } catch (error) {
//     console.warn("Error requestOTP", error.response.data);
//   }
// };

// export const verifyOTP = async (token, otp) => {
//   const payload = `key=${process.env.SMS_KEY}&secret=${process.env.SMS_SECRET}&token=${token}&pin=${otp}`;
//   const headers = {
//     accept: "application/json",
//     "content-type": "application/x-www-form-urlencoded",
//   };
//   try {
//     const response = await axios.post(`${BASE_URL}/verify`, payload, headers);
//     return response.data;
//   } catch (error) {
//     console.warn("Error verifyOTP", error.response.data);
//   }
// };
import api from "api";
const sdk = api("@thaibulksms/v1.0#5alni1epl6dge9p1");

export const sendSMS = async (msisdn, message) => {
  sdk.auth(
    process.env.SMS_KEY || SMS_KEY,
    process.env.SMS_SECRET || SMS_SECRET
  );

  try {
    const response = await sdk.postSms(
      {
        msisdn: msisdn,
        message: message,
        sender: "WaiterApp",
      },
      { accept: "application/json" }
    );
    return response;
  } catch (error) {
    console.warn("Error sendSMS", error);
  }
};
