import express from "express";
import AddressController from "../controllers/Address.controller.js";
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router();



router.post("/", authMiddleware, AddressController.createAddress);
router.get("/", authMiddleware, AddressController.getAddresses);
router.get("/:id", authMiddleware, AddressController.getAddressById);
router.put("/:id", authMiddleware, AddressController.updateAddress);
router.delete("/:id", authMiddleware, AddressController.deleteAddress);

export default router;
