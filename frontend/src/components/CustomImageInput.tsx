import {useRef, useState} from 'react';
import {MdCloudUpload, MdCheckCircle} from 'react-icons/md';

type CustomImageInputProps = {
  inputName: string;
  labelText: string;
  labelStyles?: string;
  onFileChange?: (file: File | null) => void;
};

const CustomImageInput = ({
  inputName,
  labelText,
  labelStyles,
  onFileChange,
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

    // Callback function to parent component
    onFileChange && onFileChange(file);

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
                onFileChange && onFileChange(null);
                setPreviewUrl('');
              }}
            >
              Remove
            </button>
          </div>
        </>
      )}
      <div
        className='flex w-full cursor-pointer flex-col items-center gap-2 rounded-full bg-gradient-to-l from-blueg1 to-blueg2 px-3 py-1'
        onClick={handleFileInputClick}
      >
        {previewUrl ? (
          <>
            <span className='flex items-center gap-1'>
              <MdCheckCircle className='text-green-400' /> {selectedFile?.name}
            </span>
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
