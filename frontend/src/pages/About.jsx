import React from 'react'

import aboutImg from '../../public/images/about_img.png'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <p className='text-gray-500'>ABOUT <span class="text-gray-700 font-medium">US</span></p>
          <p class="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img  className='w-full md:max-w-[450px]' src={aboutImg} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Forever was born out of a passion for innovation and a desire to revolutionize
           the way people shop online. Our journey began with a simple idea: to provide a platform where 
           customers can easily discover, explore,
           and purchase a wide range of products from the comfort of their homes.</p>
        <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality 
          products that cater to every taste and preference. From fashion and beauty to electronics and 
          home essentials, 
          we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <b class="text-gray-800">Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice, convenience, 
            and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations,
             from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <p className='text-gray-500'>WHY</p>
          <span class="text-gray-700 font-medium">CHOOSE US</span>
          <p class="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
         <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
         <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>


        </div>
      </div>
    </div>
  )
}

export default About