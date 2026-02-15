import React from 'react'
import { Link } from 'react-router-dom'
import{FaFacebook,FaInstagram,FaPinterest,FaTwitterSquare} from 'react-icons/fa'
import { Button } from './ui/button'
const Footer = () => {
  return (
     <footer className='bg-gray-900 text-gray-200 py-10'>
        <div className='max-w-7xl mx-auto px-4 md:flex md:justify-between'>
            <div className='mb-6 md:mb-0'>
                <Link to='/'>
                <img src="TechDuaan.png" alt="" className='w-32' />
                </Link>
                <p className='mt-2 text-sm'>Powering your world with best in Electronics</p>
                <p className='mt-2 text-sm'>123 Electronics st,style city,NY 10001</p>
                <p className=' text-sm'>Email:support@gmail.com</p>
                <p className=' text-sm'>Phone:(123)456-7890</p>
            </div>
            <div className='mb-6 md:mb-0' >
                <h3 className='text-xl font-semibold' >Customer</h3>
                <ul className='mt-2 text-sm space-y-2'>
                    <li>Contact Us</li>
                    <li>Shipping & Returns</li>
                    <li>FAQs</li>
                    <li>Order Tracking</li>
                    <li>Size Guide</li>
                </ul>
            </div>
            <div className='mb-6 md:mb-0'>
               <h3 className='text-xl font-semobold'>Follow us</h3>
               <div className='flex space-x-4 mt-2'>
                 <FaFacebook/>
                 <FaInstagram/>
                 <FaTwitterSquare/>
                 <FaPinterest/>
               </div>
            </div>
            <div >
             <h3>Stay in the loop</h3>
             <p>Subscribe to get special offers</p>
             <form action="" className='mt-4 flex'>
                <input type="email"
                placeholder='you email-address'
                className='w-full p-2 rounded-1-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500'
                />
                <Button type='submit' className=' bg-pink-600 text-white px-4 rounded-r-md hover:bg-red-700'>Subscribe</Button>
             </form>
            </div>
        </div>
        <div>
            <p>&copy;{new Date().getFullYear()}<span className='text-pink-600'>TechDukaan</span> All rights reserved</p>
        </div>
     </footer>
  )
}

export default Footer
