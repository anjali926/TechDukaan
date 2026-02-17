import React from 'react'
import { useState } from "react";
 import { Label } from "@/components/ui/label";
 import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '@/redux/userSlice';
import API_URL from '@/config';
import userLogo from "../assets/user.jpg"


 

const Profile = () => {
  const {user}=useSelector(store=>store.user)
  const params=useParams()
  const userId=params.userId

  const [updateUser, setupdateUser] = useState({
    firstName:user?.firstName,
    lastName:user?.lastName,
    email:user?.email,
    phonenumber:user?.phonenumber,
    address:user?.address,
    city:user?.city,
    pincode:user?.pincode,
    profilePic:user?.profilePic,
    role:user?.role
  })

  const [file, setFile] = useState(null)
  const dispatch=useDispatch()
  const handleChange=(e)=>{
    setupdateUser({...updateUser,[e.target.name]:e.target.value})
  }
  const handleFileChange=(e)=>{
    const selectedFile=e.target.files[0]
    setFile(selectedFile)
    setupdateUser({...updateUser,profilePic:URL.createObjectURL(selectedFile)})//preview only
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(updateUser)
    const accessToken=localStorage.getItem("accessToken")
    try {
      //use form-data for text+file
      const formData=new FormData()
      formData.append("firstName",updateUser.firstName)
      formData.append("lastName",updateUser.lastName)
      formData.append("address",updateUser.address)
      formData.append("city",updateUser.city)
      formData.append("phonenumber",updateUser.phonenumber)
      formData.append("pincode",updateUser.pincode)
      formData.append("role",updateUser.role)
      
      if(file){
        formData.append("file",file) //image file for backend multer
      }
      const res=await axios.put(`${API_URL}/api/v1/user/update/${userId}`,formData,{
        headers:{
          Authorization:`Bearer ${accessToken}`,
          "Content-Type":"multipart/form-data"
        }
      })
      if(res.data.success){
        toast.success(res.data.message)
         dispatch(setUser(res.data.user))   
         setupdateUser(res.data.user); // 🔥 sync state
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to update profile")
    }
  }
  return (
    <div className='pt-30 min-h-screen bg-gray-100'>
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="profile">Orders</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
         <div>
            <div className='flex flex-col justify-center items-center bg-gray-100'>
                <h1 className='font-bold mb-7 text-2xl text-gray-800'>Update Profile</h1>
                <div className='w-full flex gap-10 justify-between items-start px-7 max-w-2xl'>
                    {/* Profile Picture */}
                    <div className='flex flex-col items-center'>
                        <img src={updateUser?.profilePic || userLogo} alt="profile" className='w-32 h-32 rounded-full object-cover border-4 border-pink-800' />
                        <Label 
                        className='mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 border rounded-lg hover:bg-pink-700'>
                          Change Picture 
                            <input 
                            type="file" 
                            accept='image/*' 
                            className='hidden'
                            onChange={handleFileChange} />
                        </Label>
                    </div>
                    {/* profile form */}
                    <form onSubmit={handleSubmit} className='space-y-4 shadow-lg p-5 rounded-lg bg-whte' >
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <Label 
                          className='block text-sm font-medium'>
                          First Name
                          </Label>
                          <Input type="text" 
                          name="firstName" 
                          className='w-full border rounded-lg px-3 py-2 mt-1' 
                          placeholder='Enter First Name'
                          value={updateUser.firstName}
                          onChange={handleChange} />
                        </div>
                        <div>
                          <Label 
                          className='block text-sm font-medium'>
                          Last Name
                          </Label>
                          <Input type="text" 
                          name="lastName" 
                          className='w-full border rounded-lg px-3 py-2 mt-1' 
                          placeholder='Enter Last Name ' 
                          value={updateUser.lastName}
                          onChange={handleChange}/>
                        </div>
                      </div>
                       <div>
                          <Label 
                          className='block text-sm font-medium'>
                            Email
                          </Label>
                          <Input type="email" 
                          name="email"  
                          className='w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed' 
                          placeholder='Enter Your Email'
                          value={updateUser.email}
                          onChange={handleChange} />
                        </div>
                        <div>
                          <Label 
                          className='block text-sm font-medium'>
                            Phone Number
                          </Label>
                          <Input type="text" 
                          name="phonenumber" 
                          className='w-full border rounded-lg px-3 py-2 mt-1' 
                          placeholder='Enter Contact number'
                          value={updateUser.phonenumber}
                          onChange={handleChange} /> 
                        </div>
                        <div>
                          <Label 
                          className='block text-sm font-medium'>
                            Address
                          </Label>
                          <Input 
                          type="text" 
                          name="address" 
                          className='w-full border rounded-lg px-3 py-2 mt-1' 
                          placeholder='Enter your address'
                          value={updateUser.address}
                          onChange={handleChange}  />
                        </div>
                        <div>
                          <Label 
                          className='block text-sm font-medium'>
                            City
                          </Label>
                          <Input 
                          type="text" 
                          name="city" 
                          className='w-full border rounded-lg px-3 py-2 mt-1' 
                          placeholder='Enter your city'
                          value={updateUser.city}
                          onChange={handleChange}  />
                        </div>
                        <div>
                          <Label 
                          className='block text-sm font-medium'>
                            PinCode
                          </Label>
                          <Input 
                          type="text" 
                          name="pincode" 
                          className='w-full border rounded-lg px-3 py-2 mt-1' 
                          placeholder='Enter your pincode'
                          value={updateUser.pincode}
                          onChange={handleChange} />
                        </div>
                        <Button 
                        type='submit' 
                        className='w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg'>
                          Update Profile
                        </Button>
                    </form>
                </div>
            </div>
         </div>
      </TabsContent>

      <TabsContent value="Orders">
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Track performance and user engagement metrics. Monitor trends and
              identify growth opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Page views are up 25% compared to last month.
          </CardContent>
        </Card>
      </TabsContent>
       
      
    </Tabs>
    </div>
  )
}

export default Profile
