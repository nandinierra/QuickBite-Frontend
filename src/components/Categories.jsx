import StarRating from "./StarRating";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Categories = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  const listOfCategories = [
    {
      id: uuid(),
      image: "https://i.pinimg.com/1200x/45/11/81/45118123f9d170ef6fef2146255b2f82.jpg",
      name: "Pizza",
      rating: 4.8,
      price: 99,
    },
    {
      id: uuid(),
      image: "https://i.pinimg.com/736x/67/54/2d/67542d5f476d6504046007f1d5637b74.jpg",
      name: "Burger",
      rating: 4.5,
      price: 49,
    },
    {
      id: uuid(),
      image: "https://i.pinimg.com/1200x/5c/e3/2e/5ce32e3df8781d8531524836b5079d7a.jpg",
      name: "Beverages",
      rating: 5.0,
      price: 30,
    },
    {
      id: uuid(),
      image: "https://i.pinimg.com/736x/b5/3c/a4/b53ca45d717c19cb3f6d5680e1ae1982.jpg",
      name: "Desserts",
      rating: 4.9,
      price: 59,
    },
    {
      id: uuid(),
      image: "https://i.pinimg.com/1200x/e6/ea/07/e6ea073d3243c661b6cc56bdb5ba11f6.jpg",
      name: "Salads",
      rating: 4.2,
      price: 79,
    },
  ];

  return (
    <section className="relative w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">


      {/* Soft ambient background */}

      <div className="absolute inset-0 -z-10 bg-transparent"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center">
        {listOfCategories.map((eachCategory, index) => (
          <Link
            to={`/food/${eachCategory.name}`}
            key={eachCategory.id}
            className="group w-full max-w-[260px] block h-full"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <div
              className="
                relative h-full glass-panel
                rounded-[1.8rem] border border-white/10
                shadow-2xl
                hover:border-primary/50
                transition-all duration-500 ease-out
                hover:-translate-y-3
                overflow-hidden flex flex-col
              "
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-red-500/10 via-transparent to-transparent"></div>

              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={eachCategory.image}
                  alt={eachCategory.name}
                  className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-125"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow flex items-center gap-1">
                  <StarRating rating={eachCategory.rating} />
                  <span className="text-xs font-bold text-gray-800">
                    {eachCategory.rating}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 flex flex-col flex-grow text-center">
                <h3 className="text-xl font-extrabold tracking-tight text-white mb-1 transition-colors duration-300 group-hover:text-primary">
                  {eachCategory.name}
                </h3>

                <p className="text-gray-400 text-xs mb-5">
                  Starting from{" "}
                  <span className="text-white font-bold text-base">
                    ₹{eachCategory.price}
                  </span>
                </p>

                <button
                  className="
                    mt-auto w-full py-3 rounded-xl
                    bg-gradient-to-r from-red-500 to-red-600
                    text-white font-bold text-xs uppercase tracking-widest
                    flex items-center justify-center gap-2
                    transition-all duration-500
                    hover:gap-4 hover:shadow-[0_15px_40px_rgba(239,68,68,0.5)]
                  "
                >
                  Explore
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
