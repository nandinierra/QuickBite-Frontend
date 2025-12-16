

import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from "../context/context";
import { toast } from "react-toastify";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";

const PopularDishes = () => {
  const {addItemToCart} = useCart();
  const [popularDishes, setPopularDishes] = useState([]);

  useEffect(() => {
    const getPopularDishes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/foodItems/popular/get`);
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
        const itemData = {  itemId: dish._id, quantity: 1, size: dish.price.regular };
        const result=  await addItemToCart(itemData);

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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Most Popular Dishes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Customer favorites from across all categories. These dishes are loved by everyone!
          </p>
        </div>

        
        <div className="popular-dishes-carousel mb-12">
          <Slider {...settings}>

            {popularDishes.map((dish) => (
              <div key={dish._id} className="px-3 flex justify-center ">
                <div className="bg-white mr-3 w-[350px] sm:w-[280px] md:w-[280px] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center shadow-sm">
                      <StarIcon />
                      <span className="font-semibold text-gray-700 ml-1">{dish.rating}</span>
                    </div>
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <FireIcon />
                      <span className="ml-1">Popular</span>
                    </div>
                  </div>

                  
                  <div className="p-5 flex flex-col h-58">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800 truncate">{dish.name}</h3>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {dish.category}
                      </span>
                    </div>

                    <p className="text-gray-600 line-clamp-2 flex-grow mb-3">{dish.description}</p>

                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-2xl font-bold text-red-500">₹{dish.price.regular}</span>
                      <button
                        onClick={() => handleAddToCart(dish)}
                        className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                      >
                        Add to Cart
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


