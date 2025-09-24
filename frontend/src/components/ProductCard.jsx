import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${product._id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={product.image[0]} alt="" loading='lazy'/>
        <p className='pt-3 pb-1 text-sm'>{product.name}</p>
        <p className='text-sm font-medium'>${product.price}</p>
        </div>
   </Link>
  )
}

export default ProductCard