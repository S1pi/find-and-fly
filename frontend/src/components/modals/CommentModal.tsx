import {useEffect, useRef} from 'react';
import {Review} from '../../types/DataTypes';
import {MdCloseFullscreen} from 'react-icons/md';
import Avatar from '../customs/Avatar';
import useAuth from '../../hooks/useAuth';
import {Rating, ThinStar} from '@smastrom/react-rating';

type CommentModalProps = {
  review: Review;
  onClose: () => void;
};

const CommentModal = ({onClose, review}: CommentModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const {user} = useAuth();

  const capitalize = (str: string | null | undefined) => {
    if (!str) return 'No username';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    onClose();
  };

  const reviewDate = new Date(review.created_at);
  const userCreatedDate = new Date(user?.created_at || '');
  const formattedUser = userCreatedDate.toLocaleDateString('fi-FI');
  // const formattedTime = date.toLocaleTimeString('fi-FI', {
  //   hour: '2-digit',
  //   minute: '2-digit',
  // });

  const iconMap = {
    solo: '../img/icon-solo.png',
    family: '../img/icon-family.png',
    friends: '../img/icon-friends.png',
    couple: '../img/icon-couple.png',
    business: '../img/icon-business.png',
    other: '../img/icon-other.png',
  };

  const tripTypeIcon = iconMap[review.trip_type as keyof typeof iconMap];

  useEffect(() => {
    document.body?.classList.add('overflow-hidden');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    if (modalRef.current) {
      modalRef.current.showModal();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body?.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <dialog
      className='m-auto flex h-screen w-screen items-center justify-center rounded-lg border-0 border-none bg-transparent bg-none'
      ref={modalRef}
    >
      <div className='scrollbar-hide relative flex w-fit rounded-xl bg-lightblue p-12 text-secondary shadow-modal sm:h-fit md:h-fit'>
        <MdCloseFullscreen
          className='absolute top-4 left-4 cursor-pointer text-h3 hover:text-h2'
          onClick={closeModal}
        />
        <div className='flex w-full max-w-[40rem] flex-col gap-4'>
          <h1 className='w-full self-center rounded bg-lightgrey p-4 text-center font-bold drop-shadow-custom'>
            Destination Review
          </h1>
          <div className='flex flex-col justify-evenly gap-4 xl:flex-row'>
            <div className='flex flex-1 flex-col gap-6 rounded-lg bg-lightgrey p-4 drop-shadow-custom'>
              {/* User information: */}
              <div className='flex flex-1 items-center gap-4'>
                <Avatar
                  username={review.username || 'No Username'}
                  profilePicture={review.profile_picture}
                  size={80}
                  className='drop-shadow-custom'
                />
                <h1 className='font-bold text-gold-accent'>
                  {capitalize(review.username)}
                </h1>
              </div>
              <h5>Member since: {formattedUser}</h5>
              <div>
                <h4>Rating:</h4>
                <Rating
                  value={review.rating}
                  style={{maxWidth: 250}}
                  itemStyles={{
                    itemShapes: ThinStar,
                    activeFillColor: '#f5b942',
                    activeStrokeColor: '#1a2e40',
                    inactiveFillColor: '#b1cac9',
                  }}
                  readOnly
                />
              </div>
            </div>
            <div className='flex w-full flex-2 flex-col items-center gap-4'>
              <div className='relative flex w-full max-w-[30rem] flex-1 flex-col gap-2 rounded-lg bg-lightgrey p-4 pb-10 drop-shadow-custom'>
                <h4>Review:</h4>
                <div className='h-full w-full rounded border p-2 text-left break-words text-secondary'>
                  {review.comment}
                </div>
                <div className='absolute right-4 bottom-2'>
                  <h5>{reviewDate.toLocaleDateString('fi-FI')}</h5>
                </div>
                <div className='absolute bottom-2 left-4'>
                  <h5>
                    {reviewDate.toLocaleTimeString('fi-FI', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </h5>
                </div>
              </div>
              <div className='flex justify-center gap-4 rounded-lg bg-lightgrey p-4 text-center drop-shadow-custom'>
                <h4>Trip Type:</h4>
                <img
                  src={tripTypeIcon}
                  alt='Trip type icon'
                  className='h-8 w-8'
                />
                <h4>{review.trip_type}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CommentModal;
