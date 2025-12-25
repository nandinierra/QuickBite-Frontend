import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/context';
import { toast } from 'react-toastify';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3060";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token, handleClearCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Retrieve data: 
    // - New Order: { formData, cartTotal }
    // - Retry Order: { orderId }
    const { formData, cartTotal, orderId } = location.state || {};

    // Scroll cleanup
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        // Validation
        if (!token) {
            navigate('/login');
            return;
        }
        if (!orderId && (!formData || !cartTotal)) {
            navigate('/cart');
            return;
        }

        const initiatePayment = async () => {
            try {
                let razorpayOrderId, amount, userDetails;

                if (orderId) {
                    // --- RETRY PAYMENT FLOW ---
                    const retryResponse = await fetch(`${BACKEND_URL}/orders/${orderId}/retry-payment`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            // Authorization: `Bearer ${token}`,
                        },
                        credentials: "include",
                    });

                    if (!retryResponse.ok) {
                        const errData = await retryResponse.json();
                        throw new Error(errData.message || "Failed to initiate payment retry");
                    }

                    const retryData = await retryResponse.json();
                    razorpayOrderId = retryData.order.razorpayOrderId;
                    amount = retryData.order.amount;
                    userDetails = {
                        name: "User", // We might not have this in retry flow w/o fetching, but Razorpay prefill is optional or can use what we have
                        email: "",
                        contact: ""
                    };
                } else {
                    // --- NEW ORDER FLOW ---
                    const createOrderResponse = await fetch(`${BACKEND_URL}/orders/create`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            // Authorization: `Bearer ${token}`,
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            deliveryDetails: formData,
                            notes: { description: "Order from QuickBite app" }
                        }),
                    });

                    const orderData = await createOrderResponse.json();

                    if (!createOrderResponse.ok) {
                        throw new Error(orderData.message || "Failed to create order");
                    }

                    razorpayOrderId = orderData.order.razorpayOrderId;
                    amount = orderData.order.amount;
                    userDetails = {
                        name: formData.fullName,
                        email: formData.email,
                        contact: formData.phone,
                    };
                }

                // Initialize Razorpay
                const options = {
                    key: "rzp_test_RsaGeH6na2LuO4",
                    amount: amount * 100,
                    currency: "INR",
                    name: "QuickBite",
                    description: orderId ? `Retry Order ${orderId}` : "Food Order Payment",
                    order_id: razorpayOrderId,
                    prefill: {
                        name: userDetails.name,
                        email: userDetails.email,
                        contact: userDetails.contact,
                    },
                    handler: async (response) => {
                        try {
                            const verifyResponse = await fetch(`${BACKEND_URL}/orders/verify-payment`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    // Authorization: `Bearer ${token}`,
                                },
                                credentials: "include",
                                body: JSON.stringify({
                                    razorpayOrderId: response.razorpay_order_id,
                                    razorpayPaymentId: response.razorpay_payment_id,
                                    razorpaySignature: response.razorpay_signature,
                                }),
                            });

                            const verifyData = await verifyResponse.json();

                            if (!verifyResponse.ok) {
                                throw new Error(verifyData.message || "Payment verification failed");
                            }

                            // Success
                            if (!orderId) {
                                // Only clear cart if it was a NEW order from cart
                                await handleClearCart(false); // Silent clear
                                navigate("/cart", { replace: true });
                            } else {
                                // If retry, go to profile or orders
                                toast.success("Payment completed successfully!");
                                navigate("/profile", { replace: true });
                            }

                        } catch (err) {
                            console.error("Payment verification error:", err);
                            toast.error("Payment verification failed");
                            navigate(orderId ? "/profile" : "/cart", { replace: true });
                        }
                    },
                    modal: {
                        ondismiss: () => {
                            toast.info("Payment cancelled");
                            navigate(orderId ? "/profile" : "/cart");
                        }
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
                setLoading(false);

            } catch (err) {
                console.error("Payment initialization error:", err);
                setError(err.message);
                toast.error(err.message || "Something went wrong initiating payment");
                setTimeout(() => navigate(orderId ? "/profile" : "/cart"), 2000);
            }
        };

        initiatePayment();
    }, [formData, cartTotal, orderId, navigate, token, handleClearCart]);

    if (!orderId && (!formData || !cartTotal)) return null;

    return (
        <div className="min-h-screen bg-black/90 flex flex-col justify-center items-center text-white p-4">
            <div className="max-w-md w-full glass-panel p-8 rounded-2xl text-center space-y-6">
                {loading ? (
                    <>
                        <div className="flex justify-center space-x-2 animate-pulse">
                            <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <h2 className="text-2xl font-bold font-playfair">Processing Payment...</h2>
                        <p className="text-gray-400">Please do not close this window.</p>
                        {!orderId && (
                            <div className="text-left bg-white/5 p-4 rounded-xl mt-4">
                                <p className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Amount to Pay:</span>
                                    <span className="font-bold text-lg text-primary">₹{cartTotal}</span>
                                </p>
                                <p className="text-xs text-gray-500">Redirecting to secure payment gateway...</p>
                            </div>
                        )}
                    </>
                ) : error ? (
                    <div className="text-red-500">
                        <h2 className="text-xl font-bold mb-2">Error</h2>
                        <p>{error}</p>
                        <p className="text-sm text-gray-400 mt-4">Redirecting...</p>
                    </div>
                ) : (
                    <div className="py-8">
                        <p className="text-gray-400 text-sm animate-pulse">Waiting for payment completion...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payment;
