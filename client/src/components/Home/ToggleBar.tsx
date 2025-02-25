import { X } from "lucide-react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuth";
import { useRef } from "react";

interface Open{
    isOpen:boolean
    isClose:()=>void
}



export function ToggleBar({isOpen,isClose}: Open ){
  const { isAuthenticated, user } = useAuthContext();
  const navigate = useNavigate();

  const location = useLocation()
  const chartRef = useRef<HTMLDivElement>(null);


  const handleNavigateToCharts = () => {
    navigate("/dash#charts");
    chartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

    return(
<div
            className={`md:hidden fixed top-0 right-0 h-3/4 w-10/12 border-black border-2 rounded-2xl dark:bg-colorGradient1 dark:bg-opacity-50 backdrop-blur-sm   dark:text-white transform ${
              isOpen  ? "translate-x-0 fixed right-10" : "translate-x-full"
            } transition-transform duration-300 ease-in-out z-50 `}
          >
            <button onClick={isClose} className="p-4">
            <X className="dark:text-white text-black  mt-2 h-6 w-8"/>
   
            </button>
            <ul className=" flex flex-col items-center gap-8">

            {(isOpen && isAuthenticated)? (
              <>
                  <NavLink to="/profile">
                    <li className="flex flex-row items-center gap-6  p-2 ">
            <img
              src={`${user?.profile}`}
              alt={user?.name}
              width={50}
              className="w-8 h-8 rounded-full"
            /><p className="dark:text-white text-xl ">{user?.name}</p>
            </li>
          </NavLink>
 <li className=" font-bold dark:text-white text-xl">

 <NavLink to="pdf#prompt" className={({isActive})=>` ${(isActive && (location.hash==='#prompt'))? 'bg-black p-2 rounded-lg text-white dark:bg-hoverColor': 'hover:bg-black hover:rounded-lg hover:text-white p-2 dark:hover:bg-hoverColor' }`}>
                   {" "}
                     Transcribe
                  
               
               </NavLink> 
                </li>
               
                 <li className=" font-bold dark:text-white text-xl">
                   {" "}<NavLink to="dash#resources" className={({isActive})=>` ${(isActive && (location.hash==='#resources'))? 'bg-black p-2 rounded-lg text-white dark:bg-hoverColor':  'hover:bg-black hover:rounded-lg hover:text-white p-2 dark:hover:bg-hoverColor' }`}>
                     Dashboard
                   </NavLink>
                 </li>
               
               
                 <li className="font-bold dark:text-white text-xl  ">
                  <button onClick={handleNavigateToCharts}>
                  <NavLink to="dash#charts" className={({isActive})=>`${(isActive && location.hash==='#charts')? 'bg-black p-2 rounded-lg text-white dark:bg-hoverColor ': 'hover:bg-black hover:rounded-lg hover:text-white p-2 dark:hover:bg-hoverColor' }`}>
                  Reports
                   </NavLink>
                   </button>
                 </li>
                 </>

          ): 
          <>
          <li className="font-bold text-xl">
                  {" "}
                  <NavLink to="/login" >Login</NavLink>
                </li>
                <li className="bg-colorGradient2 p-1.5 rounded-lg font-bold text-white text-xl">
                  <NavLink to="/signup" >Sign Up</NavLink>
                </li></> 
                }

</ul>

          </div>
    )
}