import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    id: 1,
    name: "Rahul Mehta",
    comment: "Loved the pizza! Fast delivery 🍕",
    rating: 5,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Priya Sharma",
    comment: "Burger was juicy & tasty 🍔",
    rating: 4,
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 3,
    name: "Arjun Reddy",
    comment: "Great service and fresh food 🥗",
    rating: 5,
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: 4,
    name: "Sneha Patel",
    comment: "Smoothies were super refreshing 🍓",
    rating: 5,
    photo: "https://randomuser.me/api/portraits/women/43.jpg",
  },
  {
    id: 5,
    name: "Vikram Singh",
    comment: "Amazing experience! Will order again 😋",
    rating: 5,
    photo: "https://randomuser.me/api/portraits/men/84.jpg",
  },
  {
    id: 6,
    name: "Aisha Khan",
    comment: "Loved the packaging and quick delivery 🚀",
    rating: 4,
    photo: "https://randomuser.me/api/portraits/women/77.jpg",
  },
];

const Testimonials = () => {
  // keep a ref and track window width so we can force re-init of the slider on mount/resize
  const sliderRef = useRef(null);
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const settings = {
    dots: false,
    autoplay: true,
    speed: 500,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    touchMove: true,
    adaptiveHeight: true,
    responsive: [
      {
        // <= 1200px: show 3
        breakpoint: 1200,
        settings: { slidesToShow: 3, slidesToScroll: 1, arrows: true },
      },
      {
        // <= 1024px: show 2
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, arrows: true },
      },
      {
        // <= 768px: show 2 but hide arrows (better touch UX)
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false },
      },
      {
        // <= 480px: single slide, arrows off, full swipe support
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">⭐ What Our Customers Say</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Real experiences from food lovers who trust QuickBite
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="overflow-hidden">
          {mounted && (
            <Slider key={width} ref={sliderRef} {...settings}>
              {reviews.map((review) => (
                <div key={review.id} className="px-3 sm:px-4 min-w-0 group">
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 sm:p-10 text-center border-2 border-gray-200 hover:border-red-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 h-full flex flex-col">
                    
                    {/* Top Accent */}
                    <div className="h-1 w-16 bg-gradient-to-r from-red-600 to-red-400 rounded-full mx-auto mb-8 group-hover:w-20 transition-all"></div>
                    
                    {/* Avatar */}
                    <div className="relative mb-10">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-red-600 blur-xl opacity-0 group-hover:opacity-40 transition-all"></div>
                      <img
                        src={review.photo}
                        alt={review.name}
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto border-4 border-white shadow-xl group-hover:scale-110 transition-transform relative z-10"
                      />
                      {/* <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                        ⭐
                      </div> */}
                    </div>

                    {/* Rating Stars */}
                    <div className="flex justify-center gap-2 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={`h-6 w-6 sm:h-7 sm:w-7 transition-all transform group-hover:scale-125 group-hover:rotate-12 ${
                            i < review.rating ? "text-yellow-400 drop-shadow-lg" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-gray-700 italic mb-8 leading-relaxed text-sm sm:text-base flex-grow font-medium">
                      "{review.comment}"
                    </p>

                    {/* Name and Badge */}
                    <div className="pt-8 border-t-2 border-gray-200 group-hover:border-red-300 transition">
                      <p className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-red-600 transition mb-2">{review.name}</p>
                      <div className="inline-block bg-red-50 border border-red-200 rounded-full px-4 py-1 group-hover:bg-red-100 transition">
                        <p className="text-xs font-semibold text-red-600">✓ Verified Customer</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
