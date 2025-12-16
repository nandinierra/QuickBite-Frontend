
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
    <div className="flex flex-col justify-center min-h-screen pt-20 pb-12">
      <div className="mx-auto w-full px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 hover:shadow-3xl">
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative group overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:bg-red-700 transition-colors">
              {item.type}
            </span>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-8">
            
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-gray-800">{item.name}</h2>
              <p className="text-gray-600 mb-2"><strong>Category:</strong> {item.category}</p>
              <p className="text-gray-600 mb-4"><strong>Type:</strong> {item.type}</p>
              <p className="text-gray-700 mb-6 leading-relaxed">{item.description}</p>

              {/* Size Selection */}
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Choose Size:</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {["Regular", "Medium", "Large"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s.toLowerCase())}
                    className={`px-4 sm:px-5 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform ${
                      size === s.toLowerCase()
                        ? "bg-red-600 text-white shadow-lg scale-105"
                        : "bg-gray-200 text-gray-800 hover:bg-red-100 hover:text-red-700"
                    }`}
                  >
                    {s}: ₹{item.price[s.toLowerCase()]}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                <button
                  onClick={handleDecrease}
                  className="bg-gray-300 cursor-pointer px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-lg sm:text-xl font-bold transition-all hover:bg-gray-400 hover:scale-110"
                >
                  −
                </button>
                <span className="text-lg sm:text-xl font-semibold min-w-[40px] text-center">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  className="bg-gray-300 cursor-pointer px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-lg sm:text-xl font-bold transition-all hover:bg-gray-400 hover:scale-110"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
