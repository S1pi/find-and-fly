import {useEffect, useRef, useState} from 'react';
import CustomImageInput from '../customs/CustomImageInput';
import {IoIosCloseCircle} from 'react-icons/io';
import BaseBtn from '../buttons/BaseBtn';
import {useForm} from '../../hooks/formHooks';
import {useDestinations} from '../../hooks/apiHooks';
import CustomDropDown from '../customs/CustomDropDown';
import {Category, DestinationCreate} from '../../types/DataTypes';

type AddDestinationModalProps = {
  onClose: () => void;
};

const AddDestinationModal = ({onClose}: AddDestinationModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const {categories, postDestination} = useDestinations();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const initialValues = {
    destname: '',
    destcountry: '',
    destdesc: '',
  };

  const handleDestinationSubmit = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login to add a destination');
      return;
    }

    if (!selectedImage) {
      alert('Please select an image');
      return;
    }

    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }

    if (!inputs.destname || !inputs.destcountry || !inputs.destdesc) {
      alert('Please fill all fields');
      return;
    }

    const destinationInformation: Omit<
      DestinationCreate,
      'id' | 'created_at' | 'user_id' | 'file_data'
    > = {
      name: inputs.destname,
      country: inputs.destcountry,
      description: inputs.destdesc,
      category_id: selectedCategory.id,
    };

    try {
      await postDestination(selectedImage, destinationInformation, token);
      // alert('Destination added successfully');
      clearForm();
      closeModal();
      // Redirect to destinations/(newDestinationPath) to add a review for the newly added destination
      // navigation(`/destinations/${inputs.destname.toLowerCase().replace(' ', '-')}`);
      // Temporary solution to refresh the page to show the new destination
      window.location.reload();
    } catch (err) {
      console.error('Error postin destination: ', (err as Error).message);
      alert('Something went wrong. Please try again');
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      onClose();
    }
  };

  const clearForm = () => {
    setInputs(initialValues);
    setSelectedCategory(null);
  };

  const {handleSubmit, handleInputChange, setInputs, inputs} = useForm(
    handleDestinationSubmit,
    initialValues,
  );

  useEffect(() => {
    document.body?.classList.add('overflow-hidden');

    console.log('categories', categories);
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
      className='m-auto flex h-screen w-screen items-center justify-center border-0 bg-transparent bg-none'
      ref={modalRef}
    >
      <div className='scrollbar-hide relative flex max-h-[90vh] w-11/12 max-w-lg flex-col gap-4 overflow-y-auto rounded-3xl bg-gradient-to-br from-modal-gradient-start to-modal-gradient-end p-4 text-primary shadow-modal md:p-12'>
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
        <form
          className='flex flex-col gap-4 text-secondary placeholder:text-secondary'
          onSubmit={handleSubmit}
        >
          <CustomImageInput
            inputName='destimage'
            labelText='Destination Card Image'
            labelStyles='text-h4'
            onFileChange={setSelectedImage}
          />
          <div className='flex flex-col gap-1'>
            <label htmlFor='destname' className='px-2 text-h4 text-primary'>
              Destination name
            </label>
            <input
              name='destname'
              type='text'
              value={inputs.destname}
              onChange={handleInputChange}
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
              value={inputs.destcountry}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              value={inputs.destdesc}
              className='rounded-scrollbar max-h-32 min-h-16 resize-y scroll-smooth rounded-lg bg-primary px-3 py-2'
              placeholder='Destination Description'
            />
          </div>
          <CustomDropDown
            options={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
            getOptionLabel={(option) => option.name}
            label='Select Category'
          />
          <div className='mt-4 flex w-full justify-evenly gap-4'>
            <BaseBtn onClick={clearForm}>RESET</BaseBtn>
            {/* OnClick is needed but this case form handles submit so leave it empty */}
            <BaseBtn onClick={() => {}} className='flex-1' type='submit'>
              SUBMIT DESTINATION
            </BaseBtn>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddDestinationModal;
