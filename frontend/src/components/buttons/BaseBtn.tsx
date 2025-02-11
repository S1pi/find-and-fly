import {ReactNode} from 'react';

type btnProps = {
  children: ReactNode;
  className?: string; // extra styles for the button
  evtHanlder: () => void;
};

const BaseBtn = ({children, className, evtHanlder = () => {}}: btnProps) => {
  const baseStyles =
    'bg-gradient-to-r from-blue-btn via-55% via-blueg1 to-blueg2 text-white text-button font-medium py-2 px-4 rounded-4xl w-30';

  return (
    <button className={`${baseStyles} ${className}`} onClick={evtHanlder}>
      <p>{children}</p>
    </button>
  );
};

export default BaseBtn;
