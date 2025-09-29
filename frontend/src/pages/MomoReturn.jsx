import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MomoReturn = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Đang xử lý...");

  useEffect(() => {
    const resultCode = searchParams.get("resultCode");
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      setStatus("Không nhận được thông tin đơn hàng");
      return;
    }

    if (resultCode === "0") {
      setStatus("Thanh toán thành công!");
    } else {
      setStatus("Thanh toán thất bại!");
    }
  }, [searchParams]);

  // Màu sắc theo trạng thái
  const statusColor =
    status === "Thanh toán thành công!"
      ? "text-green-600"
      : status === "Thanh toán thất bại!"
      ? "text-red-600"
      : "text-gray-600";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Kết quả thanh toán MoMo
        </h2>
        <p className={`text-lg font-medium ${statusColor} mb-6`}>{status}</p>
        <div className="flex justify-center">
          {status === "Thanh toán thành công!" ? (
            <svg
              className="w-16 h-16 text-green-500 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : status === "Thanh toán thất bại!" ? (
            <svg
              className="w-16 h-16 text-red-500 animate-shake"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-16 h-16 text-gray-400 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx={12}
                cy={12}
                r={10}
                strokeWidth={4}
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default MomoReturn;
