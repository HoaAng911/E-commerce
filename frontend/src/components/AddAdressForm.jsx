import React, { useState } from "react";
import axios from "axios";
import useUserStore from "../store/useUserStore";

const AddressForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
  });

  const { token } = useUserStore();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/addresses",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Thêm địa chỉ thành công ✅");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Lỗi khi thêm địa chỉ:", err);
      alert("Thêm địa chỉ thất bại ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-50 p-4 rounded border"
    >
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="Tên"
          value={form.firstName}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Họ"
          value={form.lastName}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="p-2 border rounded w-full"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Số điện thoại"
        value={form.phone}
        onChange={handleChange}
        className="p-2 border rounded w-full"
        required
      />

      <input
        type="text"
        name="street"
        placeholder="Địa chỉ (đường, số nhà...)"
        value={form.street}
        onChange={handleChange}
        className="p-2 border rounded w-full"
        required
      />

      <input
        type="text"
        name="city"
        placeholder="Thành phố"
        value={form.city}
        onChange={handleChange}
        className="p-2 border rounded w-full"
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Lưu địa chỉ
      </button>
    </form>
  );
};

export default AddressForm;
