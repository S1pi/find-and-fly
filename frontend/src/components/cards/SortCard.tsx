import {ReactNode} from 'react';

type SortCardProps = {
  children: ReactNode;
  text: string;
};

const SortCard = ({text, children}: SortCardProps) => {
  return (
    <div className='flex h-24 w-50 cursor-pointer flex-col justify-between rounded-lg bg-[url(/img/beach.jpg)] bg-cover px-1.5 py-2 shadow-custom'>
      <div className='flex h-6 w-18 items-center gap-1 rounded-full bg-lightgrey p-2 text-[7px] text-secondary shadow-custom'>
        {children}
        Sort By
      </div>
      <h3 className='text-primary drop-shadow-text'>{text}</h3>
    </div>
  );
};

export default SortCard;
