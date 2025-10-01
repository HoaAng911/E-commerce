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

  // Tạo order từ giỏ hàng
  createOrderFromCart: async ({ address, phone, paymentMethod }) => {
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
        console.error("Create order (cart) failed:", data);
        return null;
      }

      // Chuẩn hóa order
      const normalizedOrder = {
        ...data.order,
        items: data.order.items.map((it) => ({
          _id: it._id,
          productId: it.productId,
          size: it.size,
          quantity: it.quantity,
          price: it.productId?.price || it.price || 0,
        })),
      };

      if (data.payUrl) {
        window.location.href = data.payUrl;
      } else {
        set((state) => ({ orders: [normalizedOrder, ...state.orders] }));
      }

      return normalizedOrder;
    } catch (err) {
      console.error(err);
      set({ loading: false });
      return null;
    }
  },

  // Tạo order từ 1 sản phẩm (mua ngay)
  createOrderSingle: async ({ productId, quantity, size, address, phone, paymentMethod }) => {
    set({ loading: true });
    try {
      const res = await fetch("http://localhost:5000/api/orders/single", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId, quantity, size, address, phone, paymentMethod }),
      });
      const data = await res.json();
      set({ loading: false });

      if (!res.ok) {
        console.error("Create order (single) failed:", data);
        return null;
      }

      // Chuẩn hóa order single
      const normalizedOrder = {
        ...data.order,
        items: [
          {
            _id: productId,
            productId: data.order.product || data.order.productId,
            size,
            quantity,
            price: data.order.product?.price || data.order.price || 0,
          },
        ],
      };

      if (data.payUrl) {
        window.location.href = data.payUrl;
      } else {
        set((state) => ({ orders: [normalizedOrder, ...state.orders] }));
      }

      return normalizedOrder;
    } catch (err) {
      console.error(err);
      set({ loading: false });
      return null;
    }
  },

  // ✅ Wrapper: tự động chọn đúng API
  createOrder: async ({ productId, quantity, size, address, phone, paymentMethod }) => {
    if (productId) {
      // Nếu có productId → mua ngay 1 sản phẩm
      return await get().createOrderSingle({ productId, quantity, size, address, phone, paymentMethod });
    } else {
      // Không có productId → checkout cả giỏ
      return await get().createOrderFromCart({ address, phone, paymentMethod });
    }
  },
}));

export default useOrderStore;
