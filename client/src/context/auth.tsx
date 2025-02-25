import axios from 'axios';
import React, { createContext, useEffect, useState, ReactNode, useCallback, SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
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
      const response = await axios.get('http://localhost:4000/auth/verify', 
       { withCredentials:true,
      });
      if (!response || response.status !== 200) {
        throw new Error("Authentication failed");
      }
        setIsAuthenticated(true);
        setUser(response.data);
      
        sessionStorage.setItem('user', JSON.stringify(response.data.data));
         
       } catch (error) {
      console.error('Auth check error:', error);
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
    const response = await fetch(`http://localhost:4000/ai/${user?.id}`, {
          credentials: 'include', 
        });
  
        if (!response.ok) {
           return
        }
       
        const data = await response.json();
        setActivity(data.data);
        sessionStorage.setItem('activity', JSON.stringify(data.data)); 
    }catch(error){
      console.error('Error is:',error)
   
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
    <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated, user ,logout,checkAuth,activity,summaryInfo,setSummaryInfo, fetchActivity,isNew,setIsNew}}>
      {children}
    </AuthContext.Provider>
  );
};

