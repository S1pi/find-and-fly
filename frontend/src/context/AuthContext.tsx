import {createContext, useEffect, useState} from 'react';
import {AuthContextType, Credentials} from '../types/UserTypes';
import {UserWithoutPassword} from '../types/DataTypes';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useLocation, useNavigate} from 'react-router';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const [loading, setLoading] = useState(true);

  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigation = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials: Credentials) => {
    try {
      const response = await postLogin(credentials);
      if (response) {
        localStorage.setItem('token', response.token);
      }

      setUser(response.user);
      navigation('/');
    } catch (err) {
      // Temporary error handling
      alert("Credentials don't match");
      console.error((err as Error).message);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigation('/login');
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  const handleAutoLogin = async () => {
    const token = localStorage.getItem('token');
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      if (location.pathname === '/login' || location.pathname === '/register') {
        navigation('/');
        return;
      }

      const userResponse = await getUserByToken(token);

      setUser(userResponse.userData);
      // console.log('Auto login: userResponse', userResponse);

      if (location.state?.from) {
        const currentLocation = location.state?.from?.pathname || '/';
        navigation(currentLocation);
      }
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{user, loading, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
