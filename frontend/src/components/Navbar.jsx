import { ShoppingCart } from 'lucide-react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/userSlice';
import API_URL from "@config.js"

const Navbar = () => {
  const {user}=useSelector(store=>store.user)
  const accessToken=localStorage.getItem('accessToken')
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const logOutHandler=async()=>{
     

    try{
       const res=await axios.post(`${API_URL}/api/v1/user/logout`,{},{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
       })
       if(res.data.success){
        dispatch(setUser(null))//to clean or delete data(as here user loggedout so thee data should be removed from here)
        navigate('/signup')
        toast.success(res.data.message)
       }
    }catch(error){
       console.log(error);
    }
  }
  return (
   <header className='bg-pink-50 fixed  w-full z-20 border-b border-pink-200'>
    <div className='max-w-7xl mx-auto flex justify-between items-center  py-2' >
         <div  >
           <img src="/TechDukaan.png" className=' h-20 w-auto '/>
         </div>
         <nav className='flex gap-10 justify-between items-center' >
      <ul className='flex gap-7 items-center text-xl font-semibold' >
        <Link to={'/'}><li>Home</li></Link>
        <Link to={'/products'}><li>products</li></Link>
        {
          user&&<Link to={'/profile'}><li>Hello, {user.firstName}</li></Link>
        }

      </ul>
      <Link to={'/cart'} className='relative'>
       <ShoppingCart/>
       <span className='bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2'>0</span>
       </Link>
       {
        user? <Button onClick={logOutHandler} className='bg-pink-600 text-white cursor-pointer hover:bg-black' >Logout</Button>:
        <Link to='/login'>
        <Button className='bg-linear-to-tl from-blue-600 to-purple-600 text-white cursor-pointer' >Login</Button>
        </Link>
        
       }
    </nav>
    </div>
    
   </header>
  )
}

export default Navbar
