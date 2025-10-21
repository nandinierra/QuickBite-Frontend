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
        lg:grid-cols-3 
        xl:grid-cols-5
        gap-4 
        justify-items-center 
        px-4
      "
    >
      {listOfCategories.map((eachCategory, index) => (
        <div
          key={eachCategory.id}
          data-aos="fade-up"
          data-aos-delay={index * 100}
          className="bg-white w-[220px] rounded-lg shadow-md transform transition-all duration-300 hover:scale-120 hover:rotate-2  hover:-translate-y-2 hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-gradient-to-r hover:from-orange-300 hover:to-red-400"
        >
          <img
            className="h-[150px] w-full rounded-t-lg object-cover transform transition duration-500 hover:scale-110 hover:brightness-110"
            src={eachCategory.image}
            alt={eachCategory.name}
          />
          <div className="px-5 py-2">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-lg">{eachCategory.name}</h1>
              <div className="flex items-center gap-1">
                <StarRating rating={eachCategory.rating} />
                <span className="text-sm text-gray-600">
                  {eachCategory.rating}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center my-3">
              <p className="font-medium text-gray-700">₹{eachCategory.price}</p>
              <Link to={`/food/${eachCategory.name}`}>
                <button
                  type="button"
                  className="border border-gray-300 p-1 px-4 rounded-full cursor-pointer text-sm font-semibold text-white bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 shadow-md hover:shadow-lg hover:scale-110 hover:animate-pulse transition-all duration-300"
                >
                  See more
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
