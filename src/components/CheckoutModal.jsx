import { useState } from "react";
import { useCart } from "../context/context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";

const CheckoutModal = ({ isOpen, onClose, cartTotal }) => {
  const { token, handleClearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      // Enforce lowercase for email
      [name]: name === "email" ? value.toLowerCase() : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone ||
      !formData.address || !formData.city || !formData.postalCode) {
      toast.error("All fields are required", {
        position: "bottom-right",
        autoClose: 1500,
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address", {
        position: "bottom-right",
        autoClose: 1500,
      });
      return;
    }

    // Close modal and navigate to payment page with data
    onClose();
    navigate('/payment', {
      state: {
        formData,
        cartTotal
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="glass-panel rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in border border-white/10">
        <div className="sticky top-0 bg-gradient-to-r from-primary to-red-700 text-white p-6 flex justify-between items-center rounded-t-3xl border-b border-white/10">
          <h2 className="text-lg sm:text-xl font-bold font-playfair">Delivery Details</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:scale-110 transition-transform text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 animate-fade-in-up">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-white/10 rounded-xl bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-black/60 transition-all text-sm"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-white/10 rounded-xl bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-black/60 transition-all text-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-white/10 rounded-xl bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-black/60 transition-all text-sm"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
              Delivery Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-white/10 rounded-xl bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-black/60 transition-all resize-none text-sm"
              placeholder="Enter your delivery address"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-white/10 rounded-xl bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-black/60 transition-all text-sm"
              placeholder="Enter your city"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-white/10 rounded-xl bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-black/60 transition-all text-sm"
              placeholder="Enter your postal code"
              required
            />
          </div>

          <div className="bg-white/5 rounded-2xl p-4 mt-6 border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base font-semibold text-gray-300">Order Total:</span>
              <span className="text-xl sm:text-2xl font-bold text-primary">₹{cartTotal}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105 text-sm border border-white/10"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 text-sm shadow-lg border border-transparent"
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
