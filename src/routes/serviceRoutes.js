import express from "express";
import {
  getAllFood,
  addOrder,
  getOrder,
} from "../controllers/serviceControllers.js";

const router = express();

router.get("/food", getAllFood);

router.get("/order", getOrder);
router.post("/order", addOrder);

router.get("/", (req, res) => {
  res.send("Service route");
});

export default router;
