import {useState} from 'react';

const useHamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return {isOpen, toggleMenu};
};

export default useHamburgerMenu;
