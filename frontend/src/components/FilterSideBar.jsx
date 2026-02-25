import React from 'react'
import { Input } from './ui/input'
import { Label } from '@radix-ui/react-label'
import { Button } from './ui/button'

const FilterSideBar = ({search,setSearch,category,setCategory,brand,setBrand,allProducts,priceRange,setPriceRange}) => {
    const Categories=allProducts.map(p=>p.category)
    const uniqueCategory=["All",...new Set(Categories)]

    const Brands=allProducts.map(p=>p.brand)
    const uniqueBrands=["All",...new Set(Brands)]
    // console.log(uniqueBrands);

    const handleCategoryClick=(val)=>{
        setCategory(val)
    }
    const handleBrandChange=(e)=>{
        setBrand(e.target.value)
    }
    const handleMinChange=(e)=>{
        const value=Number(e.target.value)
        if(value<=priceRange[1]) setPriceRange([value,priceRange[1]])
    }
    const handleMaxChange=(e)=>{
        const value=Number(e.target.value)
        if(value>=priceRange[0]) setPriceRange([priceRange[0],value])
    }
    const resetFilter=()=>{
        setSearch("");
        setBrand("All")
        setCategory("All")
        setPriceRange([0,999999])
    }
  return (
    <div className='bg-gray-100 mt-10 p-5 rounded-md h-max hidden md:block w-64'>
        {/* search */}
        <Input 
        type="text" 
        placeholder="search..." 
        className="bg-white pt-2 rounded-md border-gray-400"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
        {/* cateegories */}
        <h1 className='mt-5 font-semibold text-xl' >Category</h1>
        <div className='flex flex-col gap-2 mt-3' >
            {
                uniqueCategory.map((item,index)=>(
                     <div key={index} className='flex items-center gap-2'>
                        <input  type='radio' checked={category===item} onChange={()=>handleCategoryClick(item)} />
                        <label htmlFor="" >{item}</label>
                     </div>
                ))
            }
        </div>
        {/* Brands */}
        <h1 className='mt-5 font-semibold text-xl' >Brands</h1>
         <select className="bg-white w-full p-2 border-gray-200 rounded-md" value={brand} onChange={handleBrandChange }>
            {
                uniqueBrands.map((item,index)=>{
                   return <option key={index} value={item} >{item}</option>
                })
            }
         </select>
          {/* Price range */}
        <h1 className='mt-5 font-semibold text-xl mb-3' >Price range</h1>
          <div className='flex flex-col gap-2 mt-3' >
            <label htmlFor="">
                price Range:₹{priceRange[0]}-₹{priceRange[1]}
            </label>
            <div className='flex gap-2 items-center'>
                <input type="number" min="0" max="5000" value={priceRange[0]} onChange={handleMinChange} className="w-20 p-1 border border-grsy-100 rounded" />
                <span>-</span>
            
                <input type="number" min="0" max="99999" value={priceRange[1]} onChange={handleMaxChange} className="w-20 p-1 border border-grsy-100 rounded" />
            </div>
            <input type="range" min="0" max="5000" value={priceRange[0]}  onChange={handleMinChange} step="100" className='w-full' />
             <input type="range" min="0" max="5000" step="100" className='w-full'value={priceRange[1]} onChange={handleMaxChange} />
          </div>
          {/* reset button */}
          <Button onClick={resetFilter} className="bg-pink-600 text-white mt-5 cursor-pointer w-full hover:bg-black">Reset Filter</Button>
    </div>
  )
}

export default FilterSideBar
