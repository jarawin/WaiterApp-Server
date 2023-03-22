import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// import corsOptions from "./src/config/corsOptions.js";
// import credentials from "./src/middleware/credentials.js";

// import userRoutes from "./src/routes/user.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";
import otpRoutes from "./src/routes/otpRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(express.static("public"));
app.use("/images", express.static("public/images"));

app.use("/service", serviceRoutes);
// app.use("/user", userRoutes);
app.use("/otp", otpRoutes);

app.get("/webhook", (req, res) => {
  res.send("webhook!");
  console.log("---> webhook!");
  console.log(req);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
