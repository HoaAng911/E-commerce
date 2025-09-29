import React, { useEffect, useState } from "react";
import useUserCartStore from "../store/useCartStore";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cart, fetchCart, removeFromCart, updateQuantity } = useUserCartStore();
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Đồng bộ localCart với store.cart
  useEffect(() => {
    setLocalCart(cart.map(item => ({ ...item })));
  }, [cart]);

  const handleQuantityChange = (index, value) => {
    const newCart = [...localCart];
    newCart[index].quantity = value;
    setLocalCart(newCart);
  };

  const handleQuantityBlur = (item, index) => {
    const quantity = Math.max(1, localCart[index].quantity);
    updateQuantity(item.productId._id, item.size || "", quantity);
  };

  // Tính subtotal
  const subtotal = localCart.reduce(
    (acc, item) => acc + item.quantity * (item.productId?.price || 0),
    0
  );
  const shippingFee = 5;
  const total = subtotal + shippingFee;

  return (
    <div className="border-t pt-14 border-gray-300 font-outfit">
      <div className="text-2xl mb-3">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            YOUR <span className="text-gray-700 font-medium">CART</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div>
        {localCart.length > 0 ? (
          localCart.map((item, index) => (
            <div
              key={item.productId._id + "-" + item.size}
              className="py-4 border-t border-gray-300 border-b text-gray-700 flex  items-center gap-6"
            >
              {/* Ảnh */}
              <img
                src={
                  item.productId?.images?.[0] ||
                  item.productId?.image?.[0] ||
                  "/placeholder.png"
                }
                alt={item.productId?.name}
                className="w-16 sm:w-20"
              />

              {/* Tên + Giá */}
              <div className="flex-1">
                <p className="text-sm sm:text-lg font-medium">{item.productId?.name}</p>
                <div className="flex items-center gap-5 mt-2"> 

                  <p className="text-sm text-gray-600">${item.productId?.price}</p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 border-gray-300">{item.size}</p>
                  </div>
               
              </div>

              {/* Quantity + Delete */}
            
              <div className="flex mr-30 items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                    onBlur={() => handleQuantityBlur(item, index)}
                    className="border w-16 px-2 py-1 text-center border-gray-300"
                  />

                  <button
                    onClick={() => removeFromCart(item.productId._id, item.size || "")}
                    className="text-red-500 text-sm hover:underline ml-70"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            
          ))
        ) : (
          <p className="text-gray-500">Giỏ hàng trống</p>
        )}
      </div>

      {/* Tổng cộng */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <div className="text-2xl">
            <div className="inline-flex gap-2 items-center mb-3">
              <p className="text-gray-500">
                CART <span className="text-gray-700 font-medium">TOTALS</span>
              </p>
              <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
            </div>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Shipping Fee</span>
            <span>${shippingFee}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <Link to="/checkout"><div className=" w-full text-end">
            <button className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
          </div></Link>
         
        </div>
      </div>
    </div>
  );
};

export default Cart;
