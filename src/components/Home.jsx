import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Categories from "./Categories";
import PopularDishes from "./PopularDishes.jsx";
import Testimonials from "./Testimonials.jsx";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const categoriesRef = useRef(null);
  const popularRef = useRef(null);
  const location = useLocation();

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
    
    <div className="overflow-x-hidden">
    
      <div className="relative w-full h-screen overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80"
          alt="Food banner"
        />

        
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black/70 flex flex-col justify-center items-start px-6 sm:px-10 md:px-20 lg:px-28">
          <div className="max-w-3xl text-left space-y-6 mt-2 animate-fadeIn">
            <div className="inline-block bg-red-600/20  backdrop-blur-sm border border-red-500 rounded-full px-4 py-2 mb-4">
              <p className="text-red-300 font-semibold text-sm "> Fast & Fresh Food Delivery</p>
            </div>
            <h1
              style={{ fontFamily: "Playfair" }}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-lg"
            >
              Fast, Fresh & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Flavorful</span> <br /> Delivered to Your Doorstep
            </h1>
            <p className="text-gray-100 text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md">
              Craving something tasty? QuickBite delivers your <br className="hidden md:block" /> favorite
              meals hot, fresh, and fast — right to your doorstep.
            </p>
            <button
              onClick={() => {
                categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-6 cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 md:px-10 md:py-4 rounded-full hover:shadow-2xl shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold text-base md:text-lg"
            >
              Order Now 
            </button>
          </div>

          {/* Scroll Down Icon */}
          <FontAwesomeIcon
            onClick={() => {
              categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-3xl sm:text-4xl cursor-pointer animate-bounce drop-shadow-lg hover:scale-110 transition-transform"
            icon={faChevronDown}
          />
        </div>
      </div>


      <section
        ref={categoriesRef}
        className="flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-24 py-24 bg-gradient-to-b from-white via-gray-50 to-white"
      >
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">Categories</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Discover delicious food across categories carefully curated to satisfy every craving. Choose
            from a variety of cuisines and dishes, all delivered fresh to your doorstep.
          </p>
        </div>

        <div
          id="categories-section"
          className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-12 mb-16"
        >
          <Categories />
        </div>

      </section>


      <section id="popular-section" ref={popularRef} className="bg-gradient-to-b from-gray-50 via-gray-50 to-white py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 pb-0">
        <PopularDishes />
      </section>

      <section className="pt-12 sm:pt-12 md:pt-12 bg-white">
        <Testimonials />
      </section>
    </div>
    
  );
};

export default Home;
