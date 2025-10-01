import { useEffect } from "react";
import useOrderStore from "../store/useOrderStore";

const MyOrders = () => {
  const { orders, loading, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (orders) {
      console.log("Orders data:", orders);
    }
  }, [orders]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Đang tải đơn hàng...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Bạn chưa có đơn hàng nào</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Đơn hàng của tôi</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 shadow-sm p-6 bg-white hover:shadow-lg transition"
          >
            {/* Header đơn hàng */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
              <div>
                <p className="font-semibold text-gray-700">
                  Mã đơn: <span className="text-blue-600">{order._id}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Ngày đặt: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-lg font-medium ${
                  order.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {order.status || "Chờ xử lý"}
              </span>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between  hover:bg-gray-50 transition"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.image[0] || "https://via.placeholder.com/60"}
                      alt={item.productName || "Sản phẩm"}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border border-gray-300"
                    />
                    <div>
                      <p className="font-medium text-gray-800 text-sm sm:text-base">
                        {item.productName || "Sản phẩm"}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Size: {item.size || "Không"} | SL: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {item.price?.toLocaleString()}₫
                  </p>
                </div>
              ))}
            </div>

            {/* Tổng tiền */}
            <div className="text-right border-t border-gray-200 mt-4 pt-4">
              <p className="font-bold text-lg text-gray-800">
                Tổng:{" "}
                {order.items
                  ?.reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toLocaleString()}₫
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
