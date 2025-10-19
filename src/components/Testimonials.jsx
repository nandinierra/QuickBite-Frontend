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
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4, // 🖥 Default for large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1536, // Extra Large / Wide Screens
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1280, // Laptop / Small Desktop
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024, // Medium Tablet / Small Laptop
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768, // Tablet
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640, // Mobile
        settings: {
          slidesToShow: 1,
          centerMode: true, // Centers the single card
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <section className="mt-24 py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold mb-10 text-center">
        <span className="text-yellow-500">⭐</span> Customer Reviews
      </h2>

      <div className="max-w-7xl mx-auto">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="px-4">
              <div className="bg-gradient-to-br from-white to-red-50 rounded-3xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition-all">
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
      </div>
    </section>
  );
};

export default Testimonials;
