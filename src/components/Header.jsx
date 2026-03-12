import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useNotificationStore from "../store/useNotificationStore";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Bell,
  MessageCircle,
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  UserCheck,
  BookOpen,
  CalendarCheck,
  ChevronRight,
} from "lucide-react";
import passLogo from "../assets/images/logo/pass_logo.png";
import BtnPriRed from "./BtnPriRed";
import PopUpAnimation from "./PopUpAnimation";
import LeftAnimation from "./LeftAnimation";
import OpacityAnimation from "./OpacityAnimation";
import ChatModal from "./ChatModal";
import useChatStore from "../store/useChatStore";

// Items moved into the sidebar panel
const SIDEBAR_ITEMS = [
  { name: "Accounts", link: "/accounts", icon: Users },
  { name: "Document Request", link: "/request", icon: FileText },
  { name: "Transaction Report", link: "/transaction-report", icon: BarChart2 },
  { name: "Account Request", link: "/account-request", icon: UserCheck },
  { name: "AI Knowledge", link: "/ai-knowledge", icon: BookOpen },
  {
    name: "Clearance Schedule",
    link: "/clearance-meeting",
    icon: CalendarCheck,
  },
];

// Roles that get the sidebar panel
const SIDEBAR_ROLES = ["admin", "registrar", "teacher"];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, userRole, user } = useAuthStore();
  const { notifications, fetchNotifications } = useNotificationStore();
  const {
    unreadCount: chatUnreadCount,
    initializeSocket,
    fetchUnreadCount,
  } = useChatStore();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Initialize socket on mount so unread counts update even when chat is closed
  const { token } = useAuthStore();
  useEffect(() => {
    if (isAuthenticated && user && token) {
      initializeSocket(user, token);
      fetchUnreadCount(user._id);
    }
  }, [isAuthenticated]);

  const unreadCount = notifications.filter(
    (n) => n.notifStatus === "unread",
  ).length;

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow =
      isMenuOpen || isSidebarOpen ? "hidden" : "unset";

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isSidebarOpen]);

  const showSidebar = isAuthenticated && SIDEBAR_ROLES.includes(userRole);

  const isActive = (item) => {
    if (item.link) {
      if (item.link === "/" && location.pathname === "/") return true;
      if (item.link !== "/" && location.pathname === item.link) return true;
    }
    if (item.hasDropdown && item.name === "About") {
      return item.dropdownItems.some((d) => location.pathname === d.link);
    }
    return false;
  };

  const shouldShowMenuItem = (itemName) => {
    // Sidebar remove from main top nav
    const sidebarNames = SIDEBAR_ITEMS.map((i) => i.name);
    if (sidebarNames.includes(itemName) && showSidebar) return false;

    if (!isAuthenticated || !userRole) {
      return ["Home", "About", "News & Events", "Careers"].includes(itemName);
    }

    if (itemName === "Clearance Schedule" && userRole !== "teacher")
      return false;
    if (userRole === "registrar")
      return !["ReqDocs", "Transaction Report"].includes(itemName);
    if (userRole === "student") {
      return ![
        "Accounts",
        "Document Request",
        "Transaction Report",
        "Account Request",
        "AI Knowledge",
        "Clearance Schedule",
      ].includes(itemName);
    }
    if (userRole === "teacher") {
      return ![
        "ReqDocs",
        "Accounts",
        "Document Request",
        "Transaction Report",
        "Account Request",
        "AI Knowledge",
      ].includes(itemName);
    }
    if (userRole === "admin") {
      return !["ReqDocs", "Document Request", "Clearance Schedule"].includes(
        itemName,
      );
    }
    return true;
  };

  // Filter sidebar items by what each role should actually see
  const visibleSidebarItems = SIDEBAR_ITEMS.filter((item) => {
    if (item.name === "Clearance Schedule") return userRole === "teacher";
    if (userRole === "registrar")
      return !["Transaction Report"].includes(item.name);
    if (userRole === "teacher") return false;
    if (userRole === "admin")
      return !["Clearance Schedule"].includes(item.name);
    return true;
  });

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
    { name: "Document Request", link: "/request" },
    { name: "Transaction Report", link: "/transaction-report" },
    { name: "Account Request", link: "/account-request" },
    { name: "AI Knowledge", link: "/ai-knowledge" },
    { name: "Clearance Schedule", link: "/clearance-meeting" },
  ];

  // Filter menu items based on authentication and user role
  const filteredMenuItems = menuItems.filter((item) =>
    shouldShowMenuItem(item.name),
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full shadow-md text-red-50">
        <div
          className={`px-4 bg-red-primary md:bg-white md:px-8 transition-all duration-300 ${isScrolled ? "py-1" : "py-1"}`}
        >
          <div className="container flex items-center justify-between mx-auto">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center justify-center space-x-1 font-serif text-xl"
              >
                <PopUpAnimation>
                  <img
                    className={`rounded-full transition-all duration-300 ${isScrolled ? "w-10 sm:w-12 md:w-12" : "w-16 sm:w-16 md:w-[70px]"}`}
                    src={passLogo}
                    alt="PASS College Logo"
                  />
                </PopUpAnimation>
                <LeftAnimation>
                  <div className="flex flex-col font-bodoni">
                    <p
                      className={`font-bold text-red-50 md:text-red-primary transition-all duration-300 ${isScrolled ? "text-lg" : "text-2xl"}`}
                    >
                      PASS COLLEGE
                    </p>
                    <span
                      className={`font-bold text-red-50 md:text-red-primary -bottom-3 transition-all duration-300 ${isScrolled ? "text-xs" : "text-sm"}`}
                    >
                      {userRole === "admin"
                        ? "ADMIN"
                        : userRole === "teacher"
                          ? "TEACHER"
                          : userRole === "registrar"
                            ? "REGISTRAR"
                            : "OFFICIAL WEBSITE"}
                    </span>
                  </div>
                </LeftAnimation>
              </Link>
            </div>

            {/* Desktop right icons */}
            <div className="items-center hidden md:flex gap-3">
              {isAuthenticated ? (
                <div className="flex items-center justify-center space-x-2">
                  {/* Chat Icon */}
                  <div
                    className="relative hover:cursor-pointer"
                    onClick={() => setIsChatOpen(true)}
                  >
                    <PopUpAnimation>
                      <MessageCircle className="text-red-primary" size={30} />
                    </PopUpAnimation>
                    {/* Unread chat badge */}
                    {chatUnreadCount > 0 && (
                      <OpacityAnimation>
                        <div className="bg-red-primary px-2 -top-2 absolute -right-3 rounded-full text-red-50 text-[15px] font-bold">
                          {chatUnreadCount}
                        </div>
                      </OpacityAnimation>
                    )}
                  </div>

                  {/* Notification Icon */}
                  {userRole !== "admin" && (
                    <div
                      className="relative hover:cursor-pointer"
                      onClick={() => navigate("notifications")}
                    >
                      <PopUpAnimation>
                        <Bell className="text-red-primary" size={30} />
                      </PopUpAnimation>
                      <OpacityAnimation>
                        <div className="bg-red-primary px-2 -top-2 absolute -right-3 rounded-full text-red-50 text-[15px] font-bold">
                          {unreadCount}
                        </div>
                      </OpacityAnimation>
                    </div>
                  )}

                  {/* Panel button — only for roles with sidebar */}
                  {showSidebar && (
                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-primary text-red-primary hover:bg-red-50 transition text-sm font-semibold hover:cursor-pointer"
                    >
                      <LayoutDashboard size={18} />
                      <span>Panel</span>
                    </button>
                  )}

                  {/* Profile Picture */}
                  <Link to="/profile">
                    <PopUpAnimation>
                      <div className="bg-red-900 overflow-hidden rounded-full ml-1">
                        <img
                          className="w-12"
                          src={
                            user?.photo
                              ? `${user.photo}`
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                          alt={`User ${user.firstName}`}
                        />
                      </div>
                    </PopUpAnimation>
                  </Link>
                </div>
              ) : (
                <PopUpAnimation>
                  <BtnPriRed text={"Login"} navi={"login"} />
                </PopUpAnimation>
              )}
            </div>

            {/* Mobile right icons */}
            <div className="flex items-center justify-center space-x-4 md:hidden">
              {isAuthenticated && (
                <div
                  className="relative hover:cursor-pointer"
                  onClick={() => {
                    setIsChatOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <PopUpAnimation>
                    <MessageCircle className="text-red-50" size={24} />
                  </PopUpAnimation>
                  {/* Mobile unread chat badge */}
                  {chatUnreadCount > 0 && (
                    <OpacityAnimation>
                      <div className="bg-white px-1 sm:px-2 -top-2 -right-1 sm:-top-3 absolute sm:-right-3 rounded-full text-red-primary text-[11px] sm:text-[15px] font-bold">
                        {chatUnreadCount}
                      </div>
                    </OpacityAnimation>
                  )}
                </div>
              )}

              {/* Mobile Notification Icon */}
              {userRole !== "admin" && isAuthenticated && (
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
                      {unreadCount}
                    </div>
                  </OpacityAnimation>
                </div>
              )}

              <PopUpAnimation>
                <button
                  className="text-white"
                  onClick={() => setIsMenuOpen((v) => !v)}
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
              <ul className="flex items-center justify-center gap-1 text-sm">
                {filteredMenuItems.map((item, index) => (
                  <li
                    key={index}
                    className={`relative ${isActive(item) ? "border-b-4 border-yellow-400" : ""}`}
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
                          onClick={() => setIsAboutDropdownOpen((v) => !v)}
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
                              {item.dropdownItems.map((d, di) => (
                                <li key={di}>
                                  <Link
                                    to={d.link}
                                    className="block px-4 py-2 transition-colors duration-300 text-red-50 hover:bg-red-800"
                                    onClick={() =>
                                      setIsAboutDropdownOpen(false)
                                    }
                                  >
                                    {d.name}
                                  </Link>
                                </li>
                              ))}
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
            className={`fixed inset-0 md:hidden bg-white text-red-primary z-40 flex flex-col ${isScrolled ? "top-13" : "top-18"}`}
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
                            className={`font-bold py-4 pl-3 flex justify-between items-center w-full hover:bg-gray-50 transition-colors duration-300 ${isActive(item) ? "text-red-700" : ""}`}
                            onClick={() => setIsAboutDropdownOpen((v) => !v)}
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
                              {item.dropdownItems.map((d, di) => (
                                <li key={di}>
                                  <Link
                                    to={d.link}
                                    className={`block py-3 pl-8 hover:bg-gray-100 transition-colors duration-300 ${location.pathname === d.link ? "font-bold text-red-700" : ""}`}
                                    onClick={() => {
                                      setIsAboutDropdownOpen(false);
                                      setIsMenuOpen(false);
                                    }}
                                  >
                                    {d.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.link}
                          className={`font-bold py-4 pl-3 block hover:bg-gray-50 transition-colors duration-300 ${isActive(item) ? "text-red-700" : ""}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}

                  {/* Management section in mobile menu */}
                  {showSidebar && visibleSidebarItems.length > 0 && (
                    <>
                      <li className="pt-4 pb-1 pl-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                        Management
                      </li>
                      {visibleSidebarItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <li
                            key={`sb-${index}`}
                            className="border-b border-gray-200"
                          >
                            <Link
                              to={item.link}
                              className={`font-bold py-4 pl-3 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-300 ${location.pathname === item.link ? "text-red-700" : ""}`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <Icon
                                size={18}
                                className="text-red-primary opacity-70"
                              />
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                    </>
                  )}
                </ul>
              </nav>
            </div>

            {/* Fixed Bottom Section for Login/Profile */}
            <div className="flex-shrink-0 p-2 border-t border-gray-200 bg-red-primary py-5">
              {isAuthenticated ? (
                <div className="relative z-50 flex items-center justify-center text-center">
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col justify-center items-center"
                  >
                    <div className="w-32 bg-gray overflow-hidden rounded-full">
                      <img
                        src={
                          user?.photo
                            ? `${user.photo}`
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt={`User ${user.firstName}`}
                      />
                    </div>
                    <p className="text-white text-lg font-bold pt-2">
                      {user.firstName} {user.lastName}
                    </p>
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

      {/*RIGHT SIDEBAR PANEL*/}
      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 z-[70] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="bg-red-primary px-5 py-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={20} className="text-red-50" />
            <span className="text-red-50 font-bold text-lg tracking-wide">
              Management
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-red-50 hover:text-white hover:bg-red-800 rounded-full p-1 transition hover:cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Role badge */}
        <div className="px-5 py-3 bg-red-50 border-b border-red-100 flex-shrink-0">
          <span className="text-xs font-semibold uppercase tracking-widest text-red-primary opacity-70">
            {userRole === "admin"
              ? "Administrator"
              : userRole === "registrar"
                ? "Registrar"
                : "Teacher"}{" "}
            Panel
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="flex flex-col gap-1">
            {visibleSidebarItems.map((item, index) => {
              const Icon = item.icon;
              const active = location.pathname === item.link;
              return (
                <li key={index}>
                  <Link
                    to={item.link}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 group hover:cursor-pointer ${
                      active
                        ? "bg-red-primary text-white shadow-md"
                        : "text-gray-700 hover:bg-red-50 hover:text-red-primary"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={`flex-shrink-0 transition-colors ${active ? "text-white" : "text-red-primary opacity-70 group-hover:opacity-100"}`}
                    />
                    <span>{item.name}</span>
                    {!active && (
                      <ChevronRight
                        size={16}
                        className="ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar footer */}
        <div className="flex-shrink-0 border-t border-gray-100 px-5 py-4 bg-gray-50">
          <Link
            to="/profile"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="w-10 h-10 overflow-hidden rounded-full bg-red-900 flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                src={
                  user?.photo
                    ? `${user.photo}`
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt={user?.firstName}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-gray-800 truncate">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-gray-400 capitalize">
                {userRole}
              </span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default Header;
