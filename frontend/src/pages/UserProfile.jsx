import React, { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import useAddressStore from "../store/useAddressStore";
import AddressForm from "../components/AddAdressForm";

const UserProfile = () => {
  const { user, getProfile, logout } = useUserStore();
  const { addresses, fetchAddresses, deleteAddress } = useAddressStore();

  const [loading, setLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await getProfile(); // lấy user
      if (user?._id) {
        await fetchAddresses(); // lấy danh sách địa chỉ của user
      }
      setLoading(false);
    };
    loadData();
  }, [getProfile, fetchAddresses, user?._id]);

  if (loading) return <div>Đang tải thông tin...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-sm max-w-md w-full text-center">
          <p className="text-gray-600 text-lg font-outfit">
            Bạn chưa đăng nhập.{" "}
            <a
              href="/login"
              className="text-blue-500 font-medium hover:text-blue-600 underline"
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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          Hồ sơ cá nhân
        </h1>

        {/* Thông tin cơ bản */}
        <div className="bg-white p-8 shadow-sm mb-8 hover:shadow-md">
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
        <div className="bg-white p-8 shadow-sm mb-8 hover:shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Địa chỉ</h2>
            <button
              className="text-blue-500 font-medium hover:text-blue-600"
              onClick={() => setShowAddressForm(!showAddressForm)}
            >
              {showAddressForm ? "Đóng" : "+ Thêm"}
            </button>
          </div>

          {/* Danh sách địa chỉ */}
          {addresses && addresses.length > 0 ? (
            <ul className="space-y-3">
              {addresses.map((addr) => (
                <li
                  key={addr._id}
                  className="p-4 border border-gray-200 flex justify-between items-start"
                >
                  <div>
                    <p className="font-semibold">
                      {addr.firstName} {addr.lastName}
                      {addr.isDefault && (
                        <span className="ml-2 text-xs text-green-600">
                          (Mặc định)
                        </span>
                      )}
                    </p>
                    <p>
                      {addr.street}, {addr.city}
                    </p>
                    <p>📞 {addr.phone}</p>
                  </div>

                  {/* Nút xoá */}
                  <button
                    onClick={async () => {
                      if (window.confirm("Bạn có chắc muốn xoá địa chỉ này?")) {
                        await deleteAddress(addr._id);
                        await fetchAddresses(); // load lại danh sách
                      }
                    }}
                    className="ml-4 text-red-500 hover:text-red-700 text-sm"
                  >
                    Xoá
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-900 font-medium">Chưa thêm địa chỉ nào</p>
          )}

          {/* Form thêm địa chỉ */}
          {showAddressForm && (
            <div className="mt-6">
              <AddressForm
                onSuccess={async () => {
                  setShowAddressForm(false);
                  await fetchAddresses();
                }}
              />
            </div>
          )}
        </div>

        {/* Số điện thoại */}
        <div className="bg-white p-8 shadow-sm mb-8 hover:shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Số điện thoại
            </h2>
            <button className="text-blue-500 font-medium hover:text-blue-600">
              + Thêm
            </button>
          </div>
          <p className="text-gray-900 font-medium">
            {user.phone || "Chưa thêm số điện thoại nào"}
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={logout}
            className="bg-red-500 text-white px-8 py-3 text-sm hover:bg-red-600"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
