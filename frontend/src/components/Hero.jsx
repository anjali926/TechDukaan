import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative w-full h-screen pt-16">
      
      {/* Image */}
      <img 
        src="/hero.png" 
        alt="Tech Appliances" 
        className="w-full h-full object-cover"
      />

      {/* Button */}
      <Link to="/products" >
      <div className='absolute inset-0 flex items-center justify-center' >
        <button className="
                         bg-pink-500 text-white 
                         px-6 py-3 rounded-lg 
                         text-lg font-semibold 
                         hover:bg-black 
                         transition duration-300">
        Shop Now
      </button>

      </div>
      </Link>
      
      
    </div>
  )
}

export default Hero
