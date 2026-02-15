import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import ReVerify from "./pages/ReVerify";
import Profile from "./pages/Profile";
 
 const router = createBrowserRouter([
  {
    path:'/',
    element:<><Navbar/><Home/></>
  },
  {
    path:'/signup',
    element:<><Signup/></>
  },
  {
    path:'/login',
    element:<><Login/></>
  },
  {
    path:'/verify',
    element:<><Verify/></>
  },
  {
    path:'/verify/:token',
    element:<><VerifyEmail/></>
  },
  {
    path:'/reverify',
    element:<><ReVerify/></>
  },
  {
    path:'/profile',
    element:<><Navbar/><Profile/></>
  },

 ])


 const App= () => {
  return (
    <>
    <RouterProvider router ={router}/>
    </>
  )
}

export default App
