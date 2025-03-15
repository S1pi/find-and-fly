import {AuthProvider} from './context/AuthContext';
import Home from './views/Home';
import Login from './views/Login';
import '@smastrom/react-rating/style.css';
import {BrowserRouter, Route, Routes} from 'react-router';
import Profile from './views/Profile';
import ReviewAdd from './views/ReviewAdd';
import Destination from './views/Destination';

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
            {/* //This is the correct path for the destination page. For the sake of
            the test, I will use only /destination */}
            {/* <Route path='/destination/:id' element={<div>Destination</div>} /> */}
            <Route path='/destination' element={<Destination />} />
            <Route path='*' element={<div>404</div>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
