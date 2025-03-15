import {useForm} from '../hooks/formHooks';
import BaseBtn from './buttons/BaseBtn';

const RegisterForm = () => {
  const initialValues = {
    username: '',
    password: '',
    email: '',
  };

  const handleRegister = () => {
    // Handle login here
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    handleRegister,
    initialValues,
  );

  return (
    <form className='flex flex-col gap-4'>
      <h1 className='self-center text-h1 font-bold text-primary'>
        Create an account
      </h1>
      <input
        type='text'
        placeholder='Username'
        onChange={handleInputChange}
        name='username'
        className='rounded-md bg-primary p-2'
        autoComplete='off'
      />
      <input
        type='password'
        placeholder='Password'
        className='rounded-md bg-primary p-2'
        name='password'
        onChange={handleInputChange}
        autoComplete='off'
      />
      <input
        type='email'
        placeholder='Email'
        className='rounded-md bg-primary p-2'
        name='email'
        onChange={handleInputChange}
        autoComplete='off'
      />
      {/* Old Button */}
      {/* <button className='cursor-pointer rounded-md bg-gradient-to-r from-blueg1 to-blueg2 p-2 text-primary'>
        Register
      </button> */}

      {/* On Click is needed but this case form handles submit so leave it empty */}
      <BaseBtn className='w-full' onClick={() => {}} type='submit'>
        Register
      </BaseBtn>
    </form>
  );
};

export default RegisterForm;
