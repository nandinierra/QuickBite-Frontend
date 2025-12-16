

import { useEffect, useState } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AOS from "aos";
import "aos/dist/aos.css";
import ClipLoader from "react-spinners/ClipLoader"
import { toast } from "react-toastify";
import { useCart } from "../context/context";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";

const Fooddetails = () => {
 
  const { addItemToCart } = useCart(); 
  const { category } = useParams();

  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const typefromurl = searchParams.get("type") || "All";
  const [selectedType, setSelectedType] = useState(typefromurl);
  const [searchTerm, setSearchTerm] = useState("");
  const [size, setSize] = useState("regular");
 

  
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
      setLoading(true);
      setError(null);
      try {
        if (!category) {
          throw new Error("Category is not defined");
        }
        
        let url = `${BACKEND_URL}/foodItems/filter/${category}?type=${selectedType}`;
        if (searchTerm) url += `&search=${searchTerm}`;
        
        console.log("Fetching from URL:", url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        console.log("API Response:", data);
        
        if (!data.food) {
          throw new Error("Invalid response format: missing food data");
        }
        
        setPizzas(data.food);
        setError(null);
      } catch (e) {
        console.error("Error fetching food details:", e);
        setError(e.message);
        setPizzas([]);
      } finally {
        setLoading(false);
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
    <div className="flex flex-col lg:flex-row bg-gray-50 mt-[70px] min-h-screen p-4 sm:p-6 gap-6 lg:gap-8">
     
      {(category !== "Desserts" && category !== "Beverages") && (
        <aside className="w-full lg:w-56 flex-shrink-0 bg-white shadow-md rounded-2xl p-6 lg:sticky lg:top-24 lg:h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Type</h3>
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
                  className="mr-3 accent-red-600 cursor-pointer w-4 h-4"
                />
                <label htmlFor={type} className="cursor-pointer font-medium hover:text-red-600 transition-colors">
                  {type}
                </label>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="flex-1">
        
        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="search"
              placeholder="Search your favorite food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 sm:py-4 pl-12 pr-4 border-2 border-gray-300 rounded-full bg-white placeholder-gray-500 text-gray-800 focus:border-red-600 focus:outline-none transition-all shadow-md hover:shadow-lg"
            />
            <FontAwesomeIcon
              color="#dc2626"
              className="absolute top-1/2 left-4 -translate-y-1/2 text-lg"
              icon={faSearch}
            />
          </div>
        </div>

        {/* Food Grid */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className='col-span-full flex justify-center items-center min-h-[400px]'>
              <ClipLoader color="#dc2626" size={50}/>
            </div>
          ) : error ? (
            <div className='col-span-full flex justify-center items-center min-h-[400px] flex-col gap-4'>
              <p className="text-red-600 font-semibold text-lg">Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : pizzas.length === 0 ? (
            <div className='col-span-full flex justify-center items-center min-h-[400px]'>
              <p className="text-gray-600 text-lg">No food items found</p>
            </div>
          ) : (
            pizzas.map((pizza, index) => (
              <div
                key={pizza._id}
                data-aos="zoom-in-up"
                data-aos-delay={index * 100}
                className="bg-white shadow-md rounded-2xl overflow-hidden 
                transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
                border-2 border-transparent hover:border-red-500
                h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden group h-48">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2">{pizza.name}</h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2 flex-grow">{pizza.description}</p>

                  {/* Size Options */}
                  {(category === "Pizza") && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {[["Regular", pizza.price.regular], ["Medium", pizza.price.medium], ["Large", pizza.price.large]].map(([sizeLabel, price]) => (
                        <button
                          key={sizeLabel}
                          onClick={() => setSize(sizeLabel.toLowerCase())}
                          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                            size === sizeLabel.toLowerCase()
                              ? "bg-red-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-red-100"
                          }`}
                        >
                          {sizeLabel} ₹{price}
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="mt-4 text-lg font-bold text-red-600">₹{pizza.price.medium}</p>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-5">
                    <Link
                      to={`/food/${category}/${pizza._id}`}
                      className="flex-1 text-center border-2 border-red-600 py-2 rounded-full font-semibold text-red-600 bg-white hover:bg-red-50 transition-all duration-300"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => addToCart(pizza._id)}
                      className="flex-1 cursor-pointer text-center py-2 rounded-full font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:shadow-lg"
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
