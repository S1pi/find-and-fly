import SortCard from '../components/cards/SortCard';
import Header from '../components/Header';
import ProfileSidebar from '../components/ProfileSidebar';

const Home = () => {
  return (
    <>
      <Header />
      <div className='relative flex h-screenWithoutHeader flex-col'>
        <ProfileSidebar />
        <div className='min-h-80 flex-1 bg-[url(/img/parisbg.jpg)] bg-cover bg-bottom'></div>
        <div className='flex-2 bg-gradient-to-br from-primary to-lightblue pt-2 pl-78'>
          <div id='sortSection'>
            <div className='flex flex-col'>
              <h3>DESTINATIONS</h3>
              <div className='flex h-10 w-54 items-center justify-center rounded-lg bg-blue-btn'>
                Search by category
              </div>
            </div>
            <div id='sortcardSection'></div>
          </div>
          <div id='destinationSection'></div>
          {/* <SortCard text='Beach'>
          <img
            src='/beach.svg'
            alt='waves svg icon'
            className='h-[20px] w-[20px]'
          />
        </SortCard> */}
        </div>
      </div>
    </>
  );
};

export default Home;
