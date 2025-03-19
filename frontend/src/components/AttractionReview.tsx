import {useState} from 'react';
import {DestinationDataWithRating} from '../types/DataTypes';
import CustomImageInput from './CustomImageInput';
import {Rating, ThinRoundedStar} from '@smastrom/react-rating';
import BaseBtn from './buttons/BaseBtn';
import SubDestCard from './cards/SubDestinationCard';

type AttractionReviewProps = {
  selectedDestination: DestinationDataWithRating;
};

const AttractionReview = ({selectedDestination}: AttractionReviewProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [rating, setRating] = useState<number>(0);

  return (
    <div className='flex h-screen flex-12 flex-col items-center gap-4 px-12 py-4 text-secondary'>
      <h1>Add Review For Attraction In {selectedDestination.name}</h1>
      <div className='flex w-full flex-row justify-evenly'>
        <div className='flex flex-col items-center gap-12 rounded-lg bg-secondary p-4 text-primary drop-shadow-sidebar-strong'>
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
        <form className='flex flex-col gap-4'>
          <label>Attraction Name</label>
          <input
            type='text'
            placeholder='Attraction Name'
            className='rounded-lg bg-primary px-3 py-2'
          />

          <label>Attraction Description</label>
          <textarea
            className='rounded-scrollbar max-h-32 min-h-16 resize-y scroll-smooth rounded-lg bg-primary px-3 py-2'
            placeholder='Attraction Description'
          />
          <BaseBtn
            type='submit'
            onClick={() => {}}
            className='w-2/3! self-center'
          >
            Submit Review
          </BaseBtn>
        </form>
        <div>
          <SubDestCard
            subDestination={{
              user_id: 1,
              name: 'SubDestination Name',
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
      </div>
    </div>
  );
};

export default AttractionReview;
