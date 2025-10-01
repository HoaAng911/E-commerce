import express from "express";
import OrderController from "../controllers/Order.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // giả sử bạn có middleware auth

const router = express.Router();
//
router.post("/single",authMiddleware,OrderController.createOrderSingle)
// Tạo order từ giỏ hàng (cần login)
router.post("/create", authMiddleware, OrderController.createOrderFromCart);

// Lấy danh sách order của user (cần login)
router.get("/my-orders", authMiddleware, OrderController.getMyOrders);

// IPN callback từ MoMo (không cần login, MoMo gọi trực tiếp)
router.post("/momo/ipn", OrderController.momoIpnHandler);

export default router;
