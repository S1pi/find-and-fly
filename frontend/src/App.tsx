import {AuthProvider} from './context/AuthContext';
import Home from './views/Home';
import Login from './views/Login';
import '@smastrom/react-rating/style.css';
import {BrowserRouter, Route, Routes} from 'react-router';
import Profile from './views/Profile';
import ReviewAdd from './views/ReviewAdd';

function App() {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/review/add' element={<ReviewAdd />} />
            <Route path='*' element={<div>404</div>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
