

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
  const [selectedSizes, setSelectedSizes] = useState({});



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
      const itemSize = selectedSizes[id] || "regular";
      const itemData = { itemId: id, quantity: 1, size: itemSize };
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
    <div className="flex flex-col lg:flex-row bg-transparent mt-[70px] min-h-screen p-4 sm:p-6 gap-6 lg:gap-8">

      {(category !== "Desserts" && category !== "Beverages") && (
        <aside className="w-full lg:w-56 flex-shrink-0 glass-panel shadow-2xl rounded-2xl p-6 lg:sticky lg:top-24 lg:h-fit border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 font-outfit">Filter by Type</h3>
          <ul className="space-y-3 text-gray-300">
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
                <label htmlFor={type} className="cursor-pointer font-medium hover:text-primary transition-colors">
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
              className="w-full py-3 sm:py-4 pl-12 pr-4 border border-white/10 rounded-full bg-black/40 placeholder-gray-400 text-white focus:border-primary focus:outline-none transition-all shadow-lg hover:shadow-xl"
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
              <ClipLoader color="#dc2626" size={50} />
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
              <p className="text-gray-400 text-lg">No food items found</p>
            </div>
          ) : (
            pizzas.map((pizza, index) => (
              <div
                key={pizza._id}
                data-aos="zoom-in-up"
                data-aos-delay={index * 100}
                className="glass-panel shadow-2xl rounded-3xl overflow-hidden 
                transform transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-4
                border border-white/10 hover:border-primary/50
                h-full flex flex-col group relative"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-10 pointer-events-none rounded-3xl"></div>

                {/* Image */}
                <div className="relative overflow-hidden h-56 sm:h-64">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-full h-full object-cover transform transition duration-700 group-hover:scale-125 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {pizza.popular && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-1">
                      <span>🔥</span> Popular
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow bg-transparent">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white line-clamp-2 group-hover:text-primary transition-all duration-300 font-outfit">
                    {pizza.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-3 line-clamp-2 flex-grow leading-relaxed">{pizza.description}</p>

                  {/* Size Options */}
                  {(category === "Pizza") && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {[["Regular", pizza.price.regular], ["Medium", pizza.price.medium], ["Large", pizza.price.large]].map(([sizeLabel, price]) => (
                        <button
                          key={sizeLabel}
                          onClick={() => setSelectedSizes({ ...selectedSizes, [pizza._id]: sizeLabel.toLowerCase() })}
                          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all transform hover:scale-105 ${(selectedSizes[pizza._id] || "regular") === sizeLabel.toLowerCase()
                            ? "bg-gradient-to-r from-primary to-orange-600 text-white shadow-lg scale-105"
                            : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10"
                            }`}
                        >
                          {sizeLabel} ₹{price}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Price</p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-primary">
                        ₹{pizza.price.medium}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <Link
                      to={`/food/${category}/${pizza._id}`}
                      className="flex-1 text-center border border-white/20 py-3 rounded-xl font-bold text-white bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => addToCart(pizza._id)}
                      className="flex-1 cursor-pointer text-center py-3 rounded-xl font-bold text-white bg-gradient-to-r from-primary via-red-700 to-orange-600 hover:from-red-700 hover:via-red-800 hover:to-orange-700 transition-all duration-300 hover:shadow-xl transform hover:scale-105 shadow-lg relative overflow-hidden group/btn"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Add <span className="text-lg group-hover/btn:rotate-12 transition-transform">🛒</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
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
