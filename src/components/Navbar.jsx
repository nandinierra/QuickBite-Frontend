import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navbarBg, setNavbarBg] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
    Cookies.remove("jwt_token");
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
      className={`flex fixed top-0 left-0 w-full justify-between items-center z-20 px-6 md:px-16 py-3 transition-all duration-300 ${
        navbarBg
          ? "bg-black/90 backdrop-blur-sm"
          : location.pathname === "/"
          ? "bg-black/40"
          : "bg-black/90"
      }`}
    >
      {/* Logo */}
      <img
        onClick={() => {
          navigate("/", { replace: true });
          setMenuOpen(false);
        }}
        className="h-[45px] w-[45px] rounded-full cursor-pointer"
        src="https://res.cloudinary.com/doicvqkvb/image/upload/v1756198168/QuickBite_qxnvys.png"
        alt="QuickBite Logo"
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
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
      </div>

      {/* Right Side (Cart + Logout) */}
      <div className="flex items-center space-x-4">
        <FontAwesomeIcon
          onClick={() => navigate("/cart")}
          className="text-2xl text-white hover:text-red-400 cursor-pointer transition-colors duration-300"
          icon={faShoppingCart}
        />
        <button
          onClick={logoutBtn}
          className="hidden md:block bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300"
        >
          Logout
        </button>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-black/95 backdrop-blur-sm flex flex-col items-center py-6 space-y-6 md:hidden z-10">
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
          <button
            onClick={() => {
              logoutBtn();
              setMenuOpen(false);
            }}
            className="bg-red-600 text-white px-8 py-2 rounded-full hover:bg-red-700 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
