

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import { faShoppingCart, faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {useCart} from "../context/context";


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navbarBg, setNavbarBg] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { cartLength, user, logout } = useCart();

  const handleScroll = () => {
    if (location.pathname === "/") {
      setNavbarBg(window.scrollY > 50);
    } else {
      setNavbarBg(true);
    }

    if (location.pathname === "/") {
      const categories = document.getElementById("categories-section");
      const popular = document.getElementById("popular-section");
      const scrollPos = window.scrollY + window.innerHeight / 2;

      if (popular && scrollPos >= popular.offsetTop) setActiveSection("popular");
      else if (categories && scrollPos >= categories.offsetTop) setActiveSection("categories");
      else setActiveSection("");
    }
  };

  const logoutBtn = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleScrollTo = (section) => {
    setActiveSection(section);
    if (location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("scrollToSection", { detail: section }));
    } else {
      navigate("/", { state: { scrollTo: section } });
    }
    setMenuOpen(false);
  };

  const getNavClass = (isActive) =>
    `cursor-pointer pb-1 transition-all duration-300 text-lg ${
      isActive
        ? "border-b-2 border-red-500 text-red-400"
        : "text-white hover:text-red-400 hover:border-b-2 hover:border-red-400"
    }`;

  return (
    <nav
      className={`flex fixed top-0 left-0 w-full justify-between items-center z-20 px-4 sm:px-6 md:px-16 py-2 sm:py-3 transition-all duration-300 ${
        navbarBg
          ? "bg-black/95 backdrop-blur-md border-b border-red-600/20"
          : location.pathname === "/"
          ? "bg-black/40 backdrop-blur-sm"
          : "bg-black/95 backdrop-blur-md"
      }`}
    >
      {/* Logo */}
      <img
        onClick={() => {
          navigate("/", { replace: true });
          setMenuOpen(false);
        }}
        className="h-10 sm:h-12 w-10 sm:w-12 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
        src="https://res.cloudinary.com/doicvqkvb/image/upload/v1756198168/QuickBite_qxnvys.png"
        alt="QuickBite Logo"
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        {location.pathname === "/" && (
          <>
            <p
              className={getNavClass(activeSection === "categories")}
              onClick={() => handleScrollTo("categories")}
            >
              Categories
            </p>
            <p
              className={getNavClass(activeSection === "popular")}
              onClick={() => handleScrollTo("popular")}
            >
              Popular Dishes
            </p>
          </>
        )}
        <p
          className={getNavClass(location.pathname === "/aboutus")}
          onClick={() => navigate("/aboutus")}
        >
          About Us
        </p>
        <p
          className={getNavClass(location.pathname === "/contactus")}
          onClick={() => navigate("/contactus")}
        >
          Contact Us
        </p>
        {user && user.role === "admin" && (
          <p
            className={getNavClass(location.pathname === "/admin")}
            onClick={() => navigate("/admin")}
          >
            Admin Panel
          </p>
        )}
      </div>

      {/* Right Side (Cart + Profile + Logout) */}
      <div className="flex items-center gap-3 sm:gap-4">

  {user && user.role === "customer" && (
    <div 
      className="relative cursor-pointer group"
      onClick={() => navigate("/cart")}
    >
      <FontAwesomeIcon
        className="text-xl sm:text-2xl text-white hover:text-red-400 transition-colors duration-300 group-hover:scale-110 transform"
        icon={faShoppingCart}
      />
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full hover:bg-red-700">
        {cartLength}
      </span>
    </div>
  )}

  {user && (
    <div className="relative hidden md:block">
      <button
        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
        className="flex items-center gap-2 text-white hover:text-red-400 transition-colors"
        title="User Profile"
      >
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.email}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-orange-500 hover:border-red-400 transition-colors"
          />
        ) : (
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center border-2 border-orange-500 hover:border-red-400 transition-colors">
            <FontAwesomeIcon
              className="text-lg sm:text-xl text-white"
              icon={faUser}
            />
          </div>
        )}
      </button>
      
      {profileDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-md rounded-lg shadow-lg border border-red-600/20 overflow-hidden">
          <div className="px-4 py-3 border-b border-red-600/20">
            <p className="text-white font-semibold truncate">{user.email}</p>
          </div>
          <button
            onClick={() => {
              navigate("/profile");
              setProfileDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-white hover:bg-red-600/20 transition-colors"
          >
            My Profile
          </button>
          <button
            onClick={() => {
              logoutBtn();
              setProfileDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-white hover:bg-red-600/20 transition-colors border-t border-red-600/20"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )}

  {user && !profileDropdownOpen && (
    <button
      onClick={logoutBtn}
      className="hidden md:block cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
    >
      Logout
    </button>
  )}

  <div
    className="md:hidden text-white text-xl sm:text-2xl cursor-pointer hover:text-red-400 transition-colors"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
  </div>

      </div>


      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md flex flex-col items-center py-4 sm:py-6 space-y-4 sm:space-y-6 md:hidden border-t border-red-600/20">
          {location.pathname === "/" && (
            <>
              <p
                className={getNavClass(activeSection === "categories")}
                onClick={() => handleScrollTo("categories")}
              >
                Categories
              </p>
              <p
                className={getNavClass(activeSection === "popular")}
                onClick={() => handleScrollTo("popular")}
              >
                Popular Dishes
              </p>
            </>
          )}
          <p
            className={getNavClass(location.pathname === "/aboutus")}
            onClick={() => {
              navigate("/aboutus");
              setMenuOpen(false);
            }}
          >
            About Us
          </p>
          <p
            className={getNavClass(location.pathname === "/contactus")}
            onClick={() => {
              navigate("/contactus");
              setMenuOpen(false);
            }}
          >
            Contact Us
          </p>
          {user && user.role === "admin" && (
            <p
              className={getNavClass(location.pathname === "/admin")}
              onClick={() => {
                navigate("/admin");
                setMenuOpen(false);
              }}
            >
              Admin Panel
            </p>
          )}

          {user && (
            <p
              className={getNavClass(location.pathname === "/profile")}
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
            >
              My Profile
            </p>
          )}

          <button
            onClick={() => {
              logoutBtn();
              setMenuOpen(false);
            }}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 cursor-pointer text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-lg transform hover:scale-105 w-full max-w-xs"
          >
            Logout
          </button>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
