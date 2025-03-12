import {createContext, useState} from 'react';
import {AuthContextType, Credentials} from '../types/UserTypes';
import {UserWithoutPassword} from '../types/DataTypes';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useLocation, useNavigate, useNavigation} from 'react-router';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
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
        return;
      }

      if (location.pathname === '/login' || location.pathname === '/register') {
        return;
      }

      const userResponse = await getUserByToken(token);

      setUser(userResponse.userData);
      console.log('Auto login: userResponse', userResponse);

      const currentLocation = location.state.from.pathname || '/';
      navigation(currentLocation);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <AuthContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
