
// import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ResetPassword from "./ResetPassword";

export const ProtectedResetRoute = () => {
  const { token } = useParams();
  const [isValid, setIsValid] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  useEffect(() => {
    const verifyToken = async () => {
      setIsVerifying(true);
      try{
         await axios.get(`${import.meta.env.VITE_BACKEND_URL}auth/resetPassword/${token}`);
        
        setIsValid(true);
      }catch {
        setIsValid(false);
      
      }finally{
        setIsVerifying(false)
       
      }
    };
    verifyToken();
   
  }, [token]);

  // if (isVerifying) return <LoadingSpinner />;
  if (isVerifying) return <div className="flex justify-center items-center lg:text-3xl md:text-2xl sm:text-xl text-lg dark:text-white">Verifying reset link...</div>;

  if (!isValid) return <Navigate to="/invalid-reset-link" />;
  
  return <ResetPassword />;
};




