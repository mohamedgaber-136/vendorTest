import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BreadCrumb } from '../BreadCrumb/BreadCrumb';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav ref={navbarRef} className="bg-transparent text-fontColor">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="text-2xl font-semibold">جوازي</div>

        <div className="hidden md:flex space-x-4 gap-5">
          <a href="/" className="hover:text-gray-200">الرئيسيه</a>
          <a href="/about" className="hover:text-gray-200">مساعده</a>
          <a href="/services" className="hover:text-gray-200">عروض</a>
          <a href="/contact" className="hover:text-gray-200">باقات</a>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-primaryColor focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <BreadCrumb />

      {isOpen && (
        <div className="md:hidden bg-primaryColor text-white">
          <a href="/" className="block py-2 px-4 hover:bg-primary-light">الرئيسيه</a>
          <a href="/about" className="block py-2 px-4 hover:bg-primary-light">مساعده</a>
          <a href="/services" className="block py-2 px-4 hover:bg-primary-light">عروض</a>
          <a href="/contact" className="block py-2 px-4 hover:bg-primary-light">باقات</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
