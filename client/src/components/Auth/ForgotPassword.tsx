import { Mail, ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
export function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
  const [message,setMessage]=useState("")
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();


      try{
        const response = await axios.post('http://localhost:4000/auth/resetPassword',{
        email
                 
        })
       if(response?.status){

         setIsSubmitted(true)
         setMessage(response.data.message)
       }

      }catch{
        setMessage("If an account with this email exists, a password reset link has been sent.")
        setIsSubmitted(true)
      }
    //   onSubmit(email);
    };
  
    if (isSubmitted) {
      return (
        <div className="text-center h-screen flex flex-col items-center justify-center dark:bg-colorGradient2">
          <div className="mb-2 flex justify-center ">
            <Send className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 dark:text-gray-400">Check your email</h2>
          <p className="text-gray-600 dark:text-gray-500 mb-6 text-xl">
        {message}
          </p>
          {/* <button
            onClick={onBackToLogin}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to login
          </button> */}
        </div>
      );
    }
  
    return (
      <div className="py-4 dark:bg-colorGradient2">
        <div className="text-center mb-4 py-4 ">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reset your password</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg ">
            Enter your email and we'll send you instructions to reset your password
          </p>
        </div>
  <div className="flex  justify-center items-center py-8">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-11  border-2 border-gray-400 w-full max-w-md rounded-lg gap-8">
          <div>
            <label htmlFor="email" className="block  font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <div className="mt-4 w-full  relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-500 rounded-lg dark:bg-colorGradient1 dark:border-colorGradient1 dark:text-white placeholder-gray-600 focus:outline-none focus:border-white focus:ring-1 dark:focus:ring-gray-400 focus:ring-colorGradient2 dark:caret-white"
                placeholder="Enter your email"
              
              />
            </div>
          </div>
  
          <button
            type="submit"
            className="w-9/12 flex items-center justify-center px-4 py-2 border-2 border-transparent rounded-lg shadow-sm text-white bg-colorGradient2 hover:bg-black   dark:hover:bg-colorGradient1 dark:border-colorGradient1 "
          >
            Send reset instructions
          </button>
  
    <NavLink to="/login">      <button
            type="button"
            
            className="w-full flex items-center justify-center text-md font-medium text-colorGradient1 hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to login
          </button>

          </NavLink> 
        </form>
        </div>
      </div >
    );
  }