import axios from 'axios';
import React, { createContext, useEffect, useState, ReactNode, useCallback, SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id?: string;
  name: string;
  email: string;
  profile: string;
  joinedDate: string
}
interface Transcribe {
  id: string
  setSummaryInfo: Dispatch<SetStateAction<Transcribe|null>>
}
interface UserActivity {
  thumbnail: string[];
  heading: string[];
  url: string[],
  genre:string[]
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  user: User | null;
  summaryInfo: Transcribe | null;
  setSummaryInfo: Dispatch<SetStateAction<Transcribe|null>>
  activity: UserActivity | null;
  fetchActivity: () => Promise<void>;
  checkAuth:() => Promise<void>;
  logout:()=> void;
  isNew:boolean;
  setIsNew:Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [summaryInfo,setSummaryInfo]= useState<Transcribe| null>(null)
  const [isNew,setIsNew]=useState(false)

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(()=>{
    const  cachedUser=sessionStorage.getItem('user')
    return cachedUser? true : false
  });

  const [user, setUser] = useState<User | null>(()=>{
    const cachedUser = sessionStorage.getItem('user')
    return cachedUser ? JSON.parse(cachedUser):null
  });

const [activity, setActivity] = useState<UserActivity | null>(() => {
    const cachedActivity = sessionStorage.getItem('activity');
    return cachedActivity ? JSON.parse(cachedActivity) : { thumbnail: [], heading: [], url:[] ,genre:[]};
  });
  const navigate = useNavigate()
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    
    setUser(null);
    setActivity(null);
    sessionStorage.clear();
    
    navigate('/login');
    window.location.reload()
  }, [navigate]);
  const checkAuth = useCallback(async () => {
   
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}auth/verify`, 
       { withCredentials:true,
      });
      if (!response || response.status !== 200) {
        throw new Error("Authentication failed");
      }
 
        setIsAuthenticated(true);
        setUser(response.data.data);
      
        sessionStorage.setItem('user', JSON.stringify(response.data.data));
         
       } catch  {
      setIsAuthenticated(false);
  setUser(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[logout]);

  const fetchActivity = useCallback( async()=>{
    if (!user?.id) {
      // console.warn('No user ID found, skipping fetchActivity');
      return;
    }
  
    try{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}ai/${user?.id}`, {
          credentials: 'include', 
        });
  
        if (!response.ok) {
           return
        }
       
        const data = await response.json();
        setActivity(data.data);
        sessionStorage.setItem('activity', JSON.stringify(data.data)); 
    }catch{
      console.error('Something went wrong while fetching data');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user?.id,logout])

  useEffect(() => {
    const cachedUser = sessionStorage.getItem('user');
    const cachedActivity = sessionStorage.getItem('activity');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      setIsAuthenticated(true);
    }

    if (cachedActivity) {
        setActivity(JSON.parse(cachedActivity));
    } else {
        fetchActivity(); 
        
    }
    if(isNew) {
      fetchActivity()
      setIsNew(false)
    }
    
    if(!isAuthenticated) checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAuth, fetchActivity,isNew]);

  return (
    <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated, user ,setUser,logout,checkAuth,activity,summaryInfo,setSummaryInfo, fetchActivity,isNew,setIsNew}}>
      {children}
    </AuthContext.Provider>
  );
};

