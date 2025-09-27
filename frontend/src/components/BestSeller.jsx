import React, { useState, useEffect } from 'react' 
import ProductGrid from './ProductGrid'
import axios from 'axios'

const BestSeller = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBestSeller = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product/best-sellers")
        setProducts(res.data)
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBestSeller()
  }, [])

  if (loading) {
    return <p className="text-center">Đang tải sản phẩm...</p>
  }

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            SẢN PHẨM <span className="text-gray-700 font-medium">BÁN CHẠY</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>
      <ProductGrid products={products} />
    </div>
  )
}

export default BestSeller
