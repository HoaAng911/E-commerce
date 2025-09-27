import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react"; 
import useUserCartStore from "../store/useCartStore";

const UserMenu = () => {
  const { user } = useUserCartStore();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <Link to="/login" className="flex items-center gap-2 hover:text-blue-500">
        <User /> Đăng nhập
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Icon user */}
      <button className="flex items-center gap-2">
        <User className="w-6 h-6" />
        <span>{user.username}</span>
      </button>

      {/* Dropdown box */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg">
          <ul className="py-2 text-gray-700">
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Thông tin cá nhân
              </Link>
            </li>
            <li>
              <button
                onClick={() => alert("Xử lý logout ở đây")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
