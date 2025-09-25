import React, { useState } from 'react'
import Logo from '../../public/images/logo.png'
import SearchLogo from '../../public/images/search_icon.png'
import UserLogo from '../../public/images/profile_icon.png'
import CartLogo from '../../public/images/cart_icon.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const menus = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" }
  ];

  const [active, setActive] = useState(menus[0].name); 

  return (
    <nav className="flex items-center justify-between py-5 font-medium">
      <Link to='/'><img src={Logo} className='w-36' /></Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {menus.map((menu) => (
          <li key={menu.name} className='relative'>
            <Link
              to={menu.path}
              onClick={() => setActive(menu.name)}
              className="flex flex-col items-center gap-1 cursor-pointer text-gray-700 hover:text-black"
            >
              {menu.name} 
              {active === menu.name && (
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[2px] w-1/2 bg-black rounded transition-all duration-300"></span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className='flex items-center gap-6'>
        <img src={SearchLogo} className="w-5 cursor-pointer" alt=""/>
        <div className='group relative'>
          <img className="w-5 cursor-pointer" src={UserLogo} alt=""/>
        </div>
        <Link to='/cart' className='relative'>
          <img src={CartLogo} className='w-5 min-w-5'/>
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">0</p>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
