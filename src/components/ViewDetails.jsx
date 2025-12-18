
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useCart } from "../context/context";
import { toast } from "react-toastify";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";

const ViewDetails = () => {
  const {addItemToCart}= useCart();
 
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("regular");
  
  useEffect(() => {
    const getItem = async () => {
      try {
        const url = `${BACKEND_URL}/foodItems/getItemId/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setItem(data.food);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    getItem();
  }, [id]);


  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  
  const handleAddToCart = async () => {
        try{
        const itemData = { itemId: id, quantity, size };
        const result=await addItemToCart(itemData);
      
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

      }
      catch(error){
        console.log("Error adding to cart:", error);
        toast.error("Failed to add item to cart", {
        position: "top-right",
        autoClose: 1500,
        });
      }
    

  };

  if (!item) return <div className='mt-32 flex justify-center items-center min-h-[60vh]'><ClipLoader color="#dc2626"/></div>;

  return (
    <div className="flex flex-col justify-center min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="mx-auto w-full px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-4 border-gray-200 hover:border-red-500 group">
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-125 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="absolute top-6 right-6 bg-gradient-to-r from-red-600 to-orange-600 text-white px-5 py-2 rounded-full font-extrabold text-sm shadow-2xl border-2 border-white/50">
              {item.type}
            </span>
            {item.popular && (
              <span className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2 rounded-full font-extrabold text-sm shadow-2xl border-2 border-white/50 flex items-center gap-2">
                <span>🔥</span> Popular
              </span>
            )}
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-10 bg-gradient-to-b from-white to-gray-50">
            
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-red-600">
                {item.name}
              </h2>
              <div className="flex flex-wrap gap-3 mb-5">
                <span className="bg-gradient-to-r from-red-100 to-orange-100 text-red-700 px-5 py-2 rounded-full font-bold text-sm border-2 border-red-200">
                  {item.category}
                </span>
                <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-5 py-2 rounded-full font-bold text-sm border-2 border-blue-200">
                  {item.type}
                </span>
              </div>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">{item.description}</p>

              {/* Size Selection */}
              <h3 className="text-2xl font-extrabold mb-4 text-gray-900">Choose Size:</h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {[["Regular", item.price.regular], ["Medium", item.price.medium], ["Large", item.price.large]].map(([s, price]) => (
                  <button
                    key={s}
                    onClick={() => setSize(s.toLowerCase())}
                    className={`px-6 py-3 rounded-xl font-extrabold text-lg transition-all duration-300 transform hover:scale-105 ${
                      size === s.toLowerCase()
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl scale-105 border-4 border-green-400"
                        : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-green-100 hover:to-emerald-100 border-2 border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {s}: ₹{price}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-8 pt-6 border-t-4 border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-gray-700">Quantity:</span>
                <div className="flex items-center gap-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-2 border-2 border-gray-300 shadow-lg">
                  <button
                    onClick={handleDecrease}
                    className="bg-gradient-to-r from-red-600 to-red-700 cursor-pointer px-5 py-2 rounded-xl text-2xl font-extrabold text-white transition-all hover:scale-125 shadow-lg hover:shadow-xl"
                  >
                    −
                  </button>
                  <span className="text-2xl font-extrabold text-gray-900 min-w-[60px] text-center bg-white px-4 py-2 rounded-lg border-2 border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="bg-gradient-to-r from-red-600 to-red-700 cursor-pointer px-5 py-2 rounded-xl text-2xl font-extrabold text-white transition-all hover:scale-125 shadow-lg hover:shadow-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-none bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 hover:from-green-700 hover:via-green-800 hover:to-emerald-700 text-white px-10 py-4 rounded-xl font-extrabold text-lg shadow-2xl transition-all hover:scale-110 border-4 border-green-400 relative overflow-hidden group/btn"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Add to Cart <span className="text-2xl group-hover/btn:rotate-12 transition-transform">🛒</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
