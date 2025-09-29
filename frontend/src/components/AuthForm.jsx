import React, { useState } from "react";
import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const { login, register, user } = useUserStore();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (isLogin) {
        // --- LOGIN ---
        const success = await login(formData.email, formData.password);
        if (success) {
          setMessage("Đăng nhập thành công!");
          navigate("/"); // 👉 redirect Home
        } else {
          setMessage("Đăng nhập thất bại!");
        }
      } else {
        // --- REGISTER ---
        const success = await register(formData.username, formData.email, formData.password);
        if (success) {
          setMessage("Đăng ký thành công, hãy đăng nhập!");
          setIsLogin(true); // 👉 chuyển sang form login
          setFormData({ username: "", email: "", password: "" }); // clear form
        } else {
          setMessage("Đăng ký thất bại!");
        }
      }
    } catch (err) {
      setMessage("Có lỗi xảy ra, thử lại!");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 text-center font-outfit">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? "Đăng nhập" : "Đăng ký"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-800"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-800"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-800"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Đang xử lý..." : isLogin ? "Đăng nhập" : "Đăng ký"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
        <span
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          {isLogin ? "Đăng ký" : "Đăng nhập"}
        </span>
      </p>

      {message && <p className="mt-2 text-center text-green-600">{message}</p>}
      {user && isLogin && (
        <p className="mt-2 text-center text-gray-700">
          Chào, {user.username || user.email}!
        </p>
      )}
    </div>
  );
};

export default AuthForm;
