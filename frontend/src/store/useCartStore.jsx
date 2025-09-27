import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

const useUserCartStore = create(
  persist(
    (set, get) => ({
      // --- User ---
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      },

      // --- Cart ---
      cart: [],
      setCart: (items) => set({ cart: items }),

      // --- Actions ---
      register: async (username, email, password) => {
        try {
          await axios.post('http://localhost:5000/api/user/register', { username, email, password });

          // Auto login sau khi register
          const loginRes = await axios.post('http://localhost:5000/api/user/login', { email, password });
          const { token, user } = loginRes.data;
          set({ token, user });
          return true;
        } catch (err) {
          console.error('Register failed:', err.response?.data || err.message);
          return false;
        }
      },

      login: async (email, password) => {
        try {
          const res = await axios.post('http://localhost:5000/api/user/login', { email, password });
          const { token, user } = res.data;
          if (!token || !user) {
            console.error('Login failed: token or user missing in response');
            return false;
          }
          set({ token, user });
          return true;
        } catch (err) {
          console.error('Login failed:', err.response?.data || err.message);
          return false;
        }
      },

     
       fetchCart: async () => {
        try {
          const token = get().token;
          if (!token) return;
          const res = await axios.get('http://localhost:5000/api/cart', {
            headers: { Authorization: `Bearer ${token}` }
          });
          set({ cart: res.data.items });
        } catch (err) {
          console.error("Fetch cart failed:", err.response?.data || err.message);
        }
      },

      addToCart: async (productId, quantity = 1, size = "") => {
        try {
          const token = get().token;
          if (!token) return;

          const res = await axios.post(
            'http://localhost:5000/api/cart/add',
            { productId, quantity, size },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const items = res.data.items.map(item => ({
            ...item,
            productId: { ...item.productId }
          }));
          set({ cart: items });
        } catch (err) {
          console.error('Add to cart failed:', err.response?.data || err.message);
        }
      },
  updateQuantity: async (productId, size, quantity) => {
        try {
          const token = get().token;
          if (!token) return;
          const res = await axios.put(
            "http://localhost:5000/api/cart/update",
            { productId, size: size || "", quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          set({ cart: res.data.items });
        } catch (error) {
          console.error("Cập nhật số lượng lỗi:", error.response?.data || error.message);
        }
      },

      removeFromCart: async (productId, size) => {
        try {
          const token = get().token;
          if (!token) return;
          const res = await axios.delete(
            "http://localhost:5000/api/cart/remove",
            { data: { productId, size: size || "" }, headers: { Authorization: `Bearer ${token}` } }
          );
          set({ cart: res.data.items });
        } catch (error) {
          console.error("Xóa sản phẩm lỗi:", error.response?.data || error.message);
        }
      },
     
     
      getProfile: async () => {
        try {
          const token = get().token || localStorage.getItem("token");
          if (!token) return null;

          const res = await axios.get("http://localhost:5000/api/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });

          set({ user: res.data });
          return res.data;
        } catch (err) {
          console.error("Lỗi khi get profile:", err.response?.data || err.message);
          return null;
        }
      },
    }),
    {
      name: 'user-cart-store',
    }
  )
);

export default useUserCartStore;
