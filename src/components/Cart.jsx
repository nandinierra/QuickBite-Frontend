import { useState } from "react";
import {useCart} from "../context/context";
import CheckoutModal from "./CheckoutModal";

const Cart = () => {
   const [showCheckout, setShowCheckout] = useState(false);
   const {
    cart,
    loading,
    updateQuantity,
    handleDelete,
    handleClearCart,
    isLoading} = useCart();
   

  

  const handleOrderNow = () => {
    if (!cart?.data?.foodItems || cart.data.foodItems.length === 0) {
      return;
    }
    setShowCheckout(true);
  };
  
  console.log("Cart state:", { cart, loading, isLoading });
  
  // Show loading only during initial fetch or explicit loading state
  if (loading || isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] space-y-4">
        <div className="flex gap-3 text-4xl animate-bounce">
          <span>🍕</span>
          <span>🍔</span>
          <span>🥤</span>
        </div>
        <p className="text-gray-500 text-lg font-medium animate-pulse">
          Getting your cart ready...
        </p>
      </div>
    );
  }

  // Check if cart is empty
  const cartItems = cart?.data?.foodItems || [];
  const isEmpty = !cartItems || cartItems.length === 0;

  if (isEmpty)
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] text-gray-600">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Your cart is empty 🛒</h2>
          <p className="text-gray-400">Add some delicious food to get started!</p>
        </div>
      </div>
    );

  const total = cartItems.filter(item => item.itemId).reduce((acc, item) => {
    const price =
      item.itemId?.price?.[item.size?.toLowerCase()] ||
      item.itemId?.price?.regular ||
      0;
    return acc + price * item.quantity;
  }, 0);



  return (
    <div className="max-w-6xl mx-auto mb-12 mt-20 p-4 sm:p-6 md:p-8 bg-gray-50 rounded-2xl shadow-lg">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-red-600">Your Cart 🛒</h1>
      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)}
        cartTotal={total}
        cartItems={cartItems}
      />

      <div className="space-y-4 sm:space-y-6">
        {cartItems.filter(item => item.itemId).map((item) => (
          <div
            key={item.itemId?._id || Math.random()}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-600"
          >
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full sm:flex-1">
              <img
                src={item.itemId?.image}
                alt={item.itemId?.name}
                className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-lg shadow-md flex-shrink-0"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg sm:text-xl text-gray-800">
                  {item.itemId?.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1">Size: <span className="font-medium">{item.size}</span></p>
                <p className="text-red-600 font-bold mt-2 text-lg">
                  ₹{item.itemId?.price?.[item.size?.toLowerCase()] || item.itemId?.price?.regular}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 sm:p-2 flex-1 sm:flex-none">
                <button
                  onClick={() => updateQuantity(item.itemId._id, "decrease")}
                  className="bg-gray-300 cursor-pointer hover:bg-gray-400 px-3 py-1 sm:px-4 sm:py-2 rounded font-bold transition-all hover:scale-110"
                >
                  −
                </button>
                <span className="font-semibold text-base sm:text-lg min-w-[30px] text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.itemId._id, "increase")}
                  className="bg-gray-300 cursor-pointer hover:bg-gray-400 px-3 py-1 sm:px-4 sm:py-2 rounded font-bold transition-all hover:scale-110"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleDelete(item.itemId._id)}
                className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-base font-semibold transition-all"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mt-10 bg-white p-4 sm:p-6 rounded-xl shadow-md border-t-4 border-red-600">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Total: <span className="text-red-600">₹{total}</span>
        </h2>
        <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={handleClearCart}
            className="flex-1 sm:flex-none bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
          >
            Clear Cart
          </button>
          <button
            onClick={handleOrderNow}
            className="flex-1 sm:flex-none bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
          >
            Order Now
          </button>
        </div>
      </div> 

    </div>
  ); 

};

export default Cart;


