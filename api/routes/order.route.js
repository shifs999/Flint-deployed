import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/create-payment-intent/:id", intent);
router.put("/", confirm);

export default router;
