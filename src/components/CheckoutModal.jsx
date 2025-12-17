import { useState } from "react";
import { useCart } from "../context/context";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";

const CheckoutModal = ({ isOpen, onClose, cartTotal }) => {
  const { token } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || 
        !formData.address || !formData.city || !formData.postalCode) {
      toast.error("All fields are required", {
        position: "bottom-right",
        autoClose: 1500,
      });
      return;
    }

    setLoading(true);
    try {
      const createOrderResponse = await fetch(`${BACKEND_URL}/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          deliveryDetails: formData,
          notes: { description: "Order from QuickBite app" }
        }),
      });

      const orderData = await createOrderResponse.json();

      if (!createOrderResponse.ok) {
        toast.error(orderData.message || "Failed to create order", {
          position: "bottom-right",
          autoClose: 1500,
        });
        setLoading(false);
        return;
      }

      const { razorpayOrderId, amount } = orderData.order;

      const options = {
        key: "rzp_test_RsaGeH6na2LuO4",
        amount: amount * 100,
        currency: "INR",
        name: "QuickBite",
        description: "Food Order Payment",
        order_id: razorpayOrderId,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch(`${BACKEND_URL}/orders/verify-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              toast.error(verifyData.message || "Payment verification failed", {
                position: "bottom-right",
                autoClose: 1500,
              });
              return;
            }

            toast.success("Order placed successfully! 🎉", {
              position: "bottom-right",
              autoClose: 2000,
            });

            onClose();
            setFormData({
              fullName: "",
              email: "",
              phone: "",
              address: "",
              city: "",
              postalCode: "",
            });
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed", {
              position: "bottom-right",
              autoClose: 1500,
            });
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.info("Payment cancelled", {
              position: "bottom-right",
              autoClose: 1500,
            });
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "bottom-right",
        autoClose: 1500,
      });
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-red-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Delivery Details</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:scale-110 transition-transform"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Delivery Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
              placeholder="Enter your delivery address"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your city"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your postal code"
              required
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">Order Total:</span>
              <span className="text-2xl font-bold text-red-600">₹{cartTotal}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
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
