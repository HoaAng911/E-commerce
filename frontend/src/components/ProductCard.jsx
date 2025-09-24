import React from 'react'

const ProductCard = ({product}) => {
  return (
    <a className='text-gray-700 cursor-pointer' href='/'>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={product.image[0]} alt="" loading='lazy'/>
        <p className='pt-3 pb-1 text-sm'>{product.name}</p>
        <p className='text-sm font-medium'>${product.price}</p>
        </div>
    </a>
  )
}

export default ProductCard