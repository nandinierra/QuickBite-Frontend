import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
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

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer glass-panel text-white hover:bg-primary hover:text-white rounded-full p-3 shadow-lg transition-all duration-300 -mr-2 sm:-mr-12 border border-white/10 hover:border-primary"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute left-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer glass-panel text-white hover:bg-primary hover:text-white rounded-full p-3 shadow-lg transition-all duration-300 -ml-2 sm:-ml-12 border border-white/10 hover:border-primary"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </div>
  );
};

const Testimonials = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
            See why thousands of food lovers trust QuickBite for their daily meals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
          {mounted && (
            <Slider {...settings}>
              {reviews.map((review) => (
                <div key={review.id} className="outline-none py-10 px-2">
                  <div className="glass-panel rounded-[2.5rem] shadow-2xl p-8 sm:p-12 text-center mx-auto max-w-3xl relative transform transition-all duration-500 hover:scale-[1.02] border border-white/10">

                    <div className="absolute top-6 left-8 text-white/10 text-6xl -z-0">
                      <FontAwesomeIcon icon={faQuoteLeft} />
                    </div>

                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-20 transform translate-y-2"></div>
                      <img
                        src={review.photo}
                        alt={review.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white/10 shadow-lg object-cover relative z-10 mx-auto"
                      />
                    </div>

                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={`text-lg ${i < review.rating ? "text-secondary drop-shadow-sm" : "text-gray-600"
                            }`}
                        />
                      ))}
                    </div>

                    <blockquote className="text-xl sm:text-2xl text-gray-200 italic font-medium leading-relaxed mb-8 relative z-10 font-playfair">
                      "{review.comment}"
                    </blockquote>

                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{review.name}</h4>
                      <div className="flex items-center justify-center gap-2">
                        <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-primary/30">
                          ✓ Verified Customer
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>

      <style>{`
        .slick-dots {
            bottom: -40px;
        }
        .slick-dots li button:before {
          font-size: 12px;
          color: #cbd5e1;
          opacity: 1;
          transition: all 0.3s;
        }
        .slick-dots li.slick-active button:before {
          color: #dc2626;
          font-size: 14px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
