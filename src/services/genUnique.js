import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const initToken = (user, exp = "5m") => {
  const token = jwt.sign(
    {
      id: user._id,
      phone: user.phone,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: exp,
    }
  );
  return token;
};

export const generateRef = () => {
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

export const generateOTP = () => {
  var digits = "0123456789";
  var OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
