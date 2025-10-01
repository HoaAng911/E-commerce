// store/useCartStore.js
import { create } from "zustand";
import axios from "axios";
import useUserStore from "./useUserStore"; // store user riêng

const useCartStore = create((set) => ({
  cart: [],
  setCart: (items) => set({ cart: items }),

  fetchCart: async () => {
    const { token } = useUserStore.getState();
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ cart: res.data.items });
    } catch (err) {
      console.error("Fetch cart failed:", err.response?.data || err.message);
    }
  },
  addToCart: async (productId, quantity = 1, size = "") => {
    const { token } = useUserStore.getState();
    if (!token) return alert("Bạn cần đăng nhập trước khi thêm giỏ hàng!");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity, size },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ cart: res.data.items });
    } catch (err) {
      console.error("Add to cart failed:", err.response?.data || err.message);
    }
  },

  updateQuantity: async (productId, size, quantity) => {
    const { token } = useUserStore.getState();
    if (!token) return;
    try {
      const res = await axios.put(
        "http://localhost:5000/api/cart/update",
        { productId, size: size || "", quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ cart: res.data.items });
    } catch (err) {
      console.error("Update quantity failed:", err.response?.data || err.message);
    }
  },

  removeFromCart: async (productId, size) => {
    const { token } = useUserStore.getState();
    if (!token) return;
    try {
      const res = await axios.delete("http://localhost:5000/api/cart/remove", {
        data: { productId, size: size || "" },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ cart: res.data.items });
    } catch (err) {
      console.error("Remove from cart failed:", err.response?.data || err.message);
    }
  },
  clearCart: async () => {
  const { token } = useUserStore.getState();
  if (!token) return;

  try {
    const res = await axios.delete("http://localhost:5000/api/cart/clear", {
      headers: { Authorization: `Bearer ${token}` },
    });
    set({ cart: [] }); // clear luôn local state
    console.log(res.data.message); // "Đã xóa toàn bộ giỏ hàng"
  } catch (err) {
    console.error("Clear cart failed:", err.response?.data || err.message);
  }
},

}));

export default useCartStore;
