import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import useUserCartStore from "./useCartStore";
const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setUser: (user, token) => {
      
        set({ user, token });
      },

      logout: () => {
       
        localStorage.removeItem("token");
        set({ user: null, token: null });
        useUserCartStore.getState().clearCart();
      },

      login: async (email, password) => {
        console.log("[login] Attempt login with email:", email);
        try {
          const res = await axios.post("http://localhost:5000/api/user/login", { email, password });
          const { token, user } = res.data;
        

          if (!token || !user) {
            
            return false;
          }

          localStorage.setItem("token", token);
          set({ token, user });  console.log("[login] User set in store:", user);

          const profile = await get().getProfile(token);
          useUserCartStore.getState().fetchCart()
          return !!profile;
        } catch (err) {
          console.error("[login] Failed:", err.response?.data || err.message);
          return false;
        }
      },

      register: async (username, email, password) => {
        console.log("[register] Attempt register with:", { username, email });
        try {
          await axios.post("http://localhost:5000/api/user/register", { username, email, password });
        
          return await get().login(email, password);
        } catch (err) {
          console.error("[register] Failed:", err.response?.data || err.message);
          return false;
        }
      },

 getProfile: async (tokenParam) => {
  const token = tokenParam || get().token || localStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await axios.get("http://localhost:5000/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("[getProfile] response data:", res.data);

    set({ user: res.data });
    return res.data;
  } catch (err) {
    console.error("[getProfile] Failed:", err.response?.data || err.message);
    return null;
  }
},

    }),
    { name: "user-store" }
  )
);

export default useUserStore;
