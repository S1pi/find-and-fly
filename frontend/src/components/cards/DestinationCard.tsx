import {IoIosStar} from 'react-icons/io'; // Filled star icon
import {IoIosStarOutline} from 'react-icons/io'; // Empty star icon
import {BiDotsVerticalRounded} from 'react-icons/bi';
import {IoLocationSharp} from 'react-icons/io5';
import {MdReport} from 'react-icons/md';
import {DestinationWithFileData} from '../../types/DataTypes';

type DestinationCardProps = {
  destination: DestinationWithFileData;
  setSelectedItem: (destination: DestinationWithFileData) => void;
};

const DestinationCard = (props: DestinationCardProps) => {
  const {destination} = props;

  console.log(destination.file_url);
  return (
    // Basic container for a destination card
    <div className='h-74 w-44 overflow-hidden rounded-lg drop-shadow-lg'>
      {/* Container for image */}
      {/* <div className="flex h-3/4 flex-col justify-between rounded-t-lg bg-[url('/img/landscape-3846391_1280.jpg')] bg-cover bg-center px-2"> */}
      <div
        className={`flex h-3/4 flex-col justify-between rounded-t-lg bg-[url('${destination.file_url}')] bg-cover bg-center px-2`}
      >
        {/* Container for buttons */}
        <div className='flex h-10 w-full items-center justify-between'>
          <button className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-lightgrey drop-shadow-sm'>
            <BiDotsVerticalRounded className='p-0 text-h4' />
          </button>
          <div className='flex gap-1'>
            <button className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-lightgrey drop-shadow-sm'>
              <IoLocationSharp className='text-h4' />
            </button>
            <button className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-lightgrey drop-shadow-sm'>
              <MdReport className='text-h4' />
            </button>
          </div>
        </div>
        <div>
          <h3 className='text-h3 font-semibold text-primary drop-shadow-text'>
            Bali
          </h3>
          <p className='mb-2 text-base text-primary drop-shadow-text'>
            Base description of the place.
          </p>
        </div>
      </div>

      <div
        className='h-1/4 cursor-pointer rounded-b-lg bg-primary p-2'
        onClick={() => alert('Card clicked')}
      >
        <h3 className='text-h3 font-semibold text-secondary'>Bali</h3>
        {/* Change stars to generate depending on the rating */}
        <div id='starContainer' className='flex'>
          <IoIosStar className='text-h3 text-blue-btn' />
          <IoIosStar className='text-h3 text-blue-btn' />
          <IoIosStar className='text-h3 text-blue-btn' />
          <IoIosStar className='text-h3 text-blue-btn' />
          <IoIosStarOutline className='text-h3 text-secondary' />
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;

// In the code above, I have created a simple card component that displays an image and some text. I have used Tailwind CSS classes to style the card.
// Now, let’s add this card to the  DestinationList  component.
