import BaseBtn from './buttons/BaseBtn';
import {FaUserCog} from 'react-icons/fa';
import {IoIosStar} from 'react-icons/io'; // Filled star icon

const ProfileSidebar = () => {
  return (
    <div className='relative ml-[2vw] flex h-screenWithoutHeader w-68 flex-col'>
      <div className='h-4/7 bg-[url("/img/depositphotos_53489917-stock-photo-vertical-landscape-view-of-mountain.jpg")] bg-cover bg-center'></div>
      <div className='absolute top-[calc(4/7*100%)] left-1/2 h-50 w-50 translate-x-[-50%] translate-y-[-50%] rounded-full border-6 border-lightgrey bg-[url("/img/pexels-souvenirpixels-414612.jpg")] bg-cover bg-center shadow-2xl'></div>
      <div className='h-3/7 bg-lightgrey pt-28 pr-4 pl-8'>
        <div className='mb-0.5 flex justify-between'>
          <h2 className='font-bold text-gold-accent'>Profile</h2>
          {/* Just a mockbutton switch to icon one */}
          <FaUserCog className='mb-0.5 cursor-pointer self-center text-3xl text-secondary' />
        </div>
        <div>
          <h6 className='mb-3 font-bold'>Jokin otsikko itsestään</h6>
          <p className='font-mono text-sm'>
            Jotain selitystä itsestään jossa voidaan kertoa vaikka omista
            matkoista jne. käyttäjä kirjoittaa
          </p>
        </div>
        <div className='mt-4 flex space-x-2'>
          <BaseBtn className='!px-0 text-button' onClick={() => {}}>
            Add Review
          </BaseBtn>
          <BaseBtn className='flex !px-2 text-button' onClick={() => {}}>
            Reviews
            <IoIosStar className='ml-1 text-h4 text-gold-accent' />
          </BaseBtn>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
