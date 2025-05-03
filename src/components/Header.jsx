import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import passLogo from "../assets/images/image.png";
import BtnPriRed from "./BtnPriRed";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to check if nav item is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname === path) return true;
    return false;
  };

  // Menu items without dropdown indicators
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Announcements", link: "/announcements" },
    { name: "News & Events", link: "/news-events" },
    { name: "Uniforms", link: "/uniforms" },
    { name: "ReqDocs", link: "/reqdocs" },
    { name: "Careers", link: "/careers" },
  ];

  return (
    <header className="shadow-md w-full fixed top-0 left-0 right-0 z-50 text-red-50">
      {/* Top header with logo and search */}
      <div className="bg-red-primary md:bg-white py-1 px-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex justify-center items-center space-x-1 text-xl font-serif "
            >
              <img
                className="w-12 sm:w-16 md:w-11 rounded-full"
                src={passLogo}
                alt="PASS College"
              />
              <p className="hidden md:block text-2xl text-red-primary font-bold">
                PASS COLLEGE
              </p>
            </Link>
          </div>

          {/* Login */}
          <div className="hidden md:flex items-center">
            <BtnPriRed text={"Login"} />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Main navigation - Desktop */}
      <nav className="hidden md:block bg-red-primary">
        <div className="container mx-auto">
          <ul className="flex justify-center items-center">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`relative ${
                  isActive(item.link) ? "border-b-4 border-yellow-400" : ""
                }`}
              >
                <Link
                  to={item.link}
                  className="text-white flex items-center px-4 py-4 hover:text-white hover:bg-red-800 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white text-red-primary">
          <nav>
            <ul className="flex flex-col">
              {menuItems.map((item, index) => (
                <li key={index} className="border-b border-gray-200">
                  <Link
                    to={item.link}
                    className="font-bold py-4 pl-3 block hover:bg-gray-50 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Login */}
            <div className="mt-4">
              <button className="w-full px-6 py-2 border border-red-primary text-red-primary font-bold hover:bg-red-primary hover:text-white transition-colors duration-300">
                Login
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
