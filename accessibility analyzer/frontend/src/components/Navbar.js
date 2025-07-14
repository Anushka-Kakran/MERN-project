// Updated Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const getInitial = (email) => email?.charAt(0).toUpperCase();

  return (
    <>
      <nav aria-label="Primary Navigation" className="flex justify-between items-center px-6 py-4 shadow bg-white text-textDark relative">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-all">
            Accessibility Analyzer
          </Link>

          <div className="hidden md:flex gap-4 font-medium ml-4">
            <Link to="/overview" className="hover:text-primary">Overview</Link>
            <Link to="/benefits" className="hover:text-primary">Benefits</Link>
            <Link to="/featured" className="hover:text-primary">Featured</Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
          <Link to="/analyze"><Button text="Get Started" className="bg-primary hover:bg-primaryDark" /></Link>

          {user && (
            <div className="relative" ref={dropdownRef}>
              <div
                className="w-9 h-9 bg-primary text-white font-bold flex items-center justify-center rounded-full cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                role="button"
                tabIndex={0}
              >
                {getInitial(user.email)}
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10 w-40">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 text-sm">Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-danger"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="md:hidden">
          <AiOutlineMenu
            size={24}
            onClick={() => setMobileMenuOpen(true)}
            className="cursor-pointer"
            aria-label="Open mobile menu"
          />
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end items-center p-4 border-b">
          <AiOutlineClose
            size={24}
            onClick={() => setMobileMenuOpen(false)}
            className="cursor-pointer"
            aria-label="Close mobile menu"
          />
        </div>

        <nav className="flex flex-col gap-4 p-4 text-base">
          <Link to="/overview" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">Overview</Link>
          <Link to="/benefits" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">Benefits</Link>
          <Link to="/featured" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">Featured</Link>

          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-primary font-semibold">Sign In</Link>
          <Link to="/analyze" onClick={() => setMobileMenuOpen(false)}>
            <Button text="Get Started" className="bg-primary hover:bg-primaryDark w-full" />
          </Link>

          {user && (
            <>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="text-danger text-left">Logout</button>
            </>
          )}
        </nav>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Navbar;
