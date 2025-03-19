import {JSX, useEffect, useRef, useState} from 'react';

type CustomDropDownProps<T> = {
  options: T[];
  selected: T | null;
  onChange: (value: T) => void;
  getOptionLabel: (option: T) => string;
  label?: string;
};

const CustomDropDown = <T,>({
  options,
  selected,
  onChange,
  getOptionLabel,
  label,
}: CustomDropDownProps<T>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: T) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative w-full' ref={dropdownRef}>
      {label && (
        <label className='mb-1 block text-h4 text-primary'>{label}</label>
      )}
      <div
        className='flex cursor-pointer items-center justify-between rounded-full border border-midgrey bg-primary px-3 py-2'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className='text-base text-secondary'>
          {selected ? getOptionLabel(selected) : 'Select Category'}
        </span>

        <svg
          className={`h-4 w-4 text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </div>

      {isOpen && (
        <div className='absolute z-1 mt-1 w-full rounded-lg bg-primary shadow-modal'>
          {options.map((option, index) => (
            <div
              key={index}
              className='cursor-pointer rounded px-3 py-2 text-secondary hover:bg-secondary hover:text-primary'
              onClick={() => handleSelect(option)}
            >
              {getOptionLabel(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropDown;
