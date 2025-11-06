import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai';

const Filter = ({ setIsSidebarOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    color: '',
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100
  })

  const categories = ['Top Wear', 'Bottom Wear']
  const colors = [
    'Red',
    'Blue',
    'Black',
    'Green',
    'Yellow',
    'Gray',
    'White',
    'Pink',
    'Beige',
    'Navy'
  ]
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const materials = [
    'Cotton',
    'Wool',
    'Denim',
    'Polyester',
    'Silk',
    'Linen',
    'Viscose',
    'Fleece'
  ]
  const brands = [
    'Urban Threads',
    'Modern Fit',
    'Street Style',
    'Beach Breeze',
    'Fashionista',
    'ChicStyle'
  ]
  const gender = ['Men', "Women"]

  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(',') : [],
      material: params.material ? params.material.split(',') : [],
      brand: params.brand ? params.brand.split(',') : [],
      minPrice: params.minPrice ? Number(params.minPrice) : 0,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : 100
    })
  }, [searchParams])

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target
    let newFilter = { ...filters }
    if (type === 'checkbox') {
      if (checked) {
        newFilter[name] = [...(newFilter[name] || []), value]
      } else {
        newFilter[name] = newFilter[name].filter((item) => item !== value)
      }
    } else {
      newFilter[name] = value
    }
    setFilters(newFilter)
    updateURLParams(newFilter)
  }

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      const value = newFilters[key];

      if (Array.isArray(value) && value.length > 0) {
        params.append(key, value.join(","));
      }
      else if (typeof value === "string" && value.trim() !== "") {
        params.append(key, value);
      }
      else if (typeof value === "number") {
        params.append(key, value);
      }
    });

    setSearchParams(params);
  };

  return (
    <div className='flex flex-col gap-3 text-white p-3 min-w-[280px] overflow-hidden'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Filter</h1>
        <AiOutlineClose className='text-2xl cursor-pointer sm:hidden' onClick={() => setIsSidebarOpen(false)} />
      </div>

      {/* Category filter */}
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-semibold'>Category</h1>
        <div>
          {
            categories.map((category, idx) => (
              <div key={idx} className='flex gap-2'>
                <input type="radio"
                  id={category}
                  name='category'
                  checked={filters.category === category}
                  className='cursor-pointer'
                  onChange={handleFilterChange}
                  value={category} />
                <label htmlFor={category} className='cursor-pointer'>{category}</label>
              </div>
            ))
          }
        </div>
      </div>

      {/* Gender filter */}
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-semibold'>Gender</h1>
        <div>
          {
            gender.map((value, idx) => (
              <div key={idx} className='flex gap-2 cursor-pointer'>
                <input type="radio"
                  name="gender"
                  id={value}
                  checked={filters.gender === value}
                  className='cursor-pointer'
                  onChange={handleFilterChange}
                  value={value} />
                <label htmlFor={value} className='cursor-pointer'>{value}</label>
              </div>
            ))
          }
        </div>
      </div>

      {/* Color filter */}
      <div className='sm:w-30 md:w-35 lg:w-50 xl:w-60 overflow-hidden'>
        <h1>Color</h1>
        <div className='flex flex-wrap gap-2'>
          {
            colors.map((color, idx) => (
              <button key={color}
                value={color}
                name='color'
                onClick={handleFilterChange}
                className={`size-8 rounded-full cursor-pointer transition hover:scale-105 ${filters.color === color && 'ring-2 ring-orange-500'}`}
                style={{ backgroundColor: color.toLocaleLowerCase() }}></button>
            ))
          }
        </div>
      </div>

      {/* Size filter */}
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-semibold'>Size</h1>
        <div>
          {
            sizes.map((size, idx) => (
              <div key={idx} className='flex gap-2'>
                <input type="checkbox"
                  name="size"
                  onChange={handleFilterChange}
                  checked={filters.size.includes(size)}
                  className='cursor-pointer'
                  id={size}
                  value={size} />
                <label htmlFor={size} className='cursor-pointer'>{size}</label>
              </div>
            ))
          }
        </div>
      </div>

      {/* Meterials filter */}
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-semibold'>Materials</h1>
        <div>
          {
            materials.map((material, idx) => (
              <div key={idx} className='flex gap-2'>
                <input type="checkbox"
                  name="material"
                  id={material}
                  checked={filters.material.includes(material)}
                  onChange={handleFilterChange}
                  className='cursor-pointer'
                  value={material} />
                <label htmlFor={material} className='cursor-pointer'>{material}</label>
              </div>
            ))
          }
        </div>
      </div>

      {/* Brands filter */}
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-semibold'>Brands</h1>
        <div>
          {
            brands.map((brand, idx) => (
              <div key={idx} className='flex gap-2'>
                <input type="checkbox"
                  name="brand" id={brand}
                  checked={filters.brand.includes(brand)}
                  onChange={handleFilterChange}
                  className='cursor-pointer'
                  value={brand} />
                <label htmlFor={brand} className='cursor-pointer'>{brand}</label>
              </div>
            ))
          }
        </div>
      </div>

      {/* Price Range filter */}
      <div className='flex flex-col gap-2 sm:w-30 md:w-35 lg:w-45 xl:w-60 overflow-hidden'>
        <h1 className='text-xl font-semibold'>Price Range</h1>
        <div className='flex flex-col gap-1'>
          <input
            type="range"
            name="maxPrice"
            min={0}
            max={100}
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className='w-full h-2 bg-red-700 rounded-lg cursor-pointer'
          />

          <div className='flex justify-between text-gray-300'>
            <span>$0</span>
            <span>${filters.maxPrice}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter