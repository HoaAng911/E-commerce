import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";
import axios from "axios";
import crypto from "crypto";

const momoConfig = {
  partnerCode: process.env.MOMO_PARTNER_CODE,
  accessKey: process.env.MOMO_ACCESS_KEY,
  secretKey: process.env.MOMO_SECRET_KEY,
  redirectUrl: process.env.MOMO_REDIRECT_URL,
  ipnUrl: process.env.MOMO_IPN_URL,
  requestType: "captureWallet"
};


const OrderController = {
  createOrderFromCart: async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: "User chưa login" });

      const { address, phone, paymentMethod } = req.body;
      if (!address || !phone)
        return res.status(400).json({ message: "Address và phone bắt buộc" });
        console.log("MoMo redirectUrl:", momoConfig.redirectUrl);
      // Lấy cart
      const cart = await Cart.findOne({ userId }).populate("items.productId");
      if (!cart || cart.items.length === 0)
        return res.status(400).json({ message: "Giỏ hàng trống" });

      // Map order items và tính tổng
      let total = 0;
      const orderItems = cart.items.map(item => {
        if (!item.productId) {
          console.log("Populate missing for productId:", item.productId);
        }
        total += item.quantity * item.productId.price;
        return {
          product: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price,
          size: item.size
        };
      });

      // Tạo order
      const order = new Order({
        userId,
        items: orderItems,
        totalAmount: total,
        shippingAddress: address,
        phone,
        payment: { method: paymentMethod.toLowerCase() || "cod" },
        status: "pending"
      });

      await order.save();

      // Xử lý thanh toán MoMo
      if (paymentMethod.toLowerCase() === "momo") {
        const requestId = order._id.toString() + Date.now();
        const orderInfo = `Thanh toan don hang #${order._id}`;
        const rawSignature = `accessKey=${momoConfig.accessKey}&amount=${total}&extraData=&ipnUrl=${momoConfig.ipnUrl}&orderId=${order._id}&orderInfo=${orderInfo}&partnerCode=${momoConfig.partnerCode}&redirectUrl=${momoConfig.redirectUrl}&requestId=${requestId}&requestType=${momoConfig.requestType}`;

        const signature = crypto
          .createHmac("sha256", momoConfig.secretKey)
          .update(rawSignature)
          .digest("hex");

        const requestBody = {
          partnerCode: momoConfig.partnerCode,
          accessKey: momoConfig.accessKey,
          requestId,
          amount: total,
          orderId: order._id,
          orderInfo,
          redirectUrl: momoConfig.redirectUrl,
          ipnUrl: momoConfig.ipnUrl,
          extraData: "",
          requestType: momoConfig.requestType,
          signature,
          lang: "vi"
        };

        const response = await axios.post(
          "https://test-payment.momo.vn/v2/gateway/api/create",
          requestBody
        );

        // Không xóa cart ở đây, chờ MoMo IPN xác nhận
        return res.status(201).json({ order, payUrl: response.data.payUrl });
      }

      // COD -> xóa cart ngay lập tức
      cart.items = [];
      await cart.save();

      res.status(201).json({ order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  getMyOrders: async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: "User chưa login" });

      const orders = await Order.find({ userId })
        .populate("items.product")
        .sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  momoIpnHandler: async (req, res) => {
    try {
      const { orderId, resultCode, transId } = req.body;
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });

      order.status = resultCode === 0 ? "paid" : "failed";
      if (resultCode === 0) order.payment.transactionId = transId;

      await order.save();

      // MoMo thanh toán thành công -> xóa cart
      if (resultCode === 0) {
        const cart = await Cart.findOne({ userId: order.userId });
        if (cart) {
          cart.items = [];
          await cart.save();
        }
      }

      res.json({ message: "IPN received", status: order.status });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi xử lý IPN từ MoMo" });
    }
  }
};

export default OrderController;
