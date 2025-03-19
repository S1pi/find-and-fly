import {useState} from 'react';
import {DestinationDataWithRating} from '../types/DataTypes';
import CustomImageInput from './CustomImageInput';
import {Rating, ThinRoundedStar} from '@smastrom/react-rating';
import BaseBtn from './buttons/BaseBtn';
import SubDestCard from './cards/SubDestinationCard';
import {useForm} from '../hooks/formHooks';

type AttractionReviewProps = {
  selectedDestination: DestinationDataWithRating;
};

const AttractionReview = ({selectedDestination}: AttractionReviewProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [rating, setRating] = useState<number>(0);

  const handleAttractionSubmit = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login to add a review');
      return;
    }

    if (!inputs.attractionName || !inputs.attractionDescription) {
      alert('Please fill in all fields');
      return;
    }

    if (!selectedImage || !rating) {
      alert('Please select an image and rating');
      return;
    }

    alert('Attraction review will be implemented soon!');
  };

  const initValues = {
    attractionName: '',
    attractionDescription: '',
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    handleAttractionSubmit,
    initValues,
  );

  return (
    <div className='flex h-screen flex-12 flex-col items-center justify-evenly gap-4 px-12 py-6 text-secondary'>
      <h1>Add Review For Attraction In {selectedDestination.name}</h1>
      <div className='flex h-full max-h-1/2 flex-col items-center gap-4'>
        <h4 className=''>Preview Your Attraction Card</h4>
        <SubDestCard
          subDestination={{
            user_id: 1,
            name: inputs.attractionName || 'Attraction Name',
            rating: rating,
            file_url: `${selectedImage ? URL.createObjectURL(selectedImage as File) : ' https://fakeimg.pl/600x400'}`,
            file_name: 'SubDestination Image',
            id: 1,
            destination_id: selectedDestination.id,
            description: 'SubDestination Description',
            created_at: new Date(),
          }}
        />
      </div>
      <div className='flex w-full flex-row justify-evenly gap-24'>
        <div className='flex max-w-96 flex-1 flex-col items-center gap-12 rounded-lg bg-secondary p-4 text-primary drop-shadow-sidebar-strong'>
          <CustomImageInput
            inputName='attractionimage'
            labelText='Attraction Image'
            labelStyles='text-h2 mb-4'
            onFileChange={setSelectedImage}
          />
          <div className='flex flex-col items-center'>
            <h2 className=''>Rate Your Attraction</h2>
            <Rating
              value={rating}
              style={{maxWidth: 250}}
              onChange={(value: number) => setRating(value)}
              itemStyles={{
                itemShapes: ThinRoundedStar,
                activeFillColor: '#f5b942',
                activeStrokeColor: '#1a2e40',
                inactiveFillColor: '#f5f7fa',
              }}
            />
          </div>
        </div>
        <form
          className='flex max-w-96 flex-2 flex-col gap-4'
          onSubmit={handleSubmit}
        >
          <label>Attraction Name</label>
          <input
            name='attractionName'
            maxLength={20}
            minLength={3}
            type='text'
            placeholder='Attraction Name'
            onChange={handleInputChange}
            value={inputs.attractionName}
            className='rounded-lg bg-primary px-3 py-2'
          />

          <label>Attraction Description</label>
          <textarea
            name='attractionDescription'
            className='rounded-scrollbar max-h-32 min-h-16 resize-y scroll-smooth rounded-lg bg-primary px-3 py-2'
            placeholder='Attraction Description'
            value={inputs.attractionDescription}
            onChange={handleInputChange}
          />
          <BaseBtn
            type='submit'
            onClick={() => {}}
            className='w-2/3! self-center'
          >
            Submit Review
          </BaseBtn>
        </form>
      </div>
    </div>
  );
};

export default AttractionReview;
