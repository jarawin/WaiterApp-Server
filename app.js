import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import userRoutes from "./src/routes/user.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
