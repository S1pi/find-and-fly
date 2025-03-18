import {AuthProvider} from './context/AuthContext';
import Home from './views/Home';
import Login from './views/Login';
import '@smastrom/react-rating/style.css';
import {BrowserRouter, Route, Routes} from 'react-router';
import Profile from './views/Profile';
import ReviewAdd from './views/ReviewAdd';
import Destination from './views/Destination';
import ProtectedRoute from './components/ProtectedRoute';
import ReviewCreation from './views/ReviewCreation';

function App() {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/review/add'
              element={
                <ProtectedRoute>
                  <ReviewAdd />
                </ProtectedRoute>
              }
            />
            <Route path='/destination/:name' element={<Destination />} />
            <Route path='/review/:name' element={<ReviewCreation />} />
            <Route path='*' element={<div>404</div>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
