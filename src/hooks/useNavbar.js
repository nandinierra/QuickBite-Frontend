import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/context";

export const useNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [navbarBg, setNavbarBg] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const { cartLength, user, logout } = useCart();

    const handleScroll = () => {
        if (location.pathname === "/") setNavbarBg(window.scrollY > 50);
        else setNavbarBg(true);

        if (location.pathname === "/") {
            const categories = document.getElementById("categories-section");
            const popular = document.getElementById("popular-section");
            const scrollPos = window.scrollY + window.innerHeight / 2;
            if (popular && scrollPos >= popular.offsetTop) setActiveSection("popular");
            else if (categories && scrollPos >= categories.offsetTop) setActiveSection("categories");
            else setActiveSection("");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location]);

    const handleScrollTo = (section) => {
        setActiveSection(section);
        if (location.pathname === "/") window.dispatchEvent(new CustomEvent("scrollToSection", { detail: section }));
        else navigate("/", { state: { scrollTo: section } });
        setMenuOpen(false);
    };

    const logoutBtn = () => {
        logout();
        navigate("/login", { replace: true });
        setProfileDropdownOpen(false);
        setMenuOpen(false);
    };

    const getNavClass = (isActive) => `cursor-pointer text-base font-medium transition-all duration-300 relative group ${isActive ? "text-primary" : "text-gray-300 hover:text-white"}`;

    return {
        location,
        navigate,
        navbarBg,
        activeSection,
        menuOpen,
        setMenuOpen,
        profileDropdownOpen,
        setProfileDropdownOpen,
        cartLength,
        user,
        logoutBtn,
        handleScrollTo,
        getNavClass
    };
};
