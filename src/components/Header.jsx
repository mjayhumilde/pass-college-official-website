import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useNotificationStore from "../store/useNotificationStore";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp, User, Bell } from "lucide-react";
import passLogo from "../assets/images/pass_log-removebg-preview.png";
import BtnPriRed from "./BtnPriRed";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);
  const { notifications } = useNotificationStore();

  // console.log({ isAuthenticated, userRole });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  const isActive = (item) => {
    if (item.link) {
      if (item.link === "/" && location.pathname === "/") return true;
      if (item.link !== "/" && location.pathname === item.link) return true;
    }

    if (item.hasDropdown && item.name === "About") {
      return item.dropdownItems.some(
        (dropdownItem) => location.pathname === dropdownItem.link
      );
    }

    return false;
  };

  const menuItems = [
    { name: "Home", link: "/" },
    {
      name: "About",
      hasDropdown: true,
      dropdownItems: [
        { name: "Who we are", link: "/about/who-we-are" },
        { name: "Our History & Tradition", link: "/about/history-tradition" },
        { name: "Our College Programs", link: "/about/college-programs" },
      ],
    },
    { name: "Announcements", link: "/announcements" },
    { name: "News & Events", link: "/news-events" },
    { name: "Uniforms", link: "/uniforms" },
    { name: "ReqDocs", link: "/reqdocs" },
    { name: "Careers", link: "/careers" },
    { name: "Accounts", link: "/accounts" },
  ];

  return (
    <header className="shadow-md w-full fixed top-0 left-0 right-0 z-50 text-red-50">
      <div className="bg-red-primary md:bg-white py-1 px-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
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

          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="flex justify-center items-center space-x-2 ">
                <Link to={"/profile"}>
                  <div className="p-1 bg-red-primary rounded-full">
                    <User
                      className=" hover:cursor-pointer text-red-50"
                      size={37}
                    />
                  </div>
                </Link>
                <Link to={"/notifications"}>
                  <div className="relative hover:cursor-pointer">
                    <Bell className="text-red-primary" size={30} />
                    <div className="bg-red-primary px-2 -top-2 absolute -right-3 rounded-full text-red-50 text-[15px] font-bold">
                      {
                        notifications.filter((n) => n.status === "unread")
                          .length
                      }
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <BtnPriRed text={"Login"} navi={"login"} />
            )}
          </div>

          <div className=" md:hidden flex justify-center items-center space-x-6">
            <Link to={"/notifications"}>
              <div className="relative hover:cursor-pointer">
                <Bell className="text-red-50" size={24} />
                <div className="bg-white px-2 -top-3 absolute -right-3 rounded-full text-red-primary text-[15px] font-bold">
                  {notifications.filter((n) => n.status === "unread").length}
                </div>
              </div>
            </Link>
            <button
              className=" text-white"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation - Desktop */}
      <nav className="hidden md:block bg-red-primary">
        <div className="container mx-auto">
          <ul className="flex justify-center items-center">
            {menuItems.map((item, index) => {
              if (!isAuthenticated) {
                if (
                  item.name === "Announcements" ||
                  item.name === "ReqDocs" ||
                  item.name === "Uniforms" ||
                  item.name === "Accounts"
                ) {
                  null;
                } else {
                  return (
                    <li
                      key={index}
                      className={`relative ${
                        isActive(item) ? "border-b-4 border-yellow-400" : ""
                      }`}
                      onMouseEnter={() =>
                        item.hasDropdown && setIsAboutDropdownOpen(true)
                      }
                      onMouseLeave={() =>
                        item.hasDropdown && setIsAboutDropdownOpen(false)
                      }
                    >
                      {item.hasDropdown ? (
                        <div className="relative">
                          <button
                            onClick={toggleAboutDropdown}
                            className="text-red-50 flex items-center px-4 py-4 hover:text-white hover:bg-red-800 transition-colors duration-300"
                            aria-expanded={isAboutDropdownOpen}
                            aria-haspopup="true"
                          >
                            {item.name}
                            {isAboutDropdownOpen ? (
                              <ChevronUp size={18} className="ml-1" />
                            ) : (
                              <ChevronDown size={18} className="ml-1" />
                            )}
                          </button>

                          {isAboutDropdownOpen && (
                            <div className="absolute top-full left-0 bg-red-primary shadow-lg w-48 z-10">
                              <ul className="py-1">
                                {item.dropdownItems.map(
                                  (dropdownItem, dropdownIndex) => (
                                    <li key={dropdownIndex}>
                                      <Link
                                        to={dropdownItem.link}
                                        className="block px-4 py-2 text-red-50 hover:bg-red-800 transition-colors duration-300"
                                        onClick={() =>
                                          setIsAboutDropdownOpen(false)
                                        }
                                      >
                                        {dropdownItem.name}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.link}
                          className="text-white flex items-center px-4 py-4 hover:text-white hover:bg-red-800 transition-colors duration-300"
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  );
                }
              } else {
                if (userRole === "teacher") {
                  return (
                    <li
                      key={index}
                      className={`relative ${
                        isActive(item) ? "border-b-4 border-yellow-400" : ""
                      }`}
                      onMouseEnter={() =>
                        item.hasDropdown && setIsAboutDropdownOpen(true)
                      }
                      onMouseLeave={() =>
                        item.hasDropdown && setIsAboutDropdownOpen(false)
                      }
                    >
                      {item.hasDropdown ? (
                        <div className="relative">
                          <button
                            onClick={toggleAboutDropdown}
                            className="text-red-50 flex items-center px-4 py-4 hover:text-white hover:bg-red-800 transition-colors duration-300"
                            aria-expanded={isAboutDropdownOpen}
                            aria-haspopup="true"
                          >
                            {item.name}
                            {isAboutDropdownOpen ? (
                              <ChevronUp size={18} className="ml-1" />
                            ) : (
                              <ChevronDown size={18} className="ml-1" />
                            )}
                          </button>

                          {isAboutDropdownOpen && (
                            <div className="absolute top-full left-0 bg-red-primary shadow-lg w-48 z-10">
                              <ul className="py-1">
                                {item.dropdownItems.map(
                                  (dropdownItem, dropdownIndex) => (
                                    <li key={dropdownIndex}>
                                      <Link
                                        to={dropdownItem.link}
                                        className="block px-4 py-2 text-red-50 hover:bg-red-800 transition-colors duration-300"
                                        onClick={() =>
                                          setIsAboutDropdownOpen(false)
                                        }
                                      >
                                        {dropdownItem.name}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.link}
                          className="text-white flex items-center px-4 py-4 hover:text-white hover:bg-red-800 transition-colors duration-300"
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  );
                }
                if (item.name === "Accounts" && userRole != "teacher") {
                  null;
                } else {
                  return (
                    <li
                      key={index}
                      className={`relative ${
                        isActive(item) ? "border-b-4 border-yellow-400" : ""
                      }`}
                      onMouseEnter={() =>
                        item.hasDropdown && setIsAboutDropdownOpen(true)
                      }
                      onMouseLeave={() =>
                        item.hasDropdown && setIsAboutDropdownOpen(false)
                      }
                    >
                      {item.hasDropdown ? (
                        <div className="relative">
                          <button
                            onClick={toggleAboutDropdown}
                            className="text-red-50 flex items-center px-4 py-4 hover:text-white hover:bg-red-800 transition-colors duration-300"
                            aria-expanded={isAboutDropdownOpen}
                            aria-haspopup="true"
                          >
                            {item.name}
                            {isAboutDropdownOpen ? (
                              <ChevronUp size={18} className="ml-1" />
                            ) : (
                              <ChevronDown size={18} className="ml-1" />
                            )}
                          </button>

                          {isAboutDropdownOpen && (
                            <div className="absolute top-full left-0 bg-red-primary shadow-lg w-48 z-10">
                              <ul className="py-1">
                                {item.dropdownItems.map(
                                  (dropdownItem, dropdownIndex) => (
                                    <li key={dropdownIndex}>
                                      <Link
                                        to={dropdownItem.link}
                                        className="block px-4 py-2 text-red-50 hover:bg-red-800 transition-colors duration-300"
                                        onClick={() =>
                                          setIsAboutDropdownOpen(false)
                                        }
                                      >
                                        {dropdownItem.name}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.link}
                          className="text-white flex items-center px-4 py-4 hover:text-white hover:bg-red-800 transition-colors duration-300"
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  );
                }
              }
            })}
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
                  {item.hasDropdown ? (
                    <div>
                      <button
                        className={`font-bold py-4 pl-3 flex justify-between items-center w-full hover:bg-gray-50 transition-colors duration-300 ${
                          isActive(item) ? "text-red-700" : ""
                        }`}
                        onClick={() => toggleAboutDropdown()}
                      >
                        {item.name}
                        {isAboutDropdownOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>

                      {isAboutDropdownOpen && (
                        <ul className="bg-white">
                          {item.dropdownItems.map(
                            (dropdownItem, dropdownIndex) => (
                              <li key={dropdownIndex}>
                                <Link
                                  to={dropdownItem.link}
                                  className={`block py-3 pl-8 hover:bg-gray-100 transition-colors duration-300 ${
                                    location.pathname === dropdownItem.link
                                      ? "font-bold text-red-700"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setIsAboutDropdownOpen(false);
                                    setIsMenuOpen(false);
                                  }}
                                >
                                  {dropdownItem.name}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.link}
                      className={`font-bold py-4 pl-3 block hover:bg-gray-50 transition-colors duration-300 ${
                        isActive(item) ? "text-red-700" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Login */}
            <div className="mt-4">
              {isAuthenticated ? (
                <div className="flex justify-center items-center relative z-50">
                  <Link
                    to="/profile"
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className="bg-red-primary p-2 rounded-full block"
                  >
                    <User size={70} className="text-red-50" />
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigate("login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-6 py-2 border border-red-primary text-red-primary font-bold hover:bg-red-primary hover:text-white transition-colors duration-300"
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
