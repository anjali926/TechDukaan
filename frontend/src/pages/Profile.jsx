import React from 'react'
 import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
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

 


const Profile = () => {
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
                        <img src="" alt="profile" className='w-32 h-32 rounded-full object-cover border-4 border-pink-800' />
                        <Label className='mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 border rounded-lg hover:bg-pink-700'>Change Picture 
                            <input type="file" accept='image/*' className='hidden' />
                        </Label>
                    </div>
                    {/* profile form */}
                    <form className='space-y-4 shadow-lg p-5 rounded-lg bg-whte' >
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <Label className='block text-sm font-medium'>First Name</Label>
                          <input type="text" name="firstName" className='w-full border rounded-lg px-3 py-2 mt-1' placeholder='Enter Frst Name' />
                        </div>
                        <div>
                          <Label className='block text-sm font-medium'>Last Name</Label>
                          <input type="text" name="lasttName" className='w-full border rounded-lg px-3 py-2 mt-1' placeholder='Enter Last Name' />
                        </div>
                      </div>
                       <div>
                          <Label className='block text-sm font-medium'>Email</Label>
                          <input type="emal" name="email"  className='w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed' placeholder='Enter Your Email'/>
                        </div>
                        <div>
                          <Label className='block text-sm font-medium'>Phone Number</Label>
                          <input type="text" name="phonenumber" className='w-full border rounded-lg px-3 py-2 mt-1' placeholder='Enter Contact number' />
                        </div>
                        <div>
                          <Label className='block text-sm font-medium'>Address</Label>
                          <input type="text" name="address" className='w-full border rounded-lg px-3 py-2 mt-1' placeholder='Enter your address' />
                        </div>
                        <div>
                          <Label className='block text-sm font-medium'>City</Label>
                          <input type="text" name="city" className='w-full border rounded-lg px-3 py-2 mt-1' placeholder='Enter your city' />
                        </div>
                        <div>
                          <Label className='block text-sm font-medium'>PinCode</Label>
                          <input type="text" name="pincode" className='w-full border rounded-lg px-3 py-2 mt-1' placeholder='Enter your pincode' />
                        </div>
                        <Button type='submit' className='w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg'>
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
