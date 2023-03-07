import express from "express";
import axios from "axios";
const app = express();

app.get("/", async (req, res) => {
  let url = "https://otp.thaibulksms.com/v2/otp/request";

  let payload =
    "key=1759677016834222&secret=3ff7e1f0c175d98830150f1be2b3c6e4&msisdn=0987652021";
  let headers = {
    accept: "application/json",
    "content-type": "application/x-www-form-urlencoded",
  };

  const response = await axios.post(url, payload, headers);
  res.send(response.data);
});

export default app;
