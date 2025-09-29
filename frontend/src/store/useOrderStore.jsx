import { create } from "zustand";

const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,

  // Lấy danh sách order của user
  fetchOrders: async () => {
    set({ loading: true });
    try {
      const res = await fetch("http://localhost:5000/api/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      set({ orders: data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  // Tạo order từ cart
  createOrder: async ({ address, phone, paymentMethod }) => {
    set({ loading: true });
    try {
      const res = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ address, phone, paymentMethod }),
      });
      const data = await res.json();
      set({ loading: false });

      if (!res.ok) {
        console.error("Create order failed:", data);
        return null;
      }

      // Nếu MoMo → redirect
      if (data.payUrl) {
        window.location.href = data.payUrl;
      } else {
        // COD → thêm order vào store
        set((state) => ({ orders: [data.order, ...state.orders] }));
      }

      return data;
    } catch (err) {
      console.error(err);
      set({ loading: false });
      return null;
    }
  },
}));

export default useOrderStore;
