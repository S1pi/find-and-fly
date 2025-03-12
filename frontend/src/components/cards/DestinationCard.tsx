// import {IoIosStar} from 'react-icons/io'; // Filled star icon
// import {IoIosStarOutline} from 'react-icons/io'; // Empty star icon
import {BiDotsVerticalRounded} from 'react-icons/bi';
import {IoLocationSharp} from 'react-icons/io5';
import {MdReport} from 'react-icons/md';
import {DestinationDataWithRating} from '../../types/DataTypes';
import {Rating, ThinRoundedStar} from '@smastrom/react-rating';

type DestinationCardProps = {
  destination: DestinationDataWithRating;
  setSelectedItem: (destination: DestinationDataWithRating) => void;
};

const DestinationCard = (props: DestinationCardProps) => {
  const {destination} = props;

  console.log(typeof destination.average_rating);
  return (
    // Basic container for a destination card
    <div className='h-74 w-44 overflow-hidden rounded-lg drop-shadow-lg'>
      {/* Container for image */}
      {/* <div className="flex h-3/4 flex-col justify-between rounded-t-lg bg-[url('/img/landscape-3846391_1280.jpg')] bg-cover bg-center px-2"> */}
      <div
        className={`flex h-3/4 w-full flex-col justify-between rounded-t-lg bg-cover bg-center px-2`}
        style={{
          backgroundImage: `url(${destination.file_url})`, // Image URL
        }}
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
          <h3 className='text-h3 font-semibold text-gold-accent drop-shadow-text'>
            {destination.name}
          </h3>
          <p className='mb-2 text-base text-primary drop-shadow-text'>
            {destination.description}
          </p>
        </div>
      </div>

      <div
        className='h-1/4 cursor-pointer rounded-b-lg bg-primary p-2'
        onClick={() => alert('Card clicked')}
      >
        <h3 className='text-h3 font-semibold text-secondary'>
          {destination.country}
        </h3>
        {/* Change stars to generate depending on the rating */}
        <div id='starContainer' className='flex'>
          <Rating
            style={{maxWidth: 150, marginBottom: 10}}
            value={destination.average_rating}
            itemStyles={{
              itemShapes: ThinRoundedStar,
              activeFillColor: '#38a2bc',
              activeStrokeColor: '#1a2e40',
              inactiveFillColor: '#b1cac9',
            }}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;

// In the code above, I have created a simple card component that displays an image and some text. I have used Tailwind CSS classes to style the card.
// Now, let’s add this card to the  DestinationList  component.
