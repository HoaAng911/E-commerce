// Navbar.jsx
import { Link, useLocation } from "react-router-dom";

import useUserStore from "../store/useUserStore";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const menus = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  const location = useLocation();
  const active = menus.find(menu => menu.path === location.pathname)?.name || "HOME";

  const { user } = useUserStore();

  return (
    <nav className="flex items-center justify-between py-5 font-medium">
      <Link to="/"><img src="/images/logo.png" className="w-36" /></Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {menus.map(menu => (
          <li key={menu.name} className="relative">
            <Link
              to={menu.path}
              className={`flex flex-col items-center gap-1 cursor-pointer text-gray-700 hover:text-black ${active === menu.name ? "font-semibold" : ""}`}
            >
              {menu.name}
              {active === menu.name && (
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[2px] w-1/2 bg-black rounded transition-all duration-300"></span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <img src="/images/search_icon.png" className="w-5 cursor-pointer" alt="search" />

        {/* User Menu */}
        {!user ? (
          <Link to="/login">
            <img className="w-5 cursor-pointer" src="/images/profile_icon.png" alt="Login" />
          </Link>
        ) : (
          
          <div> 
    <UserMenu />
  </div>
        )}

        <Link to="/cart" className="relative">
          <img src="/images/cart_icon.png" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">0</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
