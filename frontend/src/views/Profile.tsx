import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const {user, handleLogout} = useAuth();

  if (!user) {
    return null;
  }

  const date = new Date(user.created_at);
  const formattedDate = date.toLocaleDateString('fi-FI');
  // const formattedTime = date.toLocaleTimeString('fi-FI', {
  //   hour: '2-digit',
  //   minute: '2-digit',
  // });

  return (
    <>
      <Header />
      <div className='flex h-screenWithoutHeader flex-col items-center justify-center gap-4 bg-blue-100 p-8'>
        <h1>Profile</h1>
        <div className='flex flex-col gap-4 rounded-md bg-secondary p-8'>
          <h2 className='text-primary'>Username: {user.username}</h2>
          <h3 className='text-primary'>Email: {user.email}</h3>
          <h4 className='text-primary'>Role: {user.role}</h4>
          <h5 className='text-primary'>Member since: {formattedDate}</h5>
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
