import express from "express";

// controllers
import { passAuth } from "../controllers/userControllers";

// middlewares
import checkAuth from "../middleware/checkAuth";

const router = express();

router.get("/checkAuth", passAuth);

export default router;
