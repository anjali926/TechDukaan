import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
const ReVerify = () => {
     
      const [loading, setLoading] = useState(false);
      const [formData, setformData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      const navigate = useNavigate();
      const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const submitHandler = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
          setLoading(true);
          const res = await axios.post(
            `http://localhost:8000/api/v1/user/reverify`,
            formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          if (res.data.success) {
            navigate("/verify");
            toast.success(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
        } finally {
          setLoading(false);
        }
      };
  return (
     <div className="flex justify-center items-center min-h-screen bg-pink-100">
           <Card className="w-full max-w-sm">
             <CardHeader>
               <CardTitle>verify your account</CardTitle>
               <CardDescription>
                 Enter given detail to login into your account
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="flex flex-col gap-3">
                 <div className="grid grid-cols-2 gap-4"></div>
                 <div className="grid gap-2">
                   <Label htmlFor="email">Email</Label>
                   <Input
                     id="email"
                     name="email"
                     type="email"
                     placeholder="m@example.com"
                     required
                     value={formData.email}
                     onChange={handleChange}
                   />
                 </div>
     
                  
               </div>
             </CardContent>
             <CardFooter className="flex-col gap-2">
               <Button
                 onClick={submitHandler}
                 type="submit"
                 className="w-full bg-pink-600 hover:bg-pink-500 text-white cursor-pointer "
               >
                 {loading ? (
                   <>
                     <Loader2 className="h-4 w-4 animate-spin mr-2" />
                     Please wait
                   </>
                 ) : (
                   "verify"
                 )}
               </Button>
                
             </CardFooter>
           </Card>
         </div>
  );
};

export default ReVerify
