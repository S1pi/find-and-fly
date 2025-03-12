import {useState} from 'react';
import DestinationCard from '../components/cards/DestinationCard';
import SortCard from '../components/cards/SortCard';
import Header from '../components/Header';
import ProfileSidebar from '../components/ProfileSidebar';
import {useDestinations} from '../hooks/apiHooks';
import {DestinationWithFileData} from '../types/DataTypes';

const Home = () => {
  const {destinations} = useDestinations();
  const [selectedItem, setSelectedItem] = useState<
    DestinationWithFileData | undefined
  >(undefined);

  return (
    <>
      <Header />
      <div className='relative flex h-screenWithoutHeader flex-col'>
        <ProfileSidebar />
        <div className='min-h-80 flex-1 bg-[url(/img/parisbg.jpg)] bg-cover bg-bottom'></div>
        <div className='h-fit flex-2 bg-gradient-to-br from-primary to-lightblue pt-2 pl-afterSidebar'>
          <div id='sortSection' className='flex space-x-4'>
            <div className='flex flex-col'>
              <h3 className='font-bold text-secondary'>DESTINATIONS</h3>
              <div className='mt-2 flex h-10 w-54 items-center justify-center rounded-lg bg-gradient-to-r from-blue-btn via-blueg1 via-55% to-blueg2 text-primary'>
                Search by category
              </div>
            </div>
            <div
              id='sortcardSection'
              className='scrollbar-hide flex space-x-6 overflow-x-auto p-2'
            >
              <SortCard text='Beach'>
                <img
                  src='/beach.svg'
                  alt='waves svg icon'
                  className='h-[20px] w-[20px]'
                />
              </SortCard>
              <SortCard text='Beach'>
                <img
                  src='/beach.svg'
                  alt='waves svg icon'
                  className='h-[20px] w-[20px]'
                />
              </SortCard>
              <SortCard text='Beach'>
                <img
                  src='/beach.svg'
                  alt='waves svg icon'
                  className='h-[20px] w-[20px]'
                />
              </SortCard>
              <SortCard text='Beach'>
                <img
                  src='/beach.svg'
                  alt='waves svg icon'
                  className='h-[20px] w-[20px]'
                />
              </SortCard>
              <SortCard text='Beach'>
                <img
                  src='/beach.svg'
                  alt='waves svg icon'
                  className='h-[20px] w-[20px]'
                />
              </SortCard>
            </div>
          </div>
          <div id='destinationSection' className='flex flex-col items-center'>
            <h4 className='ml-2'>Destinations</h4>
            {/* <div className='h-[3px] w-full bg-amber-950'></div> */}
            {/* h-[530px] */}
            <div className='scrollbar-hide m-auto mt-4 flex flex-wrap justify-evenly gap-4'>
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

export default Home;
