import { useState, useEffect, useCallback } from "react";
import { useCart } from "../context/context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Edit2 } from "lucide-react";
import ProfileInfo from "./ProfileInfo";
import ProfileStats from "./ProfileStats";
import OrderHistory from "./OrderHistory";

const UserProfile = () => {
  const { token, refreshUser, updateUser } = useCart();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3060";

  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: "", email: "", phone: "", address: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [retryingOrderId, setRetryingOrderId] = useState(null);

  const fetchUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/profile/get`, {
        method: "GET", headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}` 
        },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch profile");
      const data = await response.json();
      setProfileData(data);
      setEditFormData({
        name: data.user.name, email: data.user.email, phone: data.user.phone || "", address: data.user.address || ""
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile", { position: "bottom-right", autoClose: 1500 });
    } finally {
      setIsLoading(false);
    }
  }, [token, BACKEND_URL]);

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetchUserProfile();
  }, [token, navigate, fetchUserProfile]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: name === "email" ? value.toLowerCase() : value }));
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      const response = await fetch(`${BACKEND_URL}/profile/update`, {
        method: "PUT", headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}` 
        },
        credentials: "include",
        body: JSON.stringify(editFormData)
      });
      if (!response.ok) { const error = await response.json(); throw new Error(error.message || "Failed to update profile"); }
      const data = await response.json();
      setProfileData(prev => ({ ...prev, user: { ...prev.user, ...data.user } }));
      updateUser(data.user);
      await fetchUserProfile();
      setIsEditing(false);
      toast.success("Profile updated successfully", { position: "bottom-right", autoClose: 1500 });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile", { position: "bottom-right", autoClose: 1500 });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select a valid image file", { position: "bottom-right", autoClose: 1500 }); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("File size must be less than 5MB", { position: "bottom-right", autoClose: 1500 }); return; }

    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append("profilePicture", file);
      const response = await fetch(`${BACKEND_URL}/profile/upload-picture`, {
        method: "POST", headers: {
          // Authorization: `Bearer ${token}` 
        },
        credentials: "include",
        body: formData
      });
      if (!response.ok) { const error = await response.json(); throw new Error(error.message || "Failed to upload image"); }
      const data = await response.json();
      setProfileData(prev => ({ ...prev, user: data.user }));
      updateUser({ profilePicture: data.user.profilePicture });
      await refreshUser();
      toast.success("Profile picture updated successfully", { position: "bottom-right", autoClose: 1500 });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(error.message || "Failed to upload profile picture", { position: "bottom-right", autoClose: 1500 });
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleRetryPayment = (orderId) => { navigate('/payment', { state: { orderId } }); };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div><p className="mt-4 text-gray-600">Loading profile...</p></div></div>;
  if (!profileData) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><p className="text-gray-600 mb-4">Failed to load profile</p><button onClick={fetchUserProfile} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Retry</button></div></div>;

  const { user, statistics, orders } = profileData;

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-white animate-fade-in">My Profile</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base animate-fade-in-up">Manage your personal information and view your order history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={user.role === "admin" ? "lg:col-span-3" : "lg:col-span-2"}>
            <div className="glass-panel rounded-lg shadow-lg p-8 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white">Personal Information</h2>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    <Edit2 size={18} /> Edit
                  </button>
                )}
              </div>
              <ProfileInfo
                user={user} isEditing={isEditing} setIsEditing={setIsEditing} editFormData={editFormData}
                handleEditChange={handleEditChange} handleSaveProfile={handleSaveProfile}
                handleImageUpload={handleImageUpload} isSaving={isSaving} isUploadingImage={isUploadingImage}
              />
            </div>
          </div>
          {user.role !== "admin" && <div><ProfileStats statistics={statistics} user={user} /></div>}
        </div>
        {user.role !== "admin" && <OrderHistory orders={orders} handleRetryPayment={handleRetryPayment} retryingOrderId={retryingOrderId} />}
      </div>
    </div>
  );
};

export default UserProfile;
