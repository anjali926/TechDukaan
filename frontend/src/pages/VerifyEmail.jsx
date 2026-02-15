import API_URL from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("verifying...");
  const navigate = useNavigate();

  const VerifyEmailRequest = async() => {
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/user/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
      if (res.data.success) {
        setStatus("Email verified successfully");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setStatus("verification failed.please try again");
    }
  };
  useEffect(() => {
    VerifyEmailRequest();
  }, [token]);

  return (
    <div className="relative bg-pink-100 w-full h-190 overflow-hidden">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center w-[90%] max-w-md">
          <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
