import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useNotificationStore from "../store/useNotificationStore";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp, User, Bell } from "lucide-react";
import passLogo from "../assets/images/logo/pass_logo.png";
import BtnPriRed from "./BtnPriRed";
import PopUpAnimation from "./PopUpAnimation";
import LeftAnimation from "./LeftAnimation";
import OpacityAnimation from "./OpacityAnimation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, userRole, user } = useAuthStore();
  const { notifications } = useNotificationStore();

  //  scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

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

  // Helper function to determine if a menu item should be visible based on auth status and role
  const shouldShowMenuItem = (itemName) => {
    if (!isAuthenticated || userRole === null) {
      // When not authenticated, only show Home, About, News & Events, and Careers
      return ["Home", "About", "News & Events", "Careers"].includes(itemName);
    } else if (userRole === "teacher") {
      // For teachers, show Accounts and Request but hide ReqDocs and Transaction Report
      return itemName !== "ReqDocs" && itemName !== "Transaction Report";
    } else if (userRole === "student") {
      // For regular users, show ReqDocs but hide Accounts and Request
      return !["Accounts", "Request", "Transaction Report"].includes(itemName);
    } else if (userRole === "admin") {
      return !["ReqDocs", "Request"].includes(itemName);
    } else {
      // For other roles (admin, etc.)
      return true; // Show all menu items
    }
  };

  const menuItems = [
    { name: "Home", link: "/" },
    {
      name: "About",
      hasDropdown: true,
      dropdownItems: [
        { name: "About PASSIAN Education", link: "/about/who-we-are" },
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
    { name: "Request", link: "/request" },
    { name: "Transaction Report", link: "/transaction-report" },
  ];

  // Filter menu items based on authentication and user role
  const filteredMenuItems = menuItems.filter((item) =>
    shouldShowMenuItem(item.name)
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full shadow-md text-red-50">
      <div
        className={`px-4 bg-red-primary md:bg-white md:px-8 transition-all duration-300 ${
          isScrolled ? "py-1" : "py-1"
        }`}
      >
        <div className="container flex items-center justify-between mx-auto ">
          <div className="flex items-center ">
            <Link
              to="/"
              className="flex items-center justify-center space-x-1 font-serif text-xl "
            >
              <PopUpAnimation>
                <img
                  className={`rounded-full transition-all duration-300 ${
                    isScrolled
                      ? "w-10 sm:w-12 md:w-12"
                      : "w-16 sm:w-16 md:w-[70px]"
                  }`}
                  src={passLogo}
                  alt="PASS College Logo"
                />
              </PopUpAnimation>
              <LeftAnimation>
                <div className="flex flex-col font-bodoni">
                  <p
                    className={` font-bold text-red-50 md:text-red-primary transition-all duration-300 ${
                      isScrolled ? "text-lg" : "text-2xl"
                    }`}
                  >
                    PASS COLLEGE
                  </p>

                  <span
                    className={`font-bold text-red-50 md:text-red-primary -bottom-3 transition-all duration-300 ${
                      isScrolled ? "text-xs" : "text-sm"
                    }`}
                  >
                    {userRole === "admin"
                      ? "ADMIN USER"
                      : userRole === "teacher"
                      ? "TEACHER USER"
                      : "OFFICIAL WEBSITE"}
                  </span>
                </div>
              </LeftAnimation>
            </Link>
          </div>

          <div className="items-center hidden md:flex">
            {isAuthenticated ? (
              <div className="flex items-center justify-center space-x-2 ">
                <Link to={"/profile"}>
                  <PopUpAnimation>
                    <div className=" bg-red-900 overflow-hidden rounded-full">
                      <img
                        className="w-12"
                        src={`http://127.0.0.1:5000${user.photo}`}
                        alt={`User ${user.firsName}`}
                      />
                    </div>
                  </PopUpAnimation>
                </Link>
                {userRole === "student" && isAuthenticated && (
                  <div
                    className="relative hover:cursor-pointer"
                    onClick={() => {
                      navigate("notifications");
                    }}
                  >
                    <PopUpAnimation>
                      <Bell className="text-red-primary" size={30} />
                    </PopUpAnimation>
                    <OpacityAnimation>
                      <div className="bg-red-primary px-2 -top-2 absolute -right-3 rounded-full text-red-50 text-[15px] font-bold">
                        {
                          notifications.filter(
                            (n) => n.notifStatus === "unread"
                          ).length
                        }
                      </div>
                    </OpacityAnimation>
                  </div>
                )}
              </div>
            ) : (
              <PopUpAnimation>
                <BtnPriRed text={"Login"} navi={"login"} />
              </PopUpAnimation>
            )}
          </div>

          <div className="flex items-center justify-center space-x-4 md:hidden">
            {isAuthenticated && userRole === "student" && (
              <div
                className="relative hover:cursor-pointer"
                onClick={() => {
                  navigate("notifications");
                  setIsMenuOpen(false);
                }}
              >
                <PopUpAnimation>
                  {" "}
                  <Bell className="text-red-50" size={24} />
                </PopUpAnimation>
                <OpacityAnimation>
                  <div className="bg-white px-1 sm:px-2 -top-2 -right-1 sm:-top-3 absolute sm:-right-3 rounded-full text-red-primary text-[11px] sm:text-[15px] font-bold">
                    {
                      notifications.filter((n) => n.notifStatus === "unread")
                        .length
                    }
                  </div>
                </OpacityAnimation>
              </div>
            )}

            <PopUpAnimation>
              <button
                className="text-white "
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </PopUpAnimation>
          </div>
        </div>
      </div>

      {/* Main navigation - Desktop */}
      <nav className="hidden md:block bg-red-primary">
        <PopUpAnimation>
          <div className="container mx-auto">
            <ul className="flex items-center justify-center gap-1 text-sm ">
              {filteredMenuItems.map((item, index) => (
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
                        className="flex items-center px-4 py-4 transition-colors duration-300 text-red-50 hover:text-white hover:bg-red-800"
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
                        <div className="absolute left-0 z-10 w-48 shadow-lg top-full bg-red-primary">
                          <ul className="py-1">
                            {item.dropdownItems.map(
                              (dropdownItem, dropdownIndex) => (
                                <li key={dropdownIndex}>
                                  <Link
                                    to={dropdownItem.link}
                                    className="block px-4 py-2 transition-colors duration-300 text-red-50 hover:bg-red-800"
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
                      className="flex items-center px-4 py-4 text-white transition-colors duration-300 hover:text-white hover:bg-red-800"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </PopUpAnimation>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 md:hidden bg-white text-red-primary z-40 flex flex-col ${
            isScrolled ? "top-13 " : "top-18"
          }`}
        >
          {/*Content Container */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4">
              <ul className="flex flex-col">
                {filteredMenuItems.map((item, index) => (
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
            </nav>
          </div>

          {/* Fixed Bottom Section for Login/Profile */}
          <div className="flex-shrink-0 p-2 border-t border-gray-200 bg-red-primary">
            {isAuthenticated ? (
              <div className="relative z-50 flex items-center justify-center text-center">
                <Link
                  to="/profile"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className=""
                >
                  <div className="bg-gray overflow-hidden rounded-full">
                    <img
                      className="w-32"
                      src={`http://127.0.0.1:5000${user.photo}`}
                      alt={`User ${user.firsName}`}
                    />
                  </div>
                  <span className="text-white text-lg font-bold">
                    {user.firstName + " " + user.lastName}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="py-6">
                <button
                  onClick={() => {
                    navigate("login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-6 py-2 font-bold transition-colors duration-300 border rounded-full border-white text-white hover:bg-red-primary hover:text-white"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
