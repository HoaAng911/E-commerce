import React from 'react'
import HeroBanner from '../assets/frontend_assets/hero_img.png'

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 ">
      {/* Left Section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center">
        <div className="flex flex-col px-6 sm:px-12 text-[#414141] max-w-md">
          {/* OUR BESTSELLERS */}
          <div className="flex items-center gap-2 ">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>

          {/* Title */}
          <h1 className="font-prata text-3xl  lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>

          {/* SHOP NOW */}
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <img
        className="w-full sm:w-1/2 object-cover"
        src={HeroBanner}
        alt="Hero Banner"
      />
    </div>
  )
}

export default Hero
