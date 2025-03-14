import {useRef, useState} from 'react';
import {MdCloudUpload, MdCheckCircle} from 'react-icons/md';

type CustomImageInputProps = {
  inputName: string;
  labelText: string;
  labelStyles?: string;
};

const CustomImageInput = ({
  inputName,
  labelText,
  labelStyles,
}: CustomImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='flex flex-col items-center gap-2'>
      {/* If component is reusable change this */}
      <label className={`text-primary ${labelStyles}`} htmlFor={inputName}>
        {labelText}
      </label>

      <input
        ref={fileInputRef}
        name={inputName}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />

      {previewUrl && (
        <>
          <div className='flex items-center gap-2'>
            <img
              src={previewUrl}
              alt='destination preview'
              className='h-24 w-full rounded-lg object-cover'
            />
          </div>
          <div className='flex gap-4'>
            <span
              className='cursor-pointer text-sm text-primary underline'
              onClick={handleFileInputClick}
            >
              Change image
            </span>
            <button
              className='cursor-pointer text-sm text-red-500'
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl('');
              }}
            >
              Remove
            </button>
          </div>
        </>
      )}
      <div
        // className='flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-secondary px-8 py-4 text-primary shadow-custom'
        className='flex w-full cursor-pointer flex-col items-center gap-2 rounded-full bg-gradient-to-l from-blueg1 to-blueg2 px-3 py-1'
        onClick={handleFileInputClick}
      >
        {previewUrl ? (
          <>
            {/* <img
              src={previewUrl}
              alt='destination preview'
              className='h-40 w-full rounded-lg object-cover'
            /> */}
            <span className='flex items-center gap-1'>
              <MdCheckCircle className='text-green-400' /> {selectedFile?.name}
            </span>

            {/* Kato onko tää parempi ku gpt versio */}
            {/* <div className='flex items-center justify-center gap-2'>
              <p className='text-sm'>{selectedFile?.name}</p>
              <button
                className='text-sm text-red-500'
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl('');
                }}
              >
                Remove
              </button>
            </div> */}
          </>
        ) : (
          <div className='flex items-center gap-2'>
            <MdCloudUpload className='text-4xl text-primary' />
            <span className='text-sm text-primary'>Select image</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomImageInput;
