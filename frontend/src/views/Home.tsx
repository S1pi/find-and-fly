import SortCard from '../components/cards/SortCard';
import Header from '../components/Header';

const Home = () => {
  return (
    <>
      <Header />
      <div className='flex h-screenWithoutHeader items-center justify-center bg-gradient-to-br from-primary to-lightblue'>
        {/* <ProfileSidebar /> */}
        <SortCard text='Beach'>
          <img src='/beach.svg' alt='waves svg icon' className='h-4 w-6' />
        </SortCard>
      </div>
    </>
  );
};

export default Home;
