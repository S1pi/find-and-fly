// Add review data as card props
import {Rating, ThinStar} from '@smastrom/react-rating';
import {Review} from '../../types/DataTypes';
import Avatar from '../customs/Avatar';
import {TiThumbsUp} from 'react-icons/ti';
import {TiThumbsDown} from 'react-icons/ti';
import {AiOutlineFullscreen} from 'react-icons/ai';

type ReviewCardProps = {
  review: Review;
  setIsReviewOpen: (value: boolean) => void;
  setSelectedReview: (value: Review | null) => void;
};

const ReviewCard = ({
  review,
  setIsReviewOpen,
  setSelectedReview,
}: ReviewCardProps) => {
  const capitalize = (str: string | null | undefined) => {
    if (!str) return 'No username';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const date = new Date(review.created_at);
  const formattedDate = date.toLocaleDateString('fi-FI');
  const formattedTime = date.toLocaleTimeString('fi-FI', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const iconMap = {
    solo: '../img/icon-solo.png',
    family: '../img/icon-family.png',
    friends: '../img/icon-friends.png',
    couple: '../img/icon-couple.png',
    business: '../img/icon-business.png',
    other: '../img/icon-other.png',
  };

  const tripTypeIcon = iconMap[review.trip_type as keyof typeof iconMap];

  return (
    <div className='relative flex h-50 w-full max-w-72 flex-col justify-evenly gap-2 rounded-3xl bg-white px-4 py-2 shadow-lg'>
      <AiOutlineFullscreen
        className='absolute top-4 right-4 cursor-pointer text-h3 hover:text-h2'
        onClick={() => {
          setIsReviewOpen(true);
          setSelectedReview(review);
        }} // Add onClick to open modal
      />
      <div className='flex justify-center gap-4'>
        <Avatar
          username={review.username || 'No username'}
          profilePicture={review.profile_picture}
          size={80}
          className='drop-shadow-custom'
        />
        <div className='flex flex-col items-start justify-center gap-1'>
          <h3 className='text-h3 font-bold text-gold-accent'>
            {capitalize(review.username)}
          </h3>
          <Rating
            style={{maxWidth: 150}}
            value={review.rating}
            itemStyles={{
              itemShapes: ThinStar,
              activeFillColor: '#38a2bc',
              activeStrokeColor: '#1a2e40',
              inactiveFillColor: '#b1cac9',
            }}
            readOnly
          />
          <p className='pl-2 text-sm'>
            {formattedTime} &bull; {formattedDate}
          </p>
        </div>
      </div>
      <div className='line-clamp-2 text-start text-xs'>
        {review.comment} {'...'}
      </div>
      {/* // Likes and dislikes + trip type */}
      <div className='flex items-center justify-between gap-2'>
        <div className='flex gap-2'>
          <span className='flex items-center gap-1'>
            <TiThumbsUp className='cursor-pointer text-h4' />
            <span>{review.likes}</span>
          </span>
          <span className='flex items-center gap-1'>
            <TiThumbsDown className='cursor-pointer text-h4' />
            <span>{review.dislikes}</span>
          </span>
        </div>
        <span className='flex items-center gap-1 text-xs'>
          Trip:{' '}
          <img
            src={tripTypeIcon}
            alt='Trip type icon'
            className='h-8 w-8 object-cover'
          ></img>
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
