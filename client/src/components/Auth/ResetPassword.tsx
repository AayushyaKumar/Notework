import React, {  useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const ResetPass: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState<React.ReactNode>(null);
    const [error, setError] = useState<React.ReactNode>(null);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`http://localhost:4000/auth/resetPassword/${token}`, {
        newPassword,
        confirmPassword,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000); 
    } catch (err) {
      setError("An error occured");
      console.log(err)
    }
  };
return (

<div className="  flex  justify-center items-center py-8 dark:bg-colorGradient2">
<div className=" flex items-center justify-center p-11 flex-col border-2 border-gray-400 w-full max-w-md rounded-lg " >
<h1 className="text-2xl mb-3 dark:text-gray-300"> Reset You Password</h1> 
{ (error || message)? <p className="success-message dark:text-white text-xl">{message? message: error}</p>:  <form className="p-6 " 
 onSubmit={handleSubmit}
> 
<div className="flex flex-col gap-1.5 dark:text-white">
<label htmlFor="password" className="text-gray-600 dark:text-gray-300">
New Password
</label>
<input type="password" id="email" name="email"   className="w-100 mt-2 py-3 px-3 rounded-lg bg-white  border-gray-400 dark:border-none dark:text-white  font-semibold dark:placeholder-gray-400 placeholder-gray-500 border-2  dark:bg-colorGradient4" placeholder="••••••••"
    value={newPassword}  
    onChange={(e) => setNewPassword(e.target.value)}

required
/>
</div>
<div className="flex flex-col py-4 gap-1.5 dark:text-white">
<label htmlFor=" password" className="text-gray-600 dark:text-gray-300"> Confirm New Password</label>
<input type="password" id="password" name="password"  placeholder="••••••••" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border-2 border-gray-400 dark:border-none dark:placeholder-gray-400 placeholder-gray-500 dark:text-white font-semibold dark:bg-colorGradient4"
value={confirmPassword}   
onChange={(e) => setConfirmPassword(e.target.value)}

required />
</div>

{/* <div className=" bg-colorGradient2  text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-black flex items-center justify-center dark:border dark:border-colorGradient1 dark:hover:bg-colorGradient1" >  */}
<button  className="bg-colorGradient2 w-full text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-black flex items-center justify-center dark:border dark:border-colorGradient1 dark:hover:bg-colorGradient1" >Reset Password</button>  
{/* </div> */}
</form>}

</div>
</div>
)
}

export default ResetPass