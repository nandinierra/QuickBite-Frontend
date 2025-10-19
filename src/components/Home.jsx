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

  // ✅ Handle navbar scroll events
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

  // ✅ Handle navigation from another page
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
      {/* HERO SECTION */}
      <div className="relative w-full h-screen">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80"
          alt="Food banner"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-black/60 flex flex-col justify-center items-start px-6 sm:px-10 md:px-20 lg:px-28">
          <div className="max-w-3xl text-left space-y-6">
            <h1
              style={{ fontFamily: "Playfair" }}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            >
              Fast, Fresh & Flavorful <br /> Delivered to Your Doorstep
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed">
              Craving something tasty? QuickBite delivers your <br className="hidden md:block" /> favorite
              meals hot, fresh, and fast — right to your doorstep.
            </p>
            <button
              onClick={() => {
                categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-4 cursor-pointer bg-red-600 text-white px-6 py-3 md:px-8 md:py-3 rounded-full hover:bg-red-700 transition-all duration-300"
            >
              Order Now
            </button>
          </div>

          {/* Scroll Down Icon */}
          <FontAwesomeIcon
            onClick={() => {
              categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-3xl sm:text-4xl cursor-pointer animate-bounce"
            icon={faChevronDown}
          />
        </div>
      </div>


      <section
        ref={categoriesRef}
        className="flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-24 py-20 bg-white"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Categories</h1>
        <p className="text-[#778095] text-base sm:text-lg md:text-xl max-w-3xl mb-12">
          Discover delicious food across categories carefully curated to satisfy every craving. Choose
          from a variety of cuisines and dishes, all delivered fresh to your doorstep.
        </p>

        <div
          id="categories-section"
          className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-12 mb-16"
        >
          <Categories />
        </div>
      </section>


      <section id="popular-section" ref={popularRef} className="bg-gray-50 py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <PopularDishes />
      </section>


      <section className="py-20 bg-white">
        <Testimonials />
      </section>
    </div>
  );
};

export default Home;
