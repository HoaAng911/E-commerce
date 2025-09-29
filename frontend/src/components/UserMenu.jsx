// UserMenu.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import useUserStore from "../store/useUserStore";

const UserMenu = () => {
  const { user, getProfile, logout } = useUserStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const loadUser = async () => {

      const token = localStorage.getItem("token");
     

      if (token && !user) {
      
        const profile = await getProfile();
        console.log("Profile fetched:", profile);
      }
      setLoading(false);
    };
    loadUser();
  }, [user, getProfile]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), 500); // delay 500ms trước khi mở
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(false), 300); // delay 300ms trước khi đóng
  };

  if (loading) return <div>Loading user...</div>;

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-2">
        <User className="w-6 h-6" />
        <span>{user.username}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200">
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
              <Link to="/"> 
              <button 
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                
                Đăng xuất
              </button></Link>
             
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
