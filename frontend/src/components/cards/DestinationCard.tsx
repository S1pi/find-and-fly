import {IoIosStar} from 'react-icons/io'; // Filled star icon
import {IoIosStarOutline} from 'react-icons/io'; // Empty star icon
import {BiDotsVerticalRounded} from 'react-icons/bi';
import {IoLocationSharp} from 'react-icons/io5';
import {MdReport} from 'react-icons/md';

const DestinationCard =
  () => {
    return (
      // Basic container for a destination card
      <div className="h-74 w-44 drop-shadow-lg rounded-lg overflow-hidden">
        {/* Container for image */}
        <div className="bg-[url('/img/landscape-3846391_1280.jpg')] bg-cover bg-center rounded-t-lg h-3/4 px-2 flex flex-col justify-between">
          {/* Container for buttons */}
          <div className="flex h-10 w-full justify-between items-center">
            <button className="rounded-full bg-lightgrey w-6 h-6 flex justify-center items-center drop-shadow-sm cursor-pointer">
              <BiDotsVerticalRounded className="text-h4 p-0" />
            </button>
            <div className="flex gap-1">
              <button className="rounded-full bg-lightgrey w-6 h-6 flex justify-center items-center drop-shadow-sm cursor-pointer">
                <IoLocationSharp className="text-h4" />
              </button>
              <button className="rounded-full bg-lightgrey w-6 h-6 flex justify-center items-center drop-shadow-sm cursor-pointer">
                <MdReport className="text-h4" />
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-h3 font-semibold text-primary drop-shadow-text">
              Bali
            </h3>
            <p className="text-base mb-2 text-primary drop-shadow-text">
              Base
              description
              of the
              place.
            </p>
          </div>
        </div>

        <div
          className="h-1/4 bg-primary rounded-b-lg p-2 cursor-pointer"
          onClick={() =>
            alert(
              'Card clicked',
            )
          }
        >
          <h3 className="text-h3 text-secondary font-semibold">
            Bali
          </h3>
          {/* Change stars to generate depending on the rating */}
          <div
            id="starContainer"
            className="flex"
          >
            <IoIosStar className="text-h3 text-blue-btn" />
            <IoIosStar className="text-h3 text-blue-btn" />
            <IoIosStar className="text-h3 text-blue-btn" />
            <IoIosStar className="text-h3 text-blue-btn" />
            <IoIosStarOutline className="text-h3 text-secondary" />
          </div>
        </div>
      </div>
    );
  };

export default DestinationCard;

// In the code above, I have created a simple card component that displays an image and some text. I have used Tailwind CSS classes to style the card.
// Now, let’s add this card to the  DestinationList  component.
