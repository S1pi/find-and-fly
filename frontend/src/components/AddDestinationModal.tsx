import {useEffect, useRef} from 'react';
import CustomImageInput from './CustomImageInput';
import {IoIosCloseCircle} from 'react-icons/io';

type AddDestinationModalProps = {
  onClose: () => void;
};

const AddDestinationModal = ({onClose}: AddDestinationModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      onClose();
    }
  };

  return (
    <dialog
      className='m-auto flex h-screen w-screen items-center justify-center border-0 bg-transparent bg-none'
      ref={modalRef}
    >
      <div className='relative flex max-h-[90vh] w-11/12 max-w-lg flex-col gap-4 overflow-y-auto rounded-3xl bg-gradient-to-br from-modal-gradient-start to-modal-gradient-end p-4 text-primary shadow-modal md:p-12'>
        <IoIosCloseCircle
          className='absolute top-4 left-4 cursor-pointer text-h2 text-primary'
          onClick={closeModal}
        />
        <h1 className='text-center text-xl md:text-3xl'>Add Destination</h1>
        <p className='text-xs md:text-sm lg:text-base'>
          Upload an appealing image and enter the destination's name and
          country. Write a brief description that captures its vibe, highlights
          key features, and explains what makes it unique.
        </p>
        <form className='flex flex-col gap-4 text-secondary placeholder:text-secondary'>
          <CustomImageInput
            inputName='destimage'
            labelText='Destination Card Image'
            labelStyles='text-h4'
          />
          <div className='flex flex-col gap-1'>
            <label htmlFor='destname' className='px-2 text-h4 text-primary'>
              Destination name
            </label>
            <input
              name='destname'
              type='text'
              className='rounded-full bg-primary px-3 py-2'
              placeholder='Destination Name (City)'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='destcountry' className='px-2 text-h4 text-primary'>
              Destination country
            </label>
            <input
              name='destcountry'
              type='text'
              className='rounded-full bg-primary px-3 py-2'
              placeholder='Destination Country'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='destdesc' className='px-2 text-h4 text-primary'>
              Destination description
            </label>
            <textarea
              name='destdesc'
              className='rounded-scrollbar max-h-32 min-h-16 resize-y scroll-smooth rounded-lg bg-primary px-3 py-2'
              placeholder='Destination Description'
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddDestinationModal;
