import StarRating from "./StarRating";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Categories = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const listOfCategories = [
    {
      id: uuid(),
      image:
        "https://i.pinimg.com/1200x/45/11/81/45118123f9d170ef6fef2146255b2f82.jpg",
      name: "Pizza",
      rating: 3.5,
      price: 99,
    },
    {
      id: uuid(),
      image:
        "https://i.pinimg.com/736x/67/54/2d/67542d5f476d6504046007f1d5637b74.jpg",
      name: "Burger",
      rating: 4.5,
      price: 49,
    },
    {
      id: uuid(),
      image:
        "https://i.pinimg.com/1200x/5c/e3/2e/5ce32e3df8781d8531524836b5079d7a.jpg",
      name: "Beverages",
      rating: 5.0,
      price: 30,
    },
    {
      id: uuid(),
      image:
        "https://i.pinimg.com/736x/b5/3c/a4/b53ca45d717c19cb3f6d5680e1ae1982.jpg",
      name: "Desserts",
      rating: 4.8,
      price: 59,
    },
    {
      id: uuid(),
      image:
        "https://i.pinimg.com/1200x/e6/ea/07/e6ea073d3243c661b6cc56bdb5ba11f6.jpg",
      name: "Salads",
      rating: 3.9,
      price: 79,
    },
  ];

  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        xl:grid-cols-5
        gap-4 sm:gap-6
        justify-items-center 
        px-4 sm:px-6 md:px-0
        w-full
      "
    >
      {listOfCategories.map((eachCategory, index) => (
        <div
          key={eachCategory.id}
          data-aos="fade-up"
          data-aos-delay={index * 100}
          className="bg-white w-full max-w-xs rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-4 hover:shadow-2xl cursor-pointer border border-gray-200 hover:border-red-500 group"
        >
          <div className="relative overflow-hidden h-48 sm:h-56">
            <img
              className="h-full w-full object-cover transform transition duration-500 group-hover:scale-130 group-hover:brightness-125"
              src={eachCategory.image}
              alt={eachCategory.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </div>
          
          <div className="px-5 py-6 sm:py-7">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h1 className="font-bold text-lg sm:text-xl text-gray-800 group-hover:text-red-600 transition">{eachCategory.name}</h1>
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 rounded-full border border-yellow-200">
                <StarRating rating={eachCategory.rating} />
                <span className="text-xs sm:text-sm font-bold text-yellow-700">
                  {eachCategory.rating}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center gap-3 pt-3 border-t border-gray-100">
              <p className="font-bold text-lg sm:text-xl text-red-600">₹{eachCategory.price}</p>
              <Link to={`/food/${eachCategory.name}`} className="flex-1">
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 p-2 px-4 rounded-xl cursor-pointer text-xs sm:text-sm font-bold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  View 🔍
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
