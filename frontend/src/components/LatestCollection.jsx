import React from 'react' 
import ProductGrid from './ProductGrid'
const LatestCollection = () => {
  return (
    <div className='my-10'>
    <div className='text-center py-8 text-3xl'>
      <div className='inline-flex gap-2 items-center mb-3'>
        <p className='text-gray-500'>LATEST    <span className='text-gray-700 font-medium'>COLLECTIONS</span></p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
      </div>
    </div>
    <ProductGrid/>
  </div>
  )
}

export default LatestCollection