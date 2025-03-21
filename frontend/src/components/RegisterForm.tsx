import {useAuthentication} from '../hooks/apiHooks';
import {useForm} from '../hooks/formHooks';
import useAuth from '../hooks/useAuth';
import {Credentials} from '../types/UserTypes';
import BaseBtn from './buttons/BaseBtn';

const RegisterForm = () => {
  const {postRegister} = useAuthentication();
  const {handleLogin} = useAuth();

  const initialValues = {
    username: '',
    password: '',
    email: '',
  };

  const handleRegister = async () => {
    // Handle login here
    try {
      const successMessage = await postRegister(
        inputs as Credentials & {email: string},
      );

      if (successMessage === 'User created successfully') {
        handleLogin(inputs as Credentials);
      }
    } catch (err) {
      const errMessage = (err as Error).message;
      if (errMessage.includes('Invalid email')) {
        alert('Invalid email format');
      }

      if (
        errMessage.includes(
          'Password must contain at least one uppercase letter',
        )
      ) {
        alert('Password must contain at least one uppercase letter');
      }

      console.log('Register failed');
      console.error(err);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    handleRegister,
    initialValues,
  );

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <h1 className='self-center text-h1 font-bold text-primary'>
        Create an account
      </h1>
      <input
        type='text'
        placeholder='Username'
        minLength={3}
        onChange={handleInputChange}
        name='username'
        className='rounded-md bg-primary p-2'
        autoComplete='off'
      />
      <input
        type='password'
        placeholder='Password'
        minLength={6}
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

      {/* On Click is needed but this case form handles submit so leave it empty */}
      <BaseBtn className='w-full' onClick={() => {}} type='submit'>
        Register
      </BaseBtn>
    </form>
  );
};

export default RegisterForm;
