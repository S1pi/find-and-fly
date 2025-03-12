import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const {user, handleLogout} = useAuth();

  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center gap-4 bg-blue-100'>
        <h1>Profile</h1>
        <div className='flex flex-col gap-4 rounded-md bg-secondary p-8'>
          <h2 className='text-primary'>Username: </h2>

          <button
            onClick={handleLogout}
            className='cursor-pointer rounded bg-gradient-to-r from-blueg1 to-blueg2 p-2 text-primary'
          >
            LOG OUT
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
