
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"
import { useCart } from "../context/context";
import {toast} from "react-toastify"


const ViewDetails = () => {
  const {addItemToCart}= useCart();
 
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Regular");
  
  useEffect(() => {
    const getItem = async () => {
      try {
        const url = `https://quickbite-backendd.onrender.com/foodItems/getItemId/${id}`;
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

  if (!item) return <div className=' mt-45 flex justify-center items-center'><ClipLoader color="#fb2c36"/></div>;



  return (
    <div className=" h-[90%] flex flex-col justify-center">
    <div className="mx-auto  mt-20">

      <div className="flex flex-col lg:h-[440px] md:w-[80%] lg:w-[100%] m-auto mb-4 lg:flex-row gap-10 bg-white rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300">
       

        <div className="md:w-full lg:h-[440px] relative group">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-l-3xl transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full font-bold shadow-lg">
            {item.type}
          </span>
        </div>


        <div className="md:w-full lg:h-[407px]  flex flex-col justify-between p-6">

          <div>
            <h2 className="text-4xl font-extrabold mb-3 text-gray-800">{item.name}</h2>
            <p className="text-gray-500 mb-1"><strong>Category:</strong> {item.category}</p>
            <p className="text-gray-500 mb-3"><strong>Type:</strong> {item.type}</p>
            <p className="text-gray-700 mb-4">{item.description}</p>

            {/* Price Selection */}
            <h3 className="text-xl font-semibold mb-2">Choose Size:</h3>
            <div className="flex gap-4 mb-4">
              {["Regular", "Medium", "Large"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 cursor-pointer py-2 rounded-lg font-semibold transition-all duration-300 ${
                    size === s
                      ? "bg-green-600 text-white shadow-lg scale-105"
                      : "bg-gray-200 text-gray-800 hover:bg-green-100"
                  }`}
                >
                  {s}: ₹{item.price[s.toLowerCase()]}
                </button>
              ))}
            </div>
          </div>

         
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleDecrease}
              className="bg-gray-300 cursor-pointer px-3 py-1 rounded-lg text-xl font-bold transition-transform hover:scale-110"
            >
              −
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="bg-gray-300 cursor-pointer px-3 py-1 rounded-lg text-xl font-bold transition-transform hover:scale-110"
            >
              +
            </button>

            <button
              onClick={handleAddToCart}
              className="ml-6 bg-gradient-to-r cursor-pointer from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition-transform hover:scale-105"
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
