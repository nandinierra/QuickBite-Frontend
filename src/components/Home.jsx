import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Categories from "./Categories";
import PopularDishes from "./PopularDishes.jsx";
import Testimonials from "./Testimonials.jsx";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/context";

const Home = () => {
  const categoriesRef = useRef(null);
  const popularRef = useRef(null);
  const { user } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleScrollEvent = (e) => {
      if (e.detail === "categories") {
        window.scrollTo({
          top: categoriesRef.current.offsetTop - 80,
          behavior: "smooth",
        });
      } else if (e.detail === "popular") {
        window.scrollTo({
          top: popularRef.current.offsetTop - 80,
          behavior: "smooth",
        });
      }
    };
    window.addEventListener("scrollToSection", handleScrollEvent);
    return () => window.removeEventListener("scrollToSection", handleScrollEvent);
  }, []);


  useEffect(() => {
    if (location.state?.scrollTo === "categories") {
      window.scrollTo({
        top: categoriesRef.current.offsetTop - 80,
        behavior: "smooth",
      });
      window.history.replaceState({}, document.title);
    } else if (location.state?.scrollTo === "popular") {
      window.scrollTo({
        top: popularRef.current.offsetTop - 80,
        behavior: "smooth",
      });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="overflow-x-hidden bg-transparent text-white">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80"
          alt="Food banner"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#121212] flex flex-col justify-center items-start px-6 sm:px-10 md:px-20 lg:px-28">
          <div className="max-w-4xl text-left space-y-8 mt-10 animate-fadeIn">
            <div className="inline-block glass-panel px-6 py-2 rounded-full mb-2 border border-red-500/30">
              <p className="text-primary font-bold tracking-widest text-sm uppercase">Fast & Fresh Food Delivery</p>
            </div>
            <h1
              style={{ fontFamily: "Playfair Display" }}
              className="text-white text-5xl sm:text-6xl md:text-7xl font-bold leading-tight drop-shadow-2xl animate-slideInLeft"
            >
              Taste the <span className="text-gradient animate-pulse-gentle">Magic</span> <br />
              in Every Bite
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl drop-shadow-md animate-slideInRight delay-100">
              Craving something extraordinary? Experience gourmet meals delivered hot and fresh to your doorstep in minutes.
            </p>
            <div className="flex gap-4 animate-fadeIn delay-200">
              <button
                onClick={() => {
                  categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="cursor-pointer bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-10 py-4 rounded-full shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)] transform hover:scale-105 transition-all duration-300 font-bold text-lg"
              >
                Order Now
              </button>
              <button
                onClick={() => popularRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="cursor-pointer glass-panel text-white hover:bg-white/10 px-10 py-4 rounded-full transition-all duration-300 font-bold text-lg border border-white/10 hover:border-white/30"
              >
                View Popular
              </button>
            </div>
          </div>

          <div
            onClick={() => {
              categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce text-white/50 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faChevronDown} className="text-3xl" />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section
        ref={categoriesRef}
        className="relative py-20 bg-[#121212]"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="flex flex-col items-center justify-center text-center mb-16 px-4 animate-fadeIn">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white font-outfit">
            Explore Our <span className="text-gradient">Categories</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Curated selection of the finest cuisines to satisfy your every craving.
          </p>
        </div>

        <div id="categories-section" className="w-full">
          <Categories />
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section
        id="popular-section"
        ref={popularRef}
        className="py-16 bg-[#0f0f0f] relative"
      >
        <PopularDishes />
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#121212]">
        <Testimonials />
      </section>
    </div>
  );
};

export default Home;
