
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useCart } from "../context/context";
import { toast } from "react-toastify";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";

const ViewDetails = () => {
  const { addItemToCart } = useCart();
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
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    try {
      const itemData = { itemId: id, quantity, size };
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
    } catch (error) {
      console.log("Error adding to cart:", error);
      toast.error("Failed to add item to cart", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  if (!item)
    return (
      <div className="mt-32 flex justify-center items-center min-h-[60vh]">
        <ClipLoader color="#dc2626" />
      </div>
    );

  return (
    <div className="flex justify-center min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8 bg-transparent">
      <div className="max-w-5xl w-full">
        {/* Main Content Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col lg:flex-row gap-8 lg:gap-12 animate-fade-in relative overflow-hidden">

          {/* Background Glow Effect */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

          {/* LEFT COLUMN: Image Section (45-50%) */}
          <div className="w-full lg:w-[45%] flex-shrink-0">
            <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {item.popular && (
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm flex items-center gap-1.5">
                    <span>🔥</span> Popular
                  </span>
                )}
              </div>

              <div className="absolute top-4 right-4">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-md border border-white/20 capitalize ${item.type === 'Non-Veg'
                  ? "bg-red-900/80 text-red-200"
                  : "bg-green-900/80 text-green-200"
                  }`}>
                  {item.type}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Details & Actions (50-55%) */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center">

            {/* Header */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-primary text-xs font-bold tracking-wider uppercase mb-3 border border-white/5">
                {item.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-playfair leading-tight mb-4">
                {item.name}
              </h1>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>

            <div className="w-full h-px bg-white/10 mb-6"></div>

            {/* Configurator */}
            <div className="space-y-8">

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {[["Regular", item.price.regular], ["Medium", item.price.medium], ["Large", item.price.large]].map(([s, price]) => (
                    <button
                      key={s}
                      onClick={() => setSize(s.toLowerCase())}
                      className={`group relative px-6 py-3 rounded-xl border transition-all duration-300 overflow-hidden ${size === s.toLowerCase()
                        ? "border-primary bg-primary/20 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                        : "border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10"
                        }`}
                    >
                      <span className={`relative z-10 flex flex-col items-start ${size === s.toLowerCase() ? "text-white" : "text-gray-400 group-hover:text-white"
                        }`}>
                        <span className="font-bold text-sm uppercase">{s}</span>
                        <span className="font-outfit text-lg">₹{price}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Display */}
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-white font-outfit">
                  ₹{item.price[size] * quantity}
                </span>
                <span className="text-gray-500 mb-1 ml-1 text-sm font-medium">Total Price</span>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">

                {/* Quantity Selector */}
                <div className="flex items-center bg-black/40 rounded-xl border border-white/10 p-1.5 w-fit">
                  <button
                    onClick={handleDecrease}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-white text-lg">{quantity}</span>
                  <button
                    onClick={handleIncrease}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-3.5 px-12 rounded-xl shadow-lg hover:shadow-primary/40 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                >
                  <span>Add to Cart</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
