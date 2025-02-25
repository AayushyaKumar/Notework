import { useEffect} from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../hooks/useAuth';

export const ProtectedRoute: React.FC = () => {
    const {isAuthenticated } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
          navigate('/login', { state: { from: location }, replace: true });
        }
      }, [isAuthenticated, location, navigate]);
    

    return isAuthenticated?<Outlet/>:null
  };