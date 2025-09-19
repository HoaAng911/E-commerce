import React, { useState } from 'react'
import Logo from '../../public/images/logo.png'
import SearchLogo from '../../public/images/search_icon.png'
import UserLogo from '../../public/images/profile_icon.png'
import CartLogo from '../../public/images/cart_icon.png'
const Navbar = () => {
  const menus = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
  const [active,setActive]=useState(menus[0])
    
  return (
    <nav className="flex items-center justify-between py-5 font-medium">
      <a href='/'><img src={Logo} className='w-36' /></a>
       <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {menus.map((menu) => (
          <li key={menu} className='relative'>
            <a
              onClick={() => setActive(menu)}
                 className="flex flex-col items-center gap-1 cursor-pointer text-gray-700 hover:text-black"
            
            >
              {menu}
              {active === menu && (
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[2px] w-1/2 bg-black rounded transition-all duration-300"></span>
              )}
            </a>
          </li>
        ))}
      </ul>
      <div className='flex items-center gap-6'>
        <img src={SearchLogo} className="w-5 cursor-pointer" alt=""/>
        <div className='group relative'>
        <img className="w-5 cursor-pointer" src={UserLogo} alt=""/>
       
      </div>
       <a href='/cart' className='relative'>
        <img src={CartLogo} className='w-5 min-w-5'/>
        <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">0</p>
        
        </a>
      </div>
      
    </nav>
  )
}

export default Navbar