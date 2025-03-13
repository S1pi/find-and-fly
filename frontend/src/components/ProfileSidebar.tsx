import BaseBtn from './buttons/BaseBtn';
import {FaUserCog} from 'react-icons/fa';
import {IoIosStar} from 'react-icons/io'; // Filled star icon
import {useNavigate} from 'react-router';

const ProfileSidebar = () => {
  const navigation = useNavigate();

  return (
    <div className='absolute ml-sidebarMargin flex h-screenWithoutHeader w-sidebar flex-col shadow-sidebar'>
      <div className='relative flex-2 bg-[url("/img/depositphotos_53489917-stock-photo-vertical-landscape-view-of-mountain.jpg")] bg-cover bg-center'>
        <div className='absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/3 rounded-full border-6 border-lightgrey bg-[url("/img/pexels-souvenirpixels-414612.jpg")] bg-cover bg-center shadow-2xl'></div>
      </div>
      <div className='flex-1 bg-lightgrey pt-20 pr-4 pl-4'>
        <div className='mb-0.5 flex justify-between pl-4'>
          <h2 className='font-bold text-gold-accent'>Profile</h2>
          <FaUserCog className='mb-0.5 cursor-pointer self-center text-3xl text-secondary' />
        </div>
        <div className='pl-4'>
          <h6 className='mb-3 font-bold'>Jokin otsikko itsestään</h6>
          <p className='font-mono text-sm'>
            Jotain selitystä itsestään jossa voidaan kertoa vaikka omista
            matkoista jne. käyttäjä kirjoittaa
          </p>
        </div>
        <div className='mt-12 mb-2 flex space-x-2'>
          <BaseBtn
            className='!px-0 text-button drop-shadow-md'
            onClick={() => navigation('/review/add')}
          >
            Add Review
          </BaseBtn>
          <BaseBtn
            className='flex justify-center !px-0 text-button drop-shadow-md'
            onClick={() => {}}
          >
            Reviews
            <IoIosStar className='ml-1 text-h4 text-gold-accent' />
          </BaseBtn>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
