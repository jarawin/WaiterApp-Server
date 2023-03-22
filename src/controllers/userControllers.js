import { v4 as uuidv4 } from "uuid";

import { User } from "../models/userModel.js";
import { initToken } from "../services/genUnique.js";

export const passAuth = async (req, res) => {
  return res.send("pass authentication!").status(200);
};
