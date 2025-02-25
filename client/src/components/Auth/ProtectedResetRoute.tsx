
// import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ResetPassword from "./ResetPassword";

export const ProtectedResetRoute = () => {
  const { token } = useParams();
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    const verifyToken = async () => {
      try{
        const result = await axios.get(`http://localhost:4000/auth/resetPassword/${token}`);
        setIsValid(result.data.valid);
      }catch {
        setIsValid(false);
      }
    };
    verifyToken();
  }, [token]);

  // if (isVerifying) return <LoadingSpinner />;
  if (!isValid) return <Navigate to="/invalid-reset-link" />;
  
  return <ResetPassword />;
};




