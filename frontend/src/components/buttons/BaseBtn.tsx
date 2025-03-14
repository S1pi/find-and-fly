import {ReactNode} from 'react';

type btnProps = {
  children: ReactNode;
  className?: string; // extra styles for the button
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const BaseBtn = ({children, className, type, onClick = () => {}}: btnProps) => {
  const baseStyles =
    'bg-gradient-to-r from-blue-btn via-55% via-blueg1 to-blueg2 text-primary text-button font-medium py-2 px-4 rounded-4xl w-30 cursor-pointer drop-shadow-text hover:from-blueg1 hover:to-blueg2 hover:text-secondary';

  return (
    <button
      className={`${baseStyles} ${className}`}
      onClick={onClick}
      type={type || 'button'}
    >
      {children}
    </button>
  );
};

export default BaseBtn;
