import React, { useEffect } from "react";
import useOrderStore from "../store/useOrderStore";

const OrderList = () => {
  const { orders, fetchOrders, loading } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) return <p>Loading...</p>;
  if (!orders || orders.length === 0) return <p>Bạn chưa có đơn hàng nào.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách đơn hàng</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id} className="border p-3 mb-3 rounded">
            <p><strong>Mã đơn:</strong> {order._id}</p>
            <p><strong>Trạng thái:</strong> {order.status}</p>
            <p><strong>Tổng tiền:</strong> {order.totalAmount} VND</p>
            <p><strong>Phương thức:</strong> {order.payment.method}</p>
            <ul className="ml-4 mt-2">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.product.name} x {item.quantity} ({item.size || "size mặc định"})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
