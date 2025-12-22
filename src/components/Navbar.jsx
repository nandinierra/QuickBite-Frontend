import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavbar } from "../hooks/useNavbar";

const NavLinkIndicator = ({ isActive }) => (
  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
);

const Navbar = () => {
  const {
    location, navigate, navbarBg, activeSection, menuOpen, setMenuOpen,
    profileDropdownOpen, setProfileDropdownOpen, cartLength, user, logoutBtn,
    handleScrollTo, getNavClass
  } = useNavbar();

  return (
    <nav className={`flex fixed top-0 left-0 w-full justify-between items-center z-50 px-4 sm:px-8 md:px-16 py-3 transition-all duration-300 ${navbarBg ? "glass-nav shadow-2xl" : location.pathname === "/" ? "bg-transparent py-5" : "glass-nav shadow-lg"}`}>
      {/* Logo */}
      <img onClick={() => { navigate("/", { replace: true }); setMenuOpen(false); }} className="h-11 sm:h-13 w-11 sm:w-13 rounded-full cursor-pointer hover:scale-125 transition-transform duration-300 shadow-lg hover:shadow-red-600/50 hover:shadow-xl" src="https://res.cloudinary.com/doicvqkvb/image/upload/v1756198168/QuickBite_qxnvys.png" alt="QuickBite Logo" />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
        {location.pathname === "/" && (!user || user.role !== "admin") && (
          <>
            <div className={getNavClass(activeSection === "categories")} onClick={() => handleScrollTo("categories")}>Categories<NavLinkIndicator isActive={activeSection === "categories"} /></div>
            <div className={getNavClass(activeSection === "popular")} onClick={() => handleScrollTo("popular")}>Popular Dishes<NavLinkIndicator isActive={activeSection === "popular"} /></div>
          </>
        )}
        {(!user || user.role !== "admin") && (
          <>
            <div className={getNavClass(location.pathname === "/aboutus")} onClick={() => navigate("/aboutus")}>About Us<NavLinkIndicator isActive={location.pathname === "/aboutus"} /></div>
            <div className={getNavClass(location.pathname === "/contactus")} onClick={() => navigate("/contactus")}>Contact Us<NavLinkIndicator isActive={location.pathname === "/contactus"} /></div>
          </>
        )}
        {user && user.role === "admin" && (
          <div className={getNavClass(location.pathname === "/admin")} onClick={() => navigate("/admin")}>Admin Panel<NavLinkIndicator isActive={location.pathname === "/admin"} /></div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 sm:gap-6">
        {user && user.role === "customer" && (
          <div className="relative cursor-pointer group" onClick={() => navigate("/cart")}>
            <FontAwesomeIcon className="text-xl sm:text-2xl text-white hover:text-red-400 transition-colors duration-300 group-hover:scale-125 transform" icon={faShoppingCart} />
            <span className="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-2 py-1 rounded-full hover:from-red-700 hover:to-red-800 shadow-lg group-hover:scale-110 transition-all">{cartLength}</span>
          </div>
        )}

        {user && (
          <div className="relative hidden md:block">
            <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="flex items-center gap-2 text-white hover:text-red-400 transition-colors duration-300 hover:scale-110 transform" title="User Profile">
              {user.profilePicture ? (
                <img src={user.profilePicture} alt={user.email} className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-orange-500 hover:border-red-400 transition-colors shadow-lg" />
              ) : (
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center border-2 border-orange-500 hover:border-red-400 transition-colors shadow-lg"><FontAwesomeIcon className="text-lg sm:text-xl text-white" icon={faUser} /></div>
              )}
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-red-600/30 overflow-hidden animate-in fade-in-50 duration-200">
                <div className="px-5 py-4 border-b border-red-600/20 bg-gradient-to-r from-red-600/10 to-transparent"><p className="text-white font-bold truncate text-sm">{user.email}</p></div>
                <button onClick={() => { navigate("/profile"); setProfileDropdownOpen(false); }} className="w-full text-left px-5 py-3 text-white hover:bg-red-600/20 transition-colors duration-300">👤 My Profile</button>
                <button onClick={logoutBtn} className="w-full text-left px-5 py-3 text-white hover:bg-red-600/20 transition-colors duration-300 border-t border-red-600/20">🚪 Logout</button>
              </div>
            )}
          </div>
        )}

        {user && !profileDropdownOpen && (
          <button onClick={logoutBtn} className="hidden md:block cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 sm:px-8 py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-300 hover:shadow-xl shadow-lg transform hover:scale-110">Logout</button>
        )}

        <div className="md:hidden text-white text-2xl sm:text-2xl cursor-pointer hover:text-red-400 transition-colors duration-300 hover:scale-125 transform" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md flex flex-col items-center py-4 sm:py-6 space-y-4 sm:space-y-6 md:hidden border-t border-red-600/20">
          {location.pathname === "/" && (!user || user.role !== "admin") && (
            <>
              <p className={getNavClass(activeSection === "categories")} onClick={() => handleScrollTo("categories")}>Categories</p>
              <p className={getNavClass(activeSection === "popular")} onClick={() => handleScrollTo("popular")}>Popular Dishes</p>
            </>
          )}
          {(!user || user.role !== "admin") && (
            <>
              <p className={getNavClass(location.pathname === "/aboutus")} onClick={() => { navigate("/aboutus"); setMenuOpen(false); }}>About Us</p>
              <p className={getNavClass(location.pathname === "/contactus")} onClick={() => { navigate("/contactus"); setMenuOpen(false); }}>Contact Us</p>
            </>
          )}
          {user && user.role === "admin" && <p className={getNavClass(location.pathname === "/admin")} onClick={() => { navigate("/admin"); setMenuOpen(false); }}>Admin Panel</p>}
          {user && <p className={getNavClass(location.pathname === "/profile")} onClick={() => { navigate("/profile"); setMenuOpen(false); }}>My Profile</p>}
          <button onClick={logoutBtn} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 cursor-pointer text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-lg transform hover:scale-105 w-full max-w-xs">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
