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
    <section className="mt-24 mb-24 py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold mb-10 text-center">
        <span className="text-yellow-500">⭐</span> Customer Reviews
      </h2>

      <div className="max-w-7xl mb-24 mx-auto">
        {/* ensure slider doesn't overflow on small devices */}
        <div className="overflow-hidden">
          {/* render slider only after mount and give it a key based on width so react-slick re-inits for the current viewport */}
          {mounted && (
            <Slider key={width} ref={sliderRef} {...settings}>
              {reviews.map((review) => (
                <div key={review.id} className="px-4 min-w-0">
                  <div
                    className="bg-gradient-to-br sm:ml-4 md:ml-0
               from-white to-red-50 rounded-3xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition-all"
                  >
                    <img
                      src={review.photo}
                      alt={review.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-red-500 shadow-sm"
                    />
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={`h-5 w-5 ${
                            i < review.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4 leading-relaxed">
                      “{review.comment}”
                    </p>
                    <p className="font-semibold text-red-600">{review.name}</p>
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
