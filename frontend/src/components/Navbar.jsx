import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import useUserCartStore from "../store/useCartStore";

const Navbar = () => {
  const menus = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  const location = useLocation();
  const active =
    menus.find((menu) => menu.path === location.pathname)?.name || "HOME";

  const { user, logout } = useUserCartStore();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 300); // 300ms delay
  };

  return (
    <nav className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to="/">
        <img src="/images/logo.png" className="w-36" />
      </Link>

      {/* Menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {menus.map((menu) => (
          <li key={menu.name} className="relative">
            <Link
              to={menu.path}
              className={`flex flex-col items-center gap-1 cursor-pointer text-gray-700 hover:text-black ${
                active === menu.name ? "font-semibold" : ""
              }`}
            >
              {menu.name}
              {active === menu.name && (
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[2px] w-1/2 bg-black rounded transition-all duration-300"></span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          src="/images/search_icon.png"
          className="w-5 cursor-pointer"
          alt=""
        />

        {/* User */}
        {!user ? (
          <Link to="/login">
            <img
              className="w-5 cursor-pointer"
              src="/images/profile_icon.png"
              alt="Login"
            />
          </Link>
        ) : (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="w-5 cursor-pointer"
              src="/images/profile_icon.png"
              alt="User"
            />
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
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src="/images/cart_icon.png" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            0
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
