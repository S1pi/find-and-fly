import {useEffect, useState} from 'react';
import {useDestinations} from '../hooks/apiHooks';
import {DestinationDataWithRating} from '../types/DataTypes';
import Header from '../components/Header';
import DestinationCard from '../components/cards/DestinationCard';
import AddDestinationModal from '../components/modals/AddDestinationModal';
import BaseBtn from '../components/buttons/BaseBtn';
import {MdAddLocation} from 'react-icons/md';

// Check if need to import DestinationDataWithRating instead of DestinationWithFileData

const ReviewAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {destinations} = useDestinations();
  const [selectedItem, setSelectedItem] = useState<
    DestinationDataWithRating | undefined
  >(undefined);

  return (
    <>
      <Header />
      <div className='flex h-full flex-col bg-gradient-to-br from-primary to-lightblue'>
        <div
          className='flex min-h-[50vh] flex-col items-center justify-center gap-8 bg-cover bg-center bg-no-repeat lg:min-h-[60vh]'
          style={{backgroundImage: 'url(/img/reviewbg.png)'}}
        >
          <h1 className='max-w-2/5 text-center text-h4 font-bold text-primary drop-shadow-text sm:text-h3 lg:text-h1'>
            Review Your Favorite Destinations Or Bad Experiences
          </h1>
          <div className='flex flex-col items-center justify-center gap-2 rounded-2xl bg-secondary px-8 py-4 text-primary shadow-custom'>
            <h3>Don't find your destination?</h3>
            <div className='flex w-full items-center justify-center'>
              <h4 className='w-full'>Add it here: </h4>
              <BaseBtn
                className='justify- my-0 flex w-full items-center justify-evenly'
                onClick={() => setIsModalOpen(true)}
              >
                <MdAddLocation className='text-h4' />
                Add Destination
              </BaseBtn>
              {isModalOpen && (
                <AddDestinationModal onClose={() => setIsModalOpen(false)} />
              )}
            </div>
          </div>
        </div>

        {/* Destination card selection container */}
        <div className='container m-auto h-full py-8'>
          <div className='flex flex-col items-center space-x-4'>
            <h2 className='text-h2 font-bold text-secondary drop-shadow-test'>
              Choose a Destination to Review
            </h2>
            <div className='scrollbar-hide flex flex-wrap justify-center gap-6 overflow-x-auto p-2'>
              {destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  setSelectedItem={setSelectedItem}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewAdd;
