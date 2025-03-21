import {useEffect, useState} from 'react';
import BaseBtn from './buttons/BaseBtn';
import {MdOutlineLanguage} from 'react-icons/md';
import {FaStar} from 'react-icons/fa';
import {GiHamburgerMenu} from 'react-icons/gi';
import {IoMdClose} from 'react-icons/io';
import useHamburgerMenu from '../hooks/useHamburgerMenu';
import {useNavigate} from 'react-router';
import useAuth from '../hooks/useAuth';

const Header = () => {
  // const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const {user, handleAutoLogin} = useAuth();
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const {isOpen, toggleMenu} = useHamburgerMenu();
  const navigation = useNavigate();
  // md = 768px muuttuu isSmallScreenksi

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width <= 768) {
      // console.log('isSmallScreen');
      setIsSmallScreen(true);
    } else {
      // console.log('isDesktop');
      setIsSmallScreen(false);
    }
  }, [width]);

  useEffect(() => {
    if (!user) {
      handleAutoLogin();
    }
  }, []);

  return (
    <div className='relative z-500000000 flex h-22 w-full items-center justify-center bg-primary px-2 drop-shadow-md'>
      <img
        src='https://users.metropolia.fi/~miikavs/Find-And-Fly/img/FindAndFlyLogo.png'
        alt='Find&Fly Logo'
        className='absolute left-4 h-3/5 cursor-pointer rounded-2xl md:h-3/4'
        onClick={() => navigation('/')}
      />
      <h1 className='text-base font-bold text-gray-800 sm:text-h4 lg:text-h3'>
        {width < 600
          ? 'Explore & Review'
          : 'Explore, review and fly to your dream spots'}
      </h1>
      {isSmallScreen ? (
        <>
          <GiHamburgerMenu
            className='absolute right-2 cursor-pointer text-2xl'
            onClick={toggleMenu}
          />
          {isOpen ? (
            <div className='border-pink absolute top-0 right-0 z-9999 h-screen w-2/5 rounded-l-lg border-l-1 border-solid border-l-primary bg-secondary p-2 drop-shadow-hamburger'>
              <IoMdClose
                className='cursor-pointer rounded-sm border border-solid text-3xl'
                onClick={toggleMenu}
              />
              <ul className='flex flex-col items-center justify-center'>
                <li className='text-h3'>Home</li>
                <li className='text-h3'>About</li>
                <li className='text-h3'>Contact</li>
              </ul>
            </div>
          ) : null}
        </>
      ) : (
        <>
          {user ? (
            <BaseBtn
              className='absolute right-2 smd:right-14 lg:right-26'
              onClick={() => {
                navigation('/profile');
              }}
            >
              Profile
            </BaseBtn>
          ) : (
            <BaseBtn
              className='absolute right-2 smd:right-14 lg:right-26'
              onClick={() => {
                navigation('/login');
              }}
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
