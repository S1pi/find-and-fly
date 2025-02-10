import {useState} from 'react';
import BaseBtn from './buttons/BaseBtn';
import {MdOutlineLanguage} from 'react-icons/md';
import {FaStar} from 'react-icons/fa';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <div className='flex justify-center items-center w-full h-22 px-2 bg-primary relative'>
      <img
        src='/img/FindAndFlyLogo.png'
        alt='Find&Fly Logo'
        className='w- h-3/4 rounded-2xl absolute left-4'
      />
      <h1 className='xl:text-h2 lg:text-h3 sm:text-h4 font-bold text-gray-800'>
        Explore, review and fly to your dream spots
      </h1>
      {loggedIn ? (
        <BaseBtn className='absolute right-20'>Profile</BaseBtn>
      ) : (
        <BaseBtn className='absolute right-26'>Login</BaseBtn>
      )}
      <button className='rounded-full border-1 border-secondary p-1 absolute right-14'>
        <MdOutlineLanguage className='text-secondary text-h1' />
      </button>
      <button className='rounded-full border-1 border-secondary p-1 absolute right-2'>
        <FaStar className='text-secondary text-h1' />
      </button>
    </div>
  );
};

export default Header;
