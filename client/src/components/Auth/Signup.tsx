
import {  useState } from "react"
import ContinuewithGoogle from "./ContinuewithGoogle"
import { NavLink, useNavigate } from "react-router-dom"
import { usePost } from "../../context/apiContext"
import { AuthResponse } from "../../types/apiType"
import { useAuthContext } from "../../hooks/useAuth"
function Signup() {

const [formData,setFormData]= useState({
  name:"",
  email:"",
  password:"",
  confirmPassword:""
})
const [signupstatus, setSignupStatus] = useState<boolean| undefined>()
const navigate = useNavigate()
const {setIsAuthenticated,setUser}=useAuthContext()
const handleChange = async (e: {
  target: { name: string; value: string | number };
}) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

  const {
   
    loading,
    error,
    execute: signup,
  } = usePost<AuthResponse>("/auth/signup");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response= await signup(formData);
      setIsAuthenticated(true);
      setSignupStatus(true)
  
     setUser(response?.data)
        navigate("/");
     
    } catch {
      console.error("Login failed");
    }
  };

  return (
 <div className="dark:bg-colorGradient2">
    { !signupstatus ?
    <div className=" min-h-screen flex  justify-center items-center py-8">
    <div className=" flex items-center justify-center p-10 flex-col border-2 border-gray-400 max-sm:border-none w-full max-w-md rounded-lg " >
    <h1 className="text-2xl mb-3 dark:text-gray-300"> Hello <b className="dark:text-white">Notework User </b></h1> 
    <div className="mb-4 p-2 flex-col justify-center text-gray-700">
    <span className="dark:text-gray-400 md:text-lg  ">Create your account and get access to </span>
    <p className="dark:text-gray-400">plethora of summarized texts.</p>
    </div>
      <form action="" className="" onSubmit={handleSubmit} >
      <div className="flex flex-col gap-1.5 mb-4  dark:text-white ">
        <label htmlFor="name" className="text-gray-600 dark:text-gray-300">
            Full Name
        </label>
        <input
            type="text"
            name="name"
             value={formData.name}
           
            id="name"
            placeholder="Full Name"
            className=" mt-2 py-3 px-3 rounded-lg dark:bg-colorGradient1  border  border-gray-400 dark:text-white font-semibold placeholder-gray-600 dark:placeholder-gray-400  dark:autofill:placeholder-colorGradient1  focus:ring-1 dark:focus:ring-gray-400 focus:ring-colorGradient2"
            onChange={handleChange}
            required
            
       />
    </div>

    <div className="flex flex-col gap-1.5 mb-4  dark:text-white">
        <label htmlFor="email" className="text-gray-600 dark:text-gray-300">
            Email
        </label>
        <input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
             value={formData.email}
            className="w-100 mt-2 py-3 px-3 rounded-lg dark:bg-colorGradient1 border border-gray-400 dark:text-white font-semibold placeholder-gray-600 dark:placeholder-gray-400  autofill:dark:bg-colorGradient1 focus:ring-1 dark:focus:ring-gray-400 focus:ring-colorGradient2"
             onChange={handleChange}
             required
             
      />
    </div>

    <div className="flex flex-col gap-1.5 mb-4 dark:text-white">
        <label htmlFor="password" className="text-gray-600 dark:text-gray-300">
          Password
        </label>
        <input
            type="password"
            name="password"
           
            value={formData.password}
            placeholder="••••••••"
            className="w-100 mt-2 py-3 px-3 rounded-lg dark:bg-colorGradient1 border border-gray-400 dark:text-white font-semibold placeholder-gray-600 dark:placeholder-gray-400  autofill:dark:bg-colorGradient1 focus:ring-1 dark:focus:ring-gray-400 focus:ring-colorGradient2"
            onChange={handleChange}
            required
        />
    </div>
    <div className="flex flex-col gap-1.5 mb-4 dark:text-white">
        <label htmlFor="password" className="text-gray-600 dark:text-gray-300">
          Confirm Password
        </label>
        <input
            type="Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="••••••••"
            className="w-100 mt-2 py-3 px-3 rounded-lg dark:bg-colorGradient1 border border-gray-400 dark:text-white font-semibold placeholder-gray-600 dark:placeholder-gray-400  autofill:dark:bg-colorGradient1 focus:ring-1 dark:focus:ring-gray-400 focus:ring-colorGradient2"
            onChange={handleChange}
            required
        />
    </div>

    {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                   Oops! Sign Up failed
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error.message}
                  </div>
                </div>
              </div>
            </div>
          )}

<div className=" flex justify-center ">
    <button
        type="submit"
        className="  w-full bg-colorGradient2 dark:bg-colorGradient1 text-white font-bold py-3 px-3  rounded-lg mt-3 hover:bg-black transition ease-in-out duration-300"
        disabled={loading}
    >
        {loading ? "Creating ...." : "Create Account"}
    </button>
  
    </div>

    <p className="flex p-4 mt-2 gap-2 dark:text-white">Already have an account? <NavLink to="/login" className="text-blue-400" > Login </NavLink></p>
    <ContinuewithGoogle /> 
      </form>
    
     </div>
     </div>
    
     :
    <h2 className="dark:text-white sm:text-2xl md:text-5xl text-xl flex justify-center items-center dark:bg-colorGradient2 h-screen"> 🎉 Account created successfully.</h2>
 
            
  }
    </div>
      
   
  )
}

export default Signup