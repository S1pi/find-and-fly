import Header from './components/Header';
import ProfileSidebar from './components/ProfileSidebar';

function App() {
  return (
    <>
      <div className='h-screen bg-gradient-to-br from-primary to-lightblue'>
        <Header />
        <ProfileSidebar />
        {/* <DestinationCard /> */}
      </div>
    </>
  );
}

export default App;
