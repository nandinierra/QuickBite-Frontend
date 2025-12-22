

import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from "../context/context";
import { toast } from "react-toastify";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";

const PopularDishes = () => {
  const { addItemToCart } = useCart();
  const [popularDishes, setPopularDishes] = useState([]);

  useEffect(() => {
    const getPopularDishes = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/foodItems/popular/get`);
        const data = await response.json();
        if (response.ok) setPopularDishes(data.food);
      } catch (error) {
        console.error("Error fetching popular dishes:", error);
      }
    };
    getPopularDishes();
  }, []);


  const handleAddToCart = async (dish) => {

    try {
      const itemData = { itemId: dish._id, quantity: 1, size: "regular" };
      const result = await addItemToCart(itemData);

      if (result.success) {
        if (result.isNewItem) {
          toast.success(`Item successfully added to cart!`, {
            position: "bottom-right",
            autoClose: 1500,
          });
        } else {
          toast.info(`Quantity updated in cart!`, {
            position: "bottom-right",
            autoClose: 1500,
          });
        }
      }
      else {
        toast.error("Failed to update cart", {
          position: "top-right",
          autoClose: 1500,
        });
      }

    } catch (err) {
      console.log("Error adding to cart:", err);
      toast.error("Failed to add item to cart", {
        position: "top-right",
        autoClose: 1500,
      });
    }


  };



  const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const FireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
        clipRule="evenodd"
      />
    </svg>
  );


  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1536, // ≤1536px
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1280, // ≤1280px
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024, // ≤1024px
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 900, // extra safety layer for tablets
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768, // ≤768px
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480, // ≤480px
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };


  return (
    <section className="sm:py-8 bg-transparent px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">

        <div className="text-center mb-16 sm:mb-20 animate-fade-in">
          <h2 className="sm:text-4xl font-bold text-white mb-4 animate-fade-in">
            <span className="text-gradient">Most Popular</span> Dishes
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            Customer favorites from across all categories. These dishes are loved by everyone!
          </p>
        </div>


        <div className="popular-dishes-carousel mb-0">
          <Slider {...settings}>

            {popularDishes.map((dish) => (
              <div key={dish._id} className="px-3 sm:px-4 flex justify-center py-4">
                <div className="glass-panel w-full max-w-sm rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-4 transition-all duration-300 border border-white/10 hover:border-primary/50 transform group">

                  <div className="relative h-44 sm:h-56 bg-gray-200 overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-120 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center shadow-lg font-bold text-gray-800 border border-white/20">
                      <StarIcon />
                      <span className="ml-1.5">{dish.rating}</span>
                    </div>
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center shadow-lg">
                      <FireIcon />
                      <span className="ml-1.5">Trending</span>
                    </div>
                  </div>


                  <div className="p-5 sm:p-6 flex flex-col h-56 sm:h-64">
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-2 flex-grow group-hover:text-primary transition">{dish.name}</h3>
                      <span className="bg-primary/20 text-primary text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0 border border-primary/30">
                        {dish.category}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm line-clamp-2 flex-grow mb-4">{dish.description}</p>

                    <div className="flex justify-between items-center gap-3 mt-auto pt-4 border-t border-white/10">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">₹{dish.price.regular}</span>
                      <button
                        onClick={() => handleAddToCart(dish)}
                        className="bg-gradient-to-r from-red-600 to-red-700 cursor-pointer hover:from-red-700 hover:to-red-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Add 🛒
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}

          </Slider>
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;


