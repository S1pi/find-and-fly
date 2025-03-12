import {useForm} from '../hooks/formHooks';
import useAuth from '../hooks/useAuth';
import {Credentials} from '../types/UserTypes';

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
      <button className='cursor-pointer rounded-md bg-gradient-to-r from-blueg1 to-blueg2 p-2 text-primary'>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
