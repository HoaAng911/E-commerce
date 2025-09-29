import { create } from "zustand";
import axios from "axios";
import useUserStore from "./useUserStore";

const useAddressStore = create((set) => ({
  addresses: [],
  loading: false,
  error: null,

  // Lấy tất cả địa chỉ
  fetchAddresses: async () => {
    const { token } = useUserStore.getState();
    if (!token) return;

    set({ loading: true, error: null });
    try {
      const res = await axios.get("http://localhost:5000/api/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ addresses: res.data.addresses, loading: false });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.error || err.message });
    }
  },

  // Lấy địa chỉ theo id
  fetchAddressById: async (id) => {
    const { token } = useUserStore.getState();
    if (!token) return null;

    try {
      const res = await axios.get(`http://localhost:5000/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; // trả về để component dùng
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // Thêm địa chỉ mới
  addAddress: async (data) => {
    const { token } = useUserStore.getState();
    if (!token) return;

    try {
      const res = await axios.post("http://localhost:5000/api/addresses", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({ addresses: [...state.addresses, res.data] }));
    } catch (err) {
      console.error(err);
    }
  },

  // Cập nhật địa chỉ
  updateAddress: async (id, data) => {
    const { token } = useUserStore.getState();
    if (!token) return;

    try {
      const res = await axios.put(`http://localhost:5000/api/addresses/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        addresses: state.addresses.map((addr) =>
          addr._id === id ? res.data : addr
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  },

  // Xoá địa chỉ
  deleteAddress: async (id) => {
    const { token } = useUserStore.getState();
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5000/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        addresses: state.addresses.filter((addr) => addr._id !== id),
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useAddressStore;
