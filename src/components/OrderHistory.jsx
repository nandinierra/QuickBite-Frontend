import React from 'react';
import { ShoppingBag, CreditCard } from "lucide-react";

const OrderHistory = ({ orders, handleRetryPayment, retryingOrderId }) => {
    return (
        <div className="mt-8 glass-panel rounded-lg shadow-lg p-8 animate-fade-in-up border border-white/10">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-6">Order History</h2>

            {orders && orders.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 border-b-2 border-white/10">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-white">Order ID</th>
                                <th className="px-4 py-3 font-semibold text-white">Date</th>
                                <th className="px-4 py-3 font-semibold text-white">Amount</th>
                                <th className="px-4 py-3 font-semibold text-white">Status</th>
                                <th className="px-4 py-3 font-semibold text-white">Payment</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-white/5 transition-colors border-b border-white/5">
                                    <td className="px-4 py-3 font-mono text-sm text-gray-300 break-all">
                                        {order.orderId}
                                    </td>
                                    <td className="px-4 py-3 text-gray-300">
                                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-white">
                                        ₹{order.totalAmount.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${order.orderStatus === "delivered"
                                                ? "bg-green-100 text-green-800"
                                                : order.orderStatus === "cancelled"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${order.paymentStatus === "success"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-orange-100 text-orange-800"
                                                    }`}
                                            >
                                                {order.paymentStatus}
                                            </span>
                                            {order.paymentStatus === "pending" && (
                                                <button
                                                    onClick={() => handleRetryPayment(order._id)}
                                                    disabled={retryingOrderId === order._id}
                                                    className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Retry payment"
                                                >
                                                    <CreditCard size={14} />
                                                    {retryingOrderId === order._id ? "Processing..." : "Pay"}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-12">
                    <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600">No orders yet. Start shopping to see your order history!</p>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
