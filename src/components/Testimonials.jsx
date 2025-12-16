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
    <section className="mt-24 mb-24 py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-red-600">⭐</span> What Our Customers Say
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Real experiences from food lovers who trust QuickBite
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="overflow-hidden">
          {mounted && (
            <Slider key={width} ref={sliderRef} {...settings}>
              {reviews.map((review) => (
                <div key={review.id} className="px-3 sm:px-4 min-w-0">
                  <div className="bg-gradient-to-br from-white to-red-50 rounded-3xl shadow-lg p-6 sm:p-8 text-center border-2 border-gray-100 hover:border-red-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                    
                    {/* Avatar */}
                    <div className="relative mb-6">
                      <img
                        src={review.photo}
                        alt={review.name}
                        className="w-20 h-20 rounded-full mx-auto border-4 border-red-600 shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-full border-4 border-red-600 opacity-0 group-hover:opacity-20 animate-pulse"></div>
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={`h-5 w-5 transition-all ${
                            i < review.rating ? "text-red-600" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-gray-700 italic mb-6 leading-relaxed text-sm sm:text-base flex-grow">
                      "{review.comment}"
                    </p>

                    {/* Name */}
                    <p className="font-semibold text-lg text-red-600">{review.name}</p>
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
