import {useLocation, useNavigate} from 'react-router';
import {DestinationDataWithRating} from '../types/DataTypes';
import BaseBtn from '../components/buttons/BaseBtn';
import {IoCaretBackOutline} from 'react-icons/io5';
import {IoMdHome} from 'react-icons/io';
import {useState} from 'react';
import DestinationReview from '../components/DestinationReview';
import AttractionReview from '../components/AttractionReview';

const ReviewCreation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showDestinationReviewScreen, setShowDestinationReviewScreen] =
    useState<boolean>(false);

  const destinationFromCard: DestinationDataWithRating =
    location.state?.destination;

  return (
    <div className='flex bg-gradient-to-br from-primary to-lightblue'>
      <div className='relative flex h-screen flex-1 flex-col items-center rounded-r-xl bg-lightgrey p-6 drop-shadow-sidebar-strong'>
        <h2>{destinationFromCard.name}</h2>
        <div className='mt-6 flex flex-col gap-4'>
          <BaseBtn
            onClick={() => navigate(-1)}
            className='flex items-center gap-2'
          >
            <IoCaretBackOutline className='text-h3' />
            Back
          </BaseBtn>
          <BaseBtn
            onClick={() => navigate('/')}
            className='flex items-center gap-2'
          >
            <IoMdHome className='text-h3' />
            Home
          </BaseBtn>
        </div>

        <div className='absolute top-1/2 flex transform flex-col items-center gap-4'>
          <BaseBtn
            onClick={() => setShowDestinationReviewScreen(true)}
            className={`${showDestinationReviewScreen && 'bg-secondary bg-none hover:text-primary!'}`}
          >
            Destination Review
          </BaseBtn>
          <BaseBtn
            onClick={() => setShowDestinationReviewScreen(false)}
            className={`${!showDestinationReviewScreen && 'bg-secondary bg-none hover:text-primary!'}`}
          >
            Attraction Review
          </BaseBtn>
        </div>
      </div>

      {showDestinationReviewScreen ? (
        <DestinationReview selectedDestination={destinationFromCard} />
      ) : (
        <AttractionReview selectedDestination={destinationFromCard} />
      )}
    </div>
  );
};

export default ReviewCreation;
