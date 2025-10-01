import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useOrderStore from "../store/useOrderStore";
import useCartStore from "../store/useCartStore";

const CheckoutForm = () => {
  const location = useLocation();
  const { product } = location.state || {}; // Nếu checkout 1 sản phẩm
  const { cart, fetchCart ,clearCart} = useCartStore();
  const { createOrder, loading } = useOrderStore();

  // Nếu có product → checkout 1 sp, ngược lại lấy cart
  const items = product ? [product] : cart;

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("momo");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!items || items.length === 0) {
      alert("Không có sản phẩm để đặt hàng!");
      return;
    }

    if (!address || !phone) {
      alert("Vui lòng nhập địa chỉ và số điện thoại");
      return;
    }

    let result;
    if (product) {
      // 👉 Nếu mua ngay 1 sản phẩm
      result = await createOrder({
        productId: product.productId?._id || product.productId, // ID sản phẩm
        quantity: product.quantity,
        size: product.size,
        address,
        phone,
        paymentMethod,
      });
    } else {
      // 👉 Nếu checkout cả giỏ hàng
      result = await createOrder({
        address,
        phone,
        paymentMethod,
      });
    }

    if (paymentMethod === "cod" && result) {
      alert("Đặt hàng thành công!");
      if (!product) fetchCart(); // clear giỏ hàng nếu checkout giỏ
    }
     if (paymentMethod === "momo" && result?.payUrl) {
      if (!product) clearCart(); // ✅ clear tạm UI giỏ hàng ngay (chỉ khi checkout giỏ hàng)
      window.location.href = result.payUrl; // chuyển hướng sang cổng MoMo
    }
  };

  // Tính tổng tiền
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * (item.productId?.price || 0),
    0
  );
  const shippingFee = 5;
  const total = subtotal + shippingFee;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Thanh toán đơn hàng
      </h2>

      {/* Hiển thị danh sách sản phẩm được đặt */}
      <div className="mb-6 border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-medium mb-3">Sản phẩm của bạn:</h3>
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-2 border-b text-sm">
            <div>
              <p className="font-medium">{item.productId?.name}</p>
              {item.size && <p className="text-gray-500">Size: {item.size}</p>}
              <p className="text-gray-600">SL: {item.quantity}</p>
            </div>
            <p className="font-semibold">${item.productId?.price}</p>
          </div>
        ))}

        {/* Tổng tiền */}
        <div className="mt-3 text-sm">
          <div className="flex justify-between">
            <span>Tạm tính:</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Phí ship:</span>
            <span>${shippingFee}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Tổng cộng:</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      {/* Form nhập thông tin */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Địa chỉ</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Nhập địa chỉ nhận hàng"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Số điện thoại</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nhập số điện thoại"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Phương thức thanh toán</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="momo">MoMo</option>
            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Đang xử lý..." : "Đặt hàng"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
