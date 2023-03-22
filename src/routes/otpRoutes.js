import express from "express";
import {
  requestOTP,
  checkCanSentOTP,
  confirmOTP,
} from "../controllers/otpControllers.js";

const router = express();

router.post("/request", requestOTP);
router.get("/check", checkCanSentOTP);
router.post("/confirm", confirmOTP);

router.get("/", (req, res) => {
  res.send("OTP route");
});

export default router;
