import {AuthProvider} from './context/AuthContext';
import Home from './views/Home';
import Login from './views/Login';
import '@smastrom/react-rating/style.css';
import {BrowserRouter, Route, Routes} from 'react-router';

function App() {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
