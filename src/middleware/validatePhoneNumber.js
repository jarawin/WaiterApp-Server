import express from "express";
import dotenv from "dotenv";
dotenv.config();

const route = express.Router();

// validate phone number middleware
route.use((req, res, next) => {
  const { phoneNumber } = req.body;
  const regex = /^0[0-9]{9}$/;
  if (regex.test(phoneNumber)) {
    next();
  } else {
    res.status(400).json({
      message: "Invalid phone number",
    });
  }
});

export default route;
