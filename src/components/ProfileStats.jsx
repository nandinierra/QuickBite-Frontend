import React from 'react';
import { ShoppingBag, DollarSign, Calendar } from "lucide-react";

const ProfileStats = ({ statistics, user }) => {
    return (
        <div className="glass-panel rounded-lg shadow-lg p-6 animate-fade-in-up border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6">Account Statistics</h3>

            <div className="space-y-4">
                {/* Total Orders */}
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-300">Total Orders</p>
                            <p className="text-3xl font-bold text-blue-600">
                                {statistics.totalOrders}
                            </p>
                        </div>
                        <ShoppingBag className="text-blue-600" size={32} />
                    </div>
                </div>

                {/* Total Spent */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Spent</p>
                            <p className="text-3xl font-bold text-green-600">
                                ₹{statistics.totalSpent.toFixed(2)}
                            </p>
                        </div>
                        <DollarSign className="text-green-600" size={32} />
                    </div>
                </div>

                {/* Last Order */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                        <Calendar className="text-purple-600 mt-1" size={24} />
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Last Order</p>
                            <p className="text-sm font-semibold text-purple-600">
                                {statistics.lastOrderDate
                                    ? new Date(statistics.lastOrderDate).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })
                                    : "No orders yet"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Account Role */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Account Type</p>
                    <p className="text-sm font-bold text-orange-600 capitalize">
                        {user.role}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileStats;
