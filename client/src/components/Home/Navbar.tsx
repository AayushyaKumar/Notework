import { NavLink } from "react-router-dom";
import { useThemeButton } from "../../hooks/useTheme";
import { useAuthContext } from "../../hooks/useAuth";
import { ThemeProvider } from "../../context/Theme";
import { AuthProvider } from "../../context/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Moon, Sun, AlignJustify} from 'lucide-react';
import { ToggleBar } from "./ToggleBar";

export default function Navbar() {
  const { isAuthenticated, user } = useAuthContext();
  const { darkMode, themeSwitch } = useThemeButton();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [route,setRoute] = useState<boolean>()
  const location = useLocation()
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    
    if(location.pathname ==='/' || location.pathname==='/forgotPassword'){
      setRoute(true)
    }  else{
      setRoute(false)
    }   
  },[location.pathname])

  const handleNavigateToCharts = () => {
    navigate("/dash#charts");
    chartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="flex  justify-between items-center shadow-md dark:bg-colorGradient1 p-1.5">
          <NavLink to="/">
            <button className=" ml-3 font  text-2xl mt-2 mr-4 font-display dark:text-white">
              NOTEWORK
            </button>
          </NavLink>
          {isAuthenticated && (
            <>
            
            <ul className="hidden md:flex flex-row justify-center md:gap-16 ml-12">
               <li className="dark:text-white  rounded-xl px-2 py-2 sm:mr-1 font-bold">
              <NavLink to="pdf" className={({isActive})=>` ${isActive? 'bg-black p-2 rounded-lg text-white dark:bg-hoverColor': 'hover:bg-black hover:rounded-lg hover:text-white p-2 dark:hover:bg-hoverColor' }`}>
                    Transcribe
              </NavLink>

              </li> 
              <li className="dark:text-white rounded-xl px-2 py-2 sm:mr-1 font-bold ">

              <NavLink to="dash#resources" className={({isActive})=>` ${(isActive && (location.hash==='#resources'))? 'bg-black p-2 rounded-lg text-white dark:bg-hoverColor':  'hover:bg-black hover:rounded-lg hover:text-white p-2 dark:hover:bg-hoverColor' }`}>
                  {" "}
                    Dashboard
                                 
              </NavLink>
               </li>
               <li className="dark:text-white rounded-xl px-2 py-2 sm:mr-1 font-bold ">
<button className="" onClick={handleNavigateToCharts}>
              <NavLink to="dash#charts" className={({isActive})=>`${(isActive && location.hash==='#charts')? 'bg-black p-2 rounded-lg text-white dark:bg-hoverColor': 'hover:bg-black hover:rounded-lg hover:text-white p-2 dark:hover:bg-hoverColor' }`}>
                  {" "}
                    Reports
                  
              </NavLink>
              </button>

              </li>
            </ul> 
            {
            <div className="flex justify-center">
              {" "}
              <button onClick={themeSwitch}>
                {" "}
                {darkMode ?    
                     <Sun className="h-7 w-6 text-gray-600 dark:text-gray-400" />

                 : 
                 <Moon className="h-7 w-6 text-gray-600 dark:text-gray-400" />

                }
              </button>{" "}
            </div>
          }
            <div className="flex justify-end">
            < NavLink to="/profile"> <img
            src={`${user?.profile}`}
            alt={user?.name}
            width={50}
            className="rounded-full md:block hidden w-10 h-10 md:mr-4 "
          />
          </NavLink>
          </div>
          </>
        ) }
        { !isAuthenticated && (
          <>
     {
            <div className="flex justify-center">
              {" "}
              <button onClick={themeSwitch}>
                {" "}
                {darkMode ?    
                     <Sun className="h-7 w-6 text-gray-600 dark:text-gray-400" />

                 : 
                 <Moon className="h-7 w-6 text-gray-600 dark:text-gray-400" />

                }
              </button>{" "}
            </div>
          }

          <ul className="hidden  mt-1 md:flex justify-center gap-14 ">
                            <li className=" font-bold sm:ml-4  rounded-lg">

            <NavLink to="login" className={({isActive})=>`  px-4 ${isActive? 'bg-black p-2 rounded-lg  text-white dark:bg-hoverColor border-2 dark:border-hoverColor border-black': 'hover:bg-black hover:rounded-lg hover:text-white p-2 dark:hover:bg-hoverColor border-2 dark:border-hoverColor border-hoverColor hover:border-black rounded-lg' }`}>
                <button className="dark:text-white ">Log In </button>
             
            </NavLink>
            </li>
            <li className="  font-bold     ">

            <NavLink to="signup" className={({isActive})=>`  border-2 dark:border-hoverColor ${(isActive || route)? 'bg-black p-2 rounded-lg text-white dark:bg-hoverColor border-2 dark:border-hoverColor border-black': 'hover:bg-black  hover:rounded-lg p-2 hover:text-white dark:text-white text-black dark:hover:bg-hoverColor border-2 border-hoverColor dark:border-hoverColor hover:border-black rounded-lg' }`}>
                <button className="">
                  Start for free
                </button>
            </NavLink>
            </li>

          </ul>

</>
           )}
          

          <div className="lg:hidden md:hidden sm:block  flex items-center ">
            <button
              onClick={()=>{setIsOpen(!isOpen)}}
              className="text-white focus:outline-none"
            >
            {user ?   <img
              src={`${user?.profile}`}
              alt={user?.name}
              width={50}
              className="w-8 h-8 rounded-full" loading="lazy"
            />: <AlignJustify className="text-black dark:text-white"/> }
            </button>
          </div>
          
<ToggleBar isOpen={isOpen}  isClose={()=>setIsOpen(false)}  />

        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
