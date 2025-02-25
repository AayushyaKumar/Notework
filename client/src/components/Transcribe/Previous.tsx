
import { useState } from "react";
import { AuthProvider } from "../../context/auth";
import { useAuthContext } from "../../hooks/useAuth";
import { ChevronLeft, ChevronRight,Video } from "lucide-react";

function Previous() {

   const {activity} = useAuthContext()
   const [currentIndex, setCurrentIndex] = useState(0);
   const itemsPerPage = 4; 
  if(!activity?.thumbnail) return null
  const totalPages= Math.ceil(activity?.thumbnail.length/ itemsPerPage)
  const startIndex = currentIndex * itemsPerPage;

  return (
    <AuthProvider>
    <div className="flex flex-col justify-center gap-10 py-12">
      <h1 className=" flex justify-center text-2xl font-bold dark:text-white">Previous Visited</h1>
 <div className="xl:flex xl:flex-row xl:justify-center xl:items-center xl:gap-8 xl:ml-10 xl:mr-10 flex flex-col items-center xl:w-11/12 w-4/5 mx-auto gap-20">  
   {!activity?.thumbnail[0]?
   <div className="flex flex-row items-center justify-center gap-8 dark:text-white lg:text-2xl md:text-xl text-lg p-4 mb-4 mt-4">
<Video className="h-20 w-20"/>
    <p className="">
Your previous videos and their title would appear here
    </p>
   </div>
  : activity?.thumbnail.slice(startIndex, startIndex + itemsPerPage).map((value,key)=>(
    <div className="border-2 border-gray-300 rounded  h-[300px] w-[250px] flex flex-col " key={ startIndex+ key}>
    <img src={value} className="w-full h-48 object-cover" alt="image" />
    <div className="p-2 flex-1 flex items-center justify-center">
    <p  className="dark:text-white text-center line-clamp-2 overflow-hidden w-full">{activity?.heading[startIndex+ key]}</p>
</div>
</div> 
         
   ))
  }
 
      </div>
   
   { activity.thumbnail[0] && (<div className="flex justify-center items-center mt-6 gap-4 ">
          <button
            onClick={()=>{ setCurrentIndex((prev)=>Math.max(0,prev-1))}}
            disabled={currentIndex === 0}
            className="p-2 rounded-full dark:text-white dark:hover:text-black dark:hover:bg-gray-100 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6 " />
          </button>
          
          <span className="text-md dark:text-white">
            Page {currentIndex + 1} of {totalPages}
          </span>
          
          <button
              onClick={()=>{setCurrentIndex((prev)=> Math.min(totalPages-1,prev+1))}}
              disabled={currentIndex=== totalPages-1}
            className="p-2 rounded-full dark:text-white dark:hover:text-black dark:hover:bg-gray-100 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6 " />
          </button>
        </div>)}
    </div>
    </AuthProvider>
  );
}

export default Previous;
