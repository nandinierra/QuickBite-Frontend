import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/context";
import CheckoutModal from "./CheckoutModal";

const Cart = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const {
    cart,
    loading,
    updateQuantity,
    handleDelete,
    handleClearCart,
    isLoading } = useCart();




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
    <div className="max-w-6xl mx-auto mb-16 mt-24 p-4 sm:p-6 md:p-10 glass-panel rounded-3xl shadow-2xl border border-white/10">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-white animate-fade-in font-playfair">Your Cart 🛒</h1>
        <p className="text-gray-400 text-base animate-fade-in-up">{cartItems.length} items ready for delivery</p>
      </div>
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartTotal={total}
        cartItems={cartItems}
      />

      <div className="space-y-5 sm:space-y-6">
        {cartItems.filter(item => item.itemId).map((item, index) => (
          <div
            key={item.itemId?._id || Math.random()}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 glass-panel p-5 sm:p-7 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary hover:border-l-primary text-white group animate-fade-in-up border-y border-r border-white/10"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start sm:items-center gap-4 sm:gap-5 w-full sm:flex-1">
              <img
                src={item.itemId?.image}
                alt={item.itemId?.name}
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="flex-1">
                <h2 className="font-bold text-lg sm:text-2xl text-white group-hover:text-primary transition font-outfit">
                  {item.itemId?.name}
                </h2>
                {item.itemId?.category === "Pizza" && (
                  <p className="text-gray-400 text-sm mt-2">Size: <span className="font-semibold text-gray-300">{item.size}</span></p>
                )}
                <p className="text-primary font-bold mt-3 text-xl">
                  ₹{item.itemId?.price?.[item.size?.toLowerCase()] || item.itemId?.price?.regular}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-1 sm:gap-2 bg-black/40 rounded-xl p-2 sm:p-3 flex-1 sm:flex-none border border-white/10">
                <button
                  onClick={() => updateQuantity(item.itemId._id, "decrease")}
                  className="bg-primary cursor-pointer hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold transition-all hover:scale-110 shadow-md"
                >
                  −
                </button>
                <span className="font-bold text-lg text-white min-w-[40px] text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.itemId._id, "increase")}
                  className="bg-primary cursor-pointer hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold transition-all hover:scale-110 shadow-md"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleDelete(item.itemId._id)}
                className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-red-500/30 group/delete"
                title="Remove Item"
              >
                <Trash2 size={20} className="group-hover/delete:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-8 mt-12 glass-panel p-6 sm:p-8 rounded-2xl shadow-xl border border-white/10 group hover:border-primary/50 transition">
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-playfair">
          Total: <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">₹{total}</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={handleClearCart}
            className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 cursor-pointer hover:from-red-700 hover:to-red-800 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold transition-all hover:shadow-xl shadow-lg transform hover:scale-105"
          >
            Clear Cart 
          </button>
          <button
            onClick={handleOrderNow}
            className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 cursor-pointer hover:from-green-700 hover:to-green-800 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold transition-all hover:shadow-xl shadow-lg transform hover:scale-105"
          >
            Order Now
          </button>
        </div>
      </div>

    </div>
  );

};

export default Cart;


