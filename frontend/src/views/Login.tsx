import {useState} from 'react';
import {IoClose} from 'react-icons/io5';
import {useNavigate} from 'react-router';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import BaseBtn from '../components/buttons/BaseBtn';

export const Login = () => {
  const [displayRegister, setDisplayRegister] = useState(false);
  const navigation = useNavigate();

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-4 bg-blue-100'>
      <div className='flex w-74 flex-col gap-4 rounded-md bg-secondary p-8 drop-shadow-2xl'>
        <button onClick={() => navigation('/')}>
          <IoClose className='h-8 w-8 cursor-pointer self-end text-primary' />
        </button>
        {displayRegister ? <RegisterForm /> : <LoginForm />}
        <BaseBtn className='w-full' onClick={toggleRegister}>
          {displayRegister
            ? 'Already have account? Login'
            : "Don't have an account? Register "}
        </BaseBtn>
      </div>
    </div>
  );
};

export default Login;
