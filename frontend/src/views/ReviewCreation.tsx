import {useLocation, useNavigate} from 'react-router';
import {DestinationDataWithRating} from '../types/DataTypes';
import BaseBtn from '../components/buttons/BaseBtn';
import {IoCaretBackOutline} from 'react-icons/io5';
import {IoMdHome} from 'react-icons/io';
import CustomDropDown from '../components/CustomDropDown';
import {useEffect, useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {Rating, ThinRoundedStar} from '@smastrom/react-rating';

const ReviewCreation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedTripType, setSelectedTripType] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const destinationFromCard: DestinationDataWithRating =
    location.state?.destination;

  const tripTypeIcons = [
    {name: 'Family', icon: '/img/icon-family.png'},
    {name: 'Friends', icon: '/img/icon-friends.png'},
    {name: 'Solo', icon: '/img/icon-solo.png'},
    {name: 'Business', icon: '/img/icon-business.png'},
    {name: 'Couple', icon: '/img/icon-couple.png'},
    {name: 'Other', icon: '/img/icon-other.png'},
  ];

  const tripTypes = [
    'Family',
    'Friends',
    'Solo',
    'Business',
    'Couple',
    'Other',
  ];

  const handleReviewSubmit = () => {};

  const initValues = {
    reviewComment: '',
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    handleReviewSubmit,
    initValues,
  );

  useEffect(() => {
    console.log('Selected trip type: ', selectedTripType);
    console.log('Selected rating: ', selectedRating);
  }, [selectedRating]);

  return (
    <div className='flex bg-gradient-to-br from-primary to-lightblue'>
      <div className='flex h-screen flex-1 flex-col items-center rounded-r-xl bg-lightgrey p-6 drop-shadow-sidebar-strong'>
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
      </div>
      <div className='flex h-screen flex-12 flex-col items-center gap-4 px-12 py-4'>
        <h1>Add review for Destination</h1>
        <div
          className='flex w-full flex-1 flex-col justify-between rounded-lg bg-cover bg-center drop-shadow-2xl'
          style={{backgroundImage: `url(${destinationFromCard.file_url})`}}
        ></div>
        <div className='flex w-full flex-2 flex-row justify-between gap-4'>
          <div className='flex flex-1 flex-col items-center gap-4'>
            <div className='flex flex-col items-center gap-2 rounded-lg bg-secondary p-4 text-primary drop-shadow-custom'>
              <h3>{destinationFromCard.name}'s Current Rating</h3>
              <Rating
                value={destinationFromCard.average_rating}
                style={{maxWidth: 300}}
                itemStyles={{
                  itemShapes: ThinRoundedStar,
                  activeFillColor: '#f5b942',
                  activeStrokeColor: '#1a2e40',
                  inactiveFillColor: '#f5f7fa',
                }}
                readOnly
              />
              {/* <div className='mt-2 max-w-96 text-center drop-shadow-custom'>
                <h3>Description</h3>
                <p>{destinationFromCard.description}</p>
              </div> */}
            </div>
            {/* // Review section */}
            <div className='flex flex-col items-center gap-4 text-center'>
              <h3>Trip type selection</h3>
              <p className='px-6'>Triptype selection description comes here</p>
              <div className='flex min-w-56 items-center gap-8'>
                {selectedTripType && (
                  <img
                    src={
                      tripTypeIcons.find(
                        (item) => item.name === selectedTripType,
                      )?.icon
                    }
                    alt='Trip type icon'
                    className='h-8 w-8 object-cover'
                  />
                )}
                <CustomDropDown
                  options={tripTypes}
                  selected={selectedTripType}
                  onChange={setSelectedTripType}
                  getOptionLabel={(option) => option}
                />
              </div>
              <div className='flex flex-col items-center gap-4'>
                <h3>Rating selection</h3>
                <p>Rating selection description comes here</p>
                <Rating
                  value={selectedRating}
                  onChange={(value: number) => setSelectedRating(value)}
                  itemStyles={{
                    itemShapes: ThinRoundedStar,
                    activeFillColor: '#f5b942',
                    activeStrokeColor: '#1a2e40',
                    inactiveFillColor: '#f5f7fa',
                  }}
                  style={{maxWidth: 300}}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-2 flex-col items-center justify-evenly gap-10'>
            <h3>Share Your Experience</h3>
            <p className='max-w-1/2 text-center'>
              Tell us about your journey – what you saw, how you felt, and what
              made the trip memorable. Your story might inspire others to
              explore new destinations!
            </p>
            <form
              onSubmit={handleSubmit}
              className='flex w-full max-w-1/2 flex-col items-center justify-center gap-4'
            >
              <label
                htmlFor='reviewComment'
                className='text-h4 font-bold text-secondary'
              >
                Your Review
              </label>

              <textarea
                id='reviewComment'
                name='reviewComment'
                rows={4}
                className='rounded-scrollbar max-h-80 min-h-52 w-full resize-y scroll-smooth rounded-lg bg-primary px-3 py-2'
                value={inputs.reviewComment}
                onChange={handleInputChange}
                placeholder='Write your review here...'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCreation;
