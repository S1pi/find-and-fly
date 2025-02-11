import {useState} from 'react';
import BaseBtn from './buttons/BaseBtn';
import {MdOutlineLanguage} from 'react-icons/md';
import {FaStar} from 'react-icons/fa';
import {GiHamburgerMenu} from 'react-icons/gi';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // md = 768px muuttuu isMobileksi

  return (
    <div className='relative flex h-22 w-full items-center justify-center bg-primary px-2'>
      <img
        src='/img/FindAndFlyLogo.png'
        alt='Find&Fly Logo'
        className='w- absolute left-4 h-3/4 rounded-2xl'
      />
      <h1 className='text-h5 font-bold text-gray-800 sm:text-h4 lg:text-h3 xl:text-h2'>
        Explore, review and fly to your dream spots
      </h1>
      {isMobile ? (
        <>
          <GiHamburgerMenu className='text-2xl' />
        </>
      ) : (
        <>
          {loggedIn ? (
            <BaseBtn
              className='absolute right-2 smd:right-14 lg:right-26'
              evtHanlder={() => {}}
            >
              Profile
            </BaseBtn>
          ) : (
            <BaseBtn
              className='absolute right-2 smd:right-14 lg:right-26'
              evtHanlder={() => {}}
            >
              Login
            </BaseBtn>
          )}

          <button className='absolute right-2 hidden rounded-full border-1 border-secondary p-1 smd:block lg:right-14'>
            <MdOutlineLanguage className='text-h1 text-secondary' />
          </button>
          <button className='absolute right-2 hidden rounded-full border-1 border-secondary p-1 lg:block'>
            <FaStar className='text-h1 text-secondary' />
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
