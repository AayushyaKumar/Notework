import { HeartCrack } from "lucide-react"
function InvalidTokenPage() {
  return (
    
    <div className="flex flex-col gap-8 items-center justify-center text-center mb-8 max-sm:mt-14 min-h-screen ">
        
          <div className="dark:text-white flex gap-4 2xl:items-center">
          <HeartCrack className=" h-8 w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12  "/>  
          <h2 className="sm:text-2xl text-xl 2xl:text-4xl font-bold  mb-2">Invalid Reset Link</h2>  
          </div>
          <p className="text-gray-600 2xl:text-2xl  dark:text-gray-300">
            This password reset link has expired or is no longer valid. 
            Please request a new reset link to continue.
          </p>
        </div>
        

  )
}

export default InvalidTokenPage