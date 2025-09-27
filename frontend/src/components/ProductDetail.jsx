import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Rating from './Rating'
import ProductGrid from './ProductGrid'
import useUserCartStore from '../store/useCartStore'
const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")
  const {addToCart} = useUserCartStore()
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product/${id}`)
        const relatedRes = await axios.get("http://localhost:5000/api/product/best-sellers")

        setProduct(res.data)
        setRelatedProducts(
          relatedRes.data.filter(p => p._id !== id).slice(0, 5)
        )
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProductDetail()
  }, [id])

  if (loading) return <p>Đang tải chi tiết sản phẩm...</p>
  if (!product) return <p>Không tìm thấy sản phẩm</p>

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* MAIN CONTENT */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* LEFT: Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            <img
              className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              src={product.image[0]}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={product.image[0]} alt="" loading="lazy" />
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <Rating rating={product.rating || 0} totalReviews={product.totalReviews || 0} />
          </div>
          <p className="mt-5 text-3xl font-medium">${product.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>

          {/* SIZE SELECT */}
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium">Chọn Size</p>
            <div className="flex gap-2">
              {product.sizes && product.sizes.length > 0 ? (
                product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 bg-gray-100 border 
                      ${selectedSize === size ? "border-orange-500" : "border-gray-300"} 
                      hover:border-orange-500`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">Không có size nào</p>
              )}
            </div>
          </div>

          {/* ADD TO CART */}
          <button
              onClick={async () => {
              if (!selectedSize && product.sizes?.length > 0) {
                alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!")
                return
              }
              await addToCart(product._id, 1,selectedSize)  // 👈 gọi API store
              alert("Đã thêm sản phẩm vào giỏ hàng!")
            }}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"

          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% sản phẩm chính hãng.</p>
            <p>Hỗ trợ thanh toán khi nhận hàng.</p>
            <p>Đổi trả dễ dàng trong 7 ngày.</p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION & REVIEWS */}
      <div className="mt-20">
        <div className="flex">
          <b className="border-[0.5px] border-gray-200 px-5 py-3 text-sm">Mô tả</b>
          <p className="border-[0.5px] border-gray-200 px-5 py-3 text-sm">
            Đánh giá ({product.totalReviews || 0})
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 border-gray-200">
          <p>{product.description}</p>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="my-24">
        <div className="text-center text-3xl py-2">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">
              <span className="text-gray-700 font-medium">SẢN PHẨM LIÊN QUAN</span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div>
        <ProductGrid products={relatedProducts} />
      </div>
    </div>
  )
}

export default ProductDetail
