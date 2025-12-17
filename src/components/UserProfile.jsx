import { useState, useEffect, useCallback } from "react";
import { useCart } from "../context/context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Mail, Phone, MapPin, Edit2, Save, X, ShoppingBag, DollarSign, Calendar, Camera, CreditCard } from "lucide-react";

const UserProfile = () => {
  const { token, refreshUser, updateUser } = useCart();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";

  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [retryingOrderId, setRetryingOrderId] = useState(null);

  const fetchUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/profile/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfileData(data);
      setEditFormData({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone || "",
        address: data.user.address || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile", {
        position: "bottom-right",
        autoClose: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  }, [token, BACKEND_URL]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUserProfile();
  }, [token, navigate, fetchUserProfile]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      const response = await fetch(`${BACKEND_URL}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update profile");
      }

      const data = await response.json();
      setProfileData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          ...data.user,
        },
      }));
      updateUser(data.user);
      await fetchUserProfile();
      setIsEditing(false);
      toast.success("Profile updated successfully", {
        position: "bottom-right",
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile", {
        position: "bottom-right",
        autoClose: 1500,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file", {
        position: "bottom-right",
        autoClose: 1500,
      });
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB", {
        position: "bottom-right",
        autoClose: 1500,
      });
      return;
    }

    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await fetch(`${BACKEND_URL}/profile/upload-picture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload image");
      }

      const data = await response.json();
      setProfileData((prev) => ({
        ...prev,
        user: data.user,
      }));
      updateUser({
        profilePicture: data.user.profilePicture,
      });
      await refreshUser();
      toast.success("Profile picture updated successfully", {
        position: "bottom-right",
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(error.message || "Failed to upload profile picture", {
        position: "bottom-right",
        autoClose: 1500,
      });
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleRetryPayment = async (orderId) => {
    try {
      setRetryingOrderId(orderId);

      const response = await fetch(`${BACKEND_URL}/orders/${orderId}/retry-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to initiate payment retry");
      }

      const data = await response.json();
      const order = data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: order.razorpayOrderId,
        amount: order.amount * 100,
        currency: order.currency,
        name: "QuickBite",
        description: `Payment for Order ${order.orderId}`,
        handler: async (paymentResponse) => {
          try {
            const verifyResponse = await fetch(`${BACKEND_URL}/orders/verify-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpayOrderId: paymentResponse.razorpay_order_id,
                razorpayPaymentId: paymentResponse.razorpay_payment_id,
                razorpaySignature: paymentResponse.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error("Payment verification failed");
            }

            toast.success("Payment completed successfully!", {
              position: "bottom-right",
              autoClose: 2000,
            });
            await fetchUserProfile();
          } catch (verifyError) {
            console.error("Payment verification error:", verifyError);
            toast.error("Payment verification failed", {
              position: "bottom-right",
              autoClose: 1500,
            });
          }
        },
        prefill: {
          name: profileData?.user?.name,
          email: profileData?.user?.email,
          contact: profileData?.user?.phone,
        },
        theme: {
          color: "#f97316",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error retrying payment:", error);
      toast.error(error.message || "Failed to retry payment", {
        position: "bottom-right",
        autoClose: 1500,
      });
    } finally {
      setRetryingOrderId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Failed to load profile</p>
          <button
            onClick={fetchUserProfile}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { user, statistics, orders } = profileData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and view your order history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information Card */}
          <div className={user.role === "admin" ? "lg:col-span-3" : "lg:col-span-2"}>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Edit2 size={18} />
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Address Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={editFormData.address}
                      onChange={handleEditChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your address"
                    ></textarea>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save size={18} />
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditFormData({
                          name: user.name,
                          email: user.email,
                          phone: user.phone || "",
                          address: user.address || "",
                        });
                      }}
                      className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center pb-6 border-b border-gray-200">
                    <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center overflow-hidden border-4 border-orange-200">
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="text-white" size={48} />
                        )}
                      </div>
                      <label
                        htmlFor="profile-picture-input"
                        className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg"
                        title="Upload profile picture"
                      >
                        <Camera size={18} />
                      </label>
                      <input
                        id="profile-picture-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                    </div>
                    {isUploadingImage && (
                      <p className="text-sm text-orange-600 font-semibold">Uploading...</p>
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <User className="text-orange-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <Mail className="text-orange-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <Phone className="text-orange-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {user.phone || "Not provided"}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="text-orange-500 mt-1" size={24} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {user.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Statistics Card - Only for customers */}
          {user.role !== "admin" && (
            <div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Account Statistics</h3>

                <div className="space-y-4">
                  {/* Total Orders */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Orders</p>
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
            </div>
          )}
        </div>

        {/* Orders History - Only for customers */}
        {user.role !== "admin" && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

            {orders && orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 border-b-2 border-gray-300">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900">Order ID</th>
                      <th className="px-4 py-3 font-semibold text-gray-900">Date</th>
                      <th className="px-4 py-3 font-semibold text-gray-900">Amount</th>
                      <th className="px-4 py-3 font-semibold text-gray-900">Status</th>
                      <th className="px-4 py-3 font-semibold text-gray-900">Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-sm text-gray-700 break-all">
                          {order.orderId}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          ₹{order.totalAmount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                              order.orderStatus === "delivered"
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
                              className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                                order.paymentStatus === "success"
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
        )}
      </div>
    </div>
  );
};

export default UserProfile;
