import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from'axios'
import ProductCard from './ProductCard'
const ProductGrid = ({products:propsProducts}) => {
  const [products,setProducts]=useState(propsProducts||[])
  const[loading,setLoading]=useState(!propsProducts)

  useEffect(()=>{
      if (propsProducts) {
      setProducts(propsProducts)
      setLoading(false)
      return
    }
    const fetchProduct =async ()=>{
      
      try {
        const res = await axios.get("http://localhost:5000/api/product")
        setProducts(res.data)
        
      } catch (error) {
         console.error("Lỗi khi fetch sản phẩm:", error);
      }finally{
          setLoading(false)
         
      }
    }
    fetchProduct()
  
  },[propsProducts])

  if(loading){
      return <p className="text-center">Đang tải sản phẩm...</p>;
  }
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}

    </div>
  )
}

export default ProductGrid