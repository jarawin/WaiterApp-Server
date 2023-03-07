import express from "express";
import dotenv from "dotenv";
dotenv.config();

const route = express.Router();

// validate otp format middleware
route.use((req, res, next) => {
  const { otp } = req.body;
  const regex = /^[0-9]{4}$/;
  if (regex.test(otp)) {
    next();
  } else {
    res.status(400).json({
      message: "Invalid OTP format",
    });
  }
});

export default route;
