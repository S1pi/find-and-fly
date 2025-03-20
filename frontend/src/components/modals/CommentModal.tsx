import {useEffect, useRef} from 'react';
import {Review} from '../../types/DataTypes';
import {MdCloseFullscreen} from 'react-icons/md';

type CommentModalProps = {
  review: Review;
  onClose: () => void;
};

const CommentModal = ({onClose, review}: CommentModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    onClose();
  };

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
      className='m-auto flex h-screen w-screen items-center justify-center rounded-lg border-0 bg-transparent bg-none'
      ref={modalRef}
    >
      <div className='scrollbar-hide relative flex h-1/2 w-1/2 items-center rounded-xl bg-gradient-to-bl from-blueg1 to-lightblue p-10 text-secondary shadow-modal'>
        <MdCloseFullscreen
          className='absolute top-4 left-4 cursor-pointer text-h3 hover:text-h2'
          onClick={closeModal}
        />
        <div className='flex flex-1 flex-col'>
          User information:
          <h1>{review.username}</h1>
        </div>
        <div className='flex flex-1 flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <h4>Review:</h4>
            {review.comment}
          </div>
          <div className='flex flex-col gap-2'>
            <h4>Rating:</h4>
            {review.rating}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CommentModal;
