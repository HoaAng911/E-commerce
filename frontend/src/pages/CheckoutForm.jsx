import React, { useState } from "react";
import useOrderStore from "../store/useOrderStore";
import useCartStore from "../store/useCartStore";

const CheckoutForm = () => {
  const { cart, fetchCart } = useCartStore();
  const { createOrder, loading } = useOrderStore();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("momo");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    if (!address || !phone) {
      alert("Vui lòng nhập địa chỉ và số điện thoại");
      return;
    }

    const result = await createOrder({ address, phone, paymentMethod });

    if (paymentMethod === "cod" && result?.order) {
      alert("Đặt hàng thành công!");
      fetchCart(); // reset cart
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <div className="mb-3">
        <label className="block mb-1">Địa chỉ:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Số điện thoại:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Phương thức thanh toán:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="momo">MoMo</option>
          <option value="cod">Thanh toán khi nhận hàng (COD)</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Đang xử lý..." : "Đặt hàng"}
      </button>
    </form>
  );
};

export default CheckoutForm;
