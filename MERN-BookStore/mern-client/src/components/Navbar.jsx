import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';


// react-icons
import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const {user} = useContext(AuthContext);

  // toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // navItems here
  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Shop", path: "/shop" },
    { link: "Sell Your Book", path: "/admin/dashboard" },
    { link: "Blog", path: "/blog" },
  ];

  return (
    <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in-out duration-300">
      <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : ""}`}>
        <div className="flex justify-between items-center text-base gap-8">
          {/* logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-700 flex items-center gap-2"
          >
            <FaBlog className="inline-block" />
            Books
          </Link>

          {/* nav item for large devices */}
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
            
                <Link key={path}
                  to={path}
                  className="text-gray-700 hover:text-blue-700 uppercase cursor-pointer"
                >
                  {link}
                </Link>
             
            ))}
          </ul>

          {/* btn for lg devices */}
          <div className="space-x-12 hidden lg:flex items-center">
            <button>
              <FaBarsStaggered className="w-5 hover:text-blue-700" />
            </button>
           {user && <span className="text-sm text-black">{user.email}</span>}

          </div>

          {/* menu btn for the mobile devices */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              {isMenuOpen ? (
                <FaXmark className="h-5 w-5 text-black" />
              ) : (
                <FaBarsStaggered className="h-5 w-5 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* navitems for sm devices */}
          <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
            {navItems.map(({ link, path }) => (
             
                <Link key={path}
                  to={path}
                  className="block text-white hover:text-blue-700 uppercase cursor-pointer"
                  onClick={() => setIsMenuOpen(false)} 
                >
                  {link}
                </Link>
              
            ))}
         </div>
      </nav>
    </header>
  );
};

export default Navbar;
