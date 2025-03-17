import {useLocation, useNavigate} from 'react-router-dom';
import BaseBtn from '../components/buttons/BaseBtn';
import Header from '../components/Header';
import {MdLocationOn} from 'react-icons/md';
import {useEffect} from 'react';
import {DestinationDataWithRating} from '../types/DataTypes';
import {Rating, ThinRoundedStar} from '@smastrom/react-rating';
import {useReviews} from '../hooks/apiHooks';
import ReviewCard from '../components/cards/ReviewCard';

const Destination = () => {
  const {reviews, getReviewsByDestId} = useReviews();

  const location = useLocation();
  const navigate = useNavigate();
  const destinationFromCard: DestinationDataWithRating =
    location.state?.destination;

  // console.log(destinationFromCard);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!destinationFromCard) {
      console.log('No destination found');
      navigate('/404');
    }

    getReviewsByDestId(destinationFromCard.id);

    console.log('Destination reviews: ', reviews);
  }, [destinationFromCard, navigate]);

  if (!destinationFromCard) {
    return null;
  }

  return (
    <>
      <Header />
      <div className='relative flex min-h-screenWithoutHeader flex-col'>
        <div className='flex min-h-[40vh] justify-end bg-[url(/img/reviewbg.png)] bg-cover bg-center p-10'>
          {/* // wrapper */}
          <div className='bg-opacity-50 flex flex-col items-center gap-6'>
            <div className='flex flex-col items-center justify-center'>
              <div className='flex items-center justify-center gap-4'>
                <h1 className='text-4xl font-bold text-white drop-shadow-custom'>
                  {destinationFromCard.name}
                </h1>
                <div className='rating-wrapper'>
                  <Rating
                    style={{
                      maxWidth: 200,
                      textShadow: '1px 1px 1px #000',
                      fontSize: '1.5rem',
                    }}
                    value={destinationFromCard.average_rating}
                    itemStyles={{
                      itemShapes: ThinRoundedStar,
                      activeFillColor: '#f5b942',
                      activeStrokeColor: '#1a2e40',
                      inactiveFillColor: '#f5f7fa',
                    }}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className='max-w-96 text-center drop-shadow-custom'>
              {destinationFromCard.description}
            </div>

            {/* // Home and location buttons */}

            <div className='flex items-center justify-center gap-10'>
              <BaseBtn
                onClick={() => navigate('/')}
                className='flex-1 items-center justify-center gap-1 px-4 py-2'
              >
                Home
              </BaseBtn>
              <BaseBtn
                onClick={() => window.open('https://www.google.fi/maps')}
                className='flex h-full w-full flex-1 items-center justify-center gap-1 px-4 py-2'
              >
                Location
                <MdLocationOn className='text-h3' />
              </BaseBtn>
            </div>

            {/* Review section */}
            <div className='flex flex-col items-center justify-center gap-4 text-center'>
              <h6 className='text-lightgrey drop-shadow-custom'>
                Have you visited this city? <br />
                Share your experience with others!
              </h6>
              <BaseBtn
                onClick={() => navigate('/review')}
                className='flex w-1/2! items-center justify-center gap-1 px-4 py-2'
              >
                Add review
              </BaseBtn>
            </div>
          </div>
        </div>

        <div className='flex w-full flex-1 flex-col bg-gradient-to-br from-primary to-lightblue py-4 shadow-containerTop sm:flex-row'>
          {/* City reviews section */}
          <div className='container px-2 text-center md:px-8 lg:px-4 xl:px-8 2xl:px-24 3xl:px-4'>
            <h2 className='font-bold text-secondary'>City Reviews</h2>
            {/* Card container */}

            {reviews.length === 0 && (
              <div className='flex h-96 items-center justify-center'>
                <h3>No reviews yet be first to review</h3>
              </div>
            )}
            <div className='grid grid-cols-1 justify-items-center gap-4 py-4 lg:grid-cols-2 lg:gap-4 xl:gap-6 3xl:grid-cols-3'>
              {/* TODO: Add reviews as card components */}
              {reviews.map((review) => (
                // <ReviewCard key={review.id} review={review} />
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
          {/* // Divider line */}
          <div className='my-4 h-1 w-full rounded-full bg-secondary sm:mx-6 sm:h-screen sm:w-1'></div>
          {/* Explore Attractions section */}
          <div className='container px-2 text-center md:px-4 lg:px-12 xl:px-8 2xl:px-24 3xl:px-4'>
            <h2 className='font-bold text-secondary'>Explore Attractions</h2>
            {/* Card container */}
            <div className='grid grid-cols-1 justify-items-center gap-4 py-4 smd:grid-cols-2 lg:gap-x-6 lg:gap-y-10 xl:grid-cols-3 xl:gap-6 3xl:grid-cols-4'>
              <div className='flex h-60 w-full max-w-54 items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
                Kortti 1
              </div>
              <div className='flex h-60 w-full max-w-54 items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
                Kortti 1
              </div>
              <div className='flex h-60 w-full max-w-54 items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
                Kortti 1
              </div>
              <div className='flex h-60 w-full max-w-54 items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
                Kortti 1
              </div>
              <div className='flex h-60 w-full max-w-54 items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
                Kortti 1
              </div>
              <div className='flex h-60 w-full max-w-54 items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
                Kortti 1
              </div>
              <div className='flex h-60 w-full max-w-54 items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
                Kortti 1
              </div>
              <div className='flex h-60 w-full max-w-54 items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
                Kortti 1
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Destination;
