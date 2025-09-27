import React from "react";
import useUserCartStore from "../store/useCartStore";

const UserProfile = () => {
  const { user, logout } = useUserCartStore();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-sm max-w-md w-full text-center">
          <p className="text-gray-600 text-lg font-outfit">
            Bạn chưa đăng nhập.{" "}
            <a
              href="/login"
              className="text-blue-500 font-medium hover:text-blue-600 transition underline font-outfit"
            >
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-outfit">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
          .font-outfit {
            font-family: 'Outfit', sans-serif;
          }
        `}
      </style>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center tracking-tight">
          Hồ sơ cá nhân
        </h1>

        {/* Thông tin cơ bản */}
        <div className="bg-white p-8  shadow-sm mb-8 transition-all duration-300 hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Thông tin cơ bản
          </h2>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Tên</span>
              <span className="text-gray-900 font-medium">{user.username}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Email</span>
              <span className="text-gray-900 font-medium">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Địa chỉ */}
        <div className="bg-white p-8 shadow-sm mb-8 transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Địa chỉ</h2>
            <button className="text-blue-500 font-medium hover:text-blue-600 transition">
              + Thêm
            </button>
          </div>
          {user.address ? (
            <p className="text-gray-900 font-medium">{user.address}</p>
          ) : (
            <div className="p-4 bg-gray-100 rounded-xl text-gray-500 flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Chưa thêm địa chỉ nào</span>
            </div>
          )}
        </div>

        {/* Số điện thoại */}
        <div className="bg-white p-8 shadow-sm mb-8 transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Số điện thoại</h2>
            <button className="text-blue-500 font-medium hover:text-blue-600 transition">
              + Thêm
            </button>
          </div>
          {user.phone ? (
            <p className="text-gray-900 font-medium">{user.phone}</p>
          ) : (
            <div className="p-4 bg-gray-100 rounded-xl text-gray-500 flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Chưa thêm số điện thoại nào</span>
            </div>
          )}
        </div>

      {/* Đăng xuất */}
<div className="flex justify-center mt-6">
  <button
    onClick={logout}
    className="bg-red-500 text-white px-8 py-3 text-sm  hover:bg-red-600 active:bg-gray-700 transition"
  >
    Đăng xuất
  </button>
</div>
      </div>
      
    </div>
  );
};

export default UserProfile;