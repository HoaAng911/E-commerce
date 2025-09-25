import React, { useState, useEffect } from 'react'
import Filter from '../../public/images/dropdown_icon.png'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import qs from 'qs';
const Collection = () => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSubCategories, setSelectedSubCategories] = useState([])
  const [sort, setSort] = useState('')
  const [products, setProducts] = useState([])

  // handle chọn category
  const handleCategoryChange = (e) => {
    const value = e.target.value
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    )
  }

  // handle chọn subCategory
  const handleSubCategoryChange = (e) => {
    const value = e.target.value
    setSelectedSubCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    )
  }

  // gọi API khi filter/sort thay đổi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/product/filter', {
          params: {
            category: selectedCategories,
            subCategory: selectedSubCategories,
            sort,
          },
            paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
        })
        setProducts(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchProducts()
  }, [selectedCategories, selectedSubCategories, sort])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Left - Filter */}
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className='h-3 sm:hidden ' src={Filter} alt='' />
        </p>

        {/* CATEGORY */}
        <div className='border border-gray-300 pl-5 py-3 mt-6 hidden sm:block'>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value='Men'
                onChange={handleCategoryChange}
              />
              Men
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value='Women'
                onChange={handleCategoryChange}
              />
              Women
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value='Kids'
                onChange={handleCategoryChange}
              />
              Kids
            </p>
          </div>
        </div>

        {/* SUBCATEGORY */}
        <div className='border border-gray-300 pl-5 py-3 my-5 hidden sm:block'>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value='Topwear'
                onChange={handleSubCategoryChange}
              />
              Topwear
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value='Bottomwear'
                onChange={handleSubCategoryChange}
              />
              Bottomwear
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value='Winterwear'
                onChange={handleSubCategoryChange}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right - Products */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <div className='inline-flex gap-2 items-center mb-3'>
            <p className='text-gray-500'>
              ALL <span className='text-gray-700 font-medium'>COLLECTIONS</span>
            </p>
            <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
          </div>
          <select
            className='border-2 border-gray-300 text-sm px-2'
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value=''>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        {/* Render Products with ProductCard */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection
