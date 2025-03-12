import {useState} from 'react';
import {IoClose} from 'react-icons/io5';
import {useNavigate} from 'react-router';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export const Login = () => {
  const [displayRegister, setDisplayRegister] = useState(false);
  const navigation = useNavigate();

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-4 bg-blue-100'>
      <div className='flex w-74 flex-col gap-4 rounded-md bg-secondary p-8'>
        <button onClick={() => navigation('/')}>
          <IoClose className='h-8 w-8 cursor-pointer self-end text-primary' />
        </button>
        {displayRegister ? <RegisterForm /> : <LoginForm />}
        <button
          className='cursor-pointer rounded-md bg-gradient-to-r from-blueg1 to-blueg2 p-2 text-primary'
          onClick={toggleRegister}
        >
          {displayRegister
            ? 'Already have account? Login'
            : "Don't have an account? Register "}
        </button>
      </div>
    </div>
  );
};

export default Login;
