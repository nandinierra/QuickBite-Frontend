import { useState } from "react";
// import Cookies from "js-cookie";
import {useCart} from "../context/context";


const Cart = () => {
   const [orderPlaced, setOrderPlaced] = useState(false);
   const {
    cart,
    loading,
    updateQuantity,
    handleDelete,
    handleClearCart} = useCart();

  const handleOrderNow = () => {
    setOrderPlaced(true); // show celebration card
    handleClearCart(); // clear cart after ordering
  };

  if (loading)
    return   <div className="flex flex-col justify-center items-center h-[70vh] space-y-4">
      <div className="flex gap-3 text-4xl animate-bounce">
        <span>🍕</span>
        <span>🍔</span>
        <span>🥤</span>
      </div>
      <p className="text-gray-500 text-lg font-medium animate-pulse">
        Getting your cart ready...
      </p>
    </div>

  if (!cart || !cart.foodItems || cart.foodItems.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] text-gray-600">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Your cart is empty 🛒</h2>
          <p className="text-gray-400">Add some delicious food to get started!</p>
        </div>

        {/* Celebration card */}
        {orderPlaced && (
          <div className="mt-8 relative w-96 bg-white rounded-2xl shadow-2xl p-8 text-center animate-scaleIn">
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              🎉 Order Placed Successfully! 🎉
            </h1>
            <p className="text-gray-700 mb-4">
              Thank you for your order! Your delicious food is on its way.
            </p>
            <div className="flex justify-center gap-2 text-4xl animate-bounce">
              <span>🎉</span>
              <span>🍕</span>
              <span>🍔</span>
              <span>🥤</span>
              <span>🎉</span>
            </div>
          </div>
        )}
      </div>
    );

  const total = cart.foodItems.reduce((acc, item) => {
    const price =
      item.itemId?.price?.[item.size?.toLowerCase()] ||
      item.itemId?.price?.regular ||
      0;
    return acc + price * item.quantity;
  }, 0);



  return (
    <div className="max-w-5xl mx-auto mb-12 mt-20 p-6 bg-gray-50 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-center text-red-600">Your Cart 🛒</h1>

      {orderPlaced && (
        <div className="mb-8 relative w-full bg-white rounded-2xl shadow-2xl p-8 text-center animate-scaleIn">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            🎉 Order Placed Successfully! 🎉
          </h1>
          <p className="text-gray-700 mb-4">
            Thank you for your order! Your delicious food is on its way.
          </p>
          <div className="flex justify-center gap-2 text-5xl animate-bounce">
            <span>🎉</span>
            <span>🍕</span>
            <span>🍔</span>
            <span>🥤</span>
            <span>🎉</span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {cart.foodItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.itemId?.image}
                alt={item.itemId?.name}
                className="w-28 h-28 object-cover rounded-lg shadow-md"
              />
              <div>
                <h2 className="font-semibold text-xl text-gray-800">
                  {item.itemId?.name}
                </h2>
                <p className="text-gray-500 mt-1">Size: {item.size}</p>
                <p className="text-red-600 font-bold mt-1">
                  ₹
                  {item.itemId?.price?.[item.size?.toLowerCase()] ||
                    item.itemId?.price?.regular}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button
                onClick={() => updateQuantity(item.itemId._id, "decrease")}
                className="bg-gray-200 cursor-pointer hover:bg-gray-300 px-4 py-1 rounded-lg font-bold transition"
              >
                −
              </button>
              <span className="font-semibold text-lg">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.itemId._id, "increase")}
                className="bg-gray-200 cursor-pointer hover:bg-gray-300 px-4 py-1 rounded-lg font-bold transition"
              >
                +
              </button>
              <button
                onClick={() => handleDelete(item.itemId._id)}
                className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-10 bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Total: <span className="text-red-600">₹{total}</span>
        </h2>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            onClick={handleClearCart}
            className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Clear Cart
          </button>
          <button
            onClick={handleOrderNow}
            className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Order Now
          </button>
        </div>
      </div> 


    </div>
  ); 

};

export default Cart;


