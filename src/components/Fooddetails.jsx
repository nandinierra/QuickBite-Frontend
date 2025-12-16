

import { useEffect, useState } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AOS from "aos";
import "aos/dist/aos.css";
import ClipLoader from "react-spinners/ClipLoader"
import { toast } from "react-toastify";
import { useCart } from "../context/context";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";

const Fooddetails = () => {
 
  const { addItemToCart } = useCart(); 
  const { category } = useParams();

  const [pizzas, setPizzas] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typefromurl = searchParams.get("type") || "All";
  const [selectedType, setSelectedType] = useState(typefromurl);
  const [searchTerm, setSearchTerm] = useState("");
  const [size, setSize] = useState("Regular");
 

  
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (!searchParams.get("type")) {
      setSearchParams({ type: "All" });
    }
  }, []);

  useEffect(() => {
    const details = async () => {
      try {
        let url = `${BASE_URL}/foodItems/filter/${category}?type=${selectedType}`;
        if (searchTerm) url += `&search=${searchTerm}`;
        const response = await fetch(url);
        const data = await response.json();
        setPizzas(data.food);
      } catch (e) {
        console.log("error fetching details", e);
      }
    };
    details();
  }, [selectedType, category, searchTerm]);

  const handleCategory = (e) => {
    setSelectedType(e.target.value);
    setSearchParams({ type: e.target.value });
  };


  const addToCart = async (id) => {
    try { 
      const itemData = { itemId: id, quantity:1, size };
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
      } else {
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


  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 mt-[70px] min-h-screen p-6">
     
      {(category !== "Desserts" && category !== "Beverages") && (
        <aside className="w-full lg:w-64 mb-6 lg:mb-0 bg-white shadow-md rounded-2xl p-5">
          <ul className="space-y-3 text-gray-700">
            {["All", "Veg", "Non-Veg", "Special"].map((type) => (
              <li key={type}>
                <input
                  onChange={handleCategory}
                  checked={selectedType === type}
                  value={type}
                  type="radio"
                  name="category"
                  id={type}
                  className="mr-2 accent-red-500 cursor-pointer"
                />
                <label htmlFor={type} className="cursor-pointer">{type}</label>
              </li>
            ))}
          </ul>
        </aside>
      )}

    

      <div className="flex-1 lg:ml-8">
        

          <div className="flex w-[80%] xl:w-full m-auto justify-center xl:justify-end mb-4">
  <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
    <input
      type="search"
      placeholder="Enter your food"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full py-3 pl-10 pr-4 border border-black rounded-3xl bg-white placeholder-gray-400 text-black"
    />
    <FontAwesomeIcon
      color="black"
      className="absolute top-1/2 left-4 -translate-y-1/2"
      icon={faSearch}
    />
  </div>
</div>
      


        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
          {pizzas.length === 0 ? (
            <div className='min-h-screen w-full md:ml-[600px] flex justify-center items-center'><ClipLoader color="#fb2c36"/></div>
          ) : (
            pizzas.map((pizza, index) => (
              <div
                key={pizza._id}
                data-aos="zoom-in-up"
                data-aos-delay={index * 100}

                className="bg-white mb-4  border-gray-200 shadow-md rounded-2xl overflow-hidden 
                transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-2xl 
                cursor-pointer border-2 border-transparent hover:border-gradient-to-r hover:from-orange-300 hover:to-red-400 
                w-[300px] "
              >
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="w-full h-48 object-cover transform transition duration-500 hover:scale-110 hover:brightness-110"
                />
                <div className="p-5 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">{pizza.name}</h3>
                  <p className="text-gray-600 text-sm mt-2">{pizza.description}</p>

                  
                  {(category === "Pizza") && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      <button onClick={() => setSize("Regular")}>
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Regular ₹{pizza.price.regular}
                        </span>
                      </button>
                      <button onClick={() => setSize("Medium")}>
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Medium ₹{pizza.price.medium}
                        </span>
                      </button>
                      <button onClick={() => setSize("Large")}>
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Large ₹{pizza.price.large}
                        </span>
                      </button>
                    </div>
                  )}

                  <p className="mt-2 font-bold">₹{pizza.price.medium}</p>

                  {/* Action buttons */}
                  <div className="flex justify-between items-center gap-3 mt-5">
                    <Link
                      to={`/food/${category}/${pizza._id}`}
                      className="w-1/2 text-center border border-gray-300 py-2 rounded-full font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 hover:scale-105 transition-all duration-300"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => addToCart(pizza._id)}
                      className="w-1/2 cursor-pointer text-center py-2 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 hover:shadow-lg hover:scale-110 hover:animate-pulse transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default Fooddetails;
