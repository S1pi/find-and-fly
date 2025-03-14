import {useForm} from '../hooks/formHooks';
import useAuth from '../hooks/useAuth';
import {Credentials} from '../types/UserTypes';
import BaseBtn from './buttons/BaseBtn';

const LoginForm = () => {
  const {handleLogin} = useAuth();

  const initialValues = {
    username: '',
    password: '',
  };

  const handleFormLogin = () => {
    try {
      handleLogin(inputs as Credentials);
    } catch (error) {
      console.log('Login failed');
      alert('Login failed');
      console.error(error);
    }

    // Handle login here
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    handleFormLogin,
    initialValues,
  );

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <h1 className='self-center text-h1 font-bold text-primary'>
        Login to your account
      </h1>
      <input
        name='username'
        type='text'
        placeholder='Username'
        onChange={handleInputChange}
        className='rounded-md bg-primary p-2'
        autoComplete='username'
      />
      <input
        type='password'
        placeholder='Password'
        className='rounded-md bg-primary p-2'
        name='password'
        onChange={handleInputChange}
        autoComplete='current-password'
      />
      {/* Old button */}
      {/* <button className='cursor-pointer rounded-md bg-gradient-to-r from-blueg1 to-blueg2 p-2 text-primary'>
        Login
      </button> */}

      {/* On Click is needed but this case form handles submit so leave it empty */}
      <BaseBtn className='w-full' onClick={() => {}}>
        Login
      </BaseBtn>
    </form>
  );
};

export default LoginForm;
