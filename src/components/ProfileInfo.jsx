import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera } from "lucide-react";

const ProfileInfo = ({
    user,
    isEditing,
    setIsEditing,
    editFormData,
    handleEditChange,
    handleSaveProfile,
    handleImageUpload,
    isSaving,
    isUploadingImage
}) => {
    if (isEditing) {
        return (
            <div className="space-y-4">
                {/* Name Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-white/20 bg-black/40 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        <X size={18} />
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
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
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <User className="text-orange-500" size={24} />
                <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-lg font-semibold text-white">{user.name}</p>
                </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                <Mail className="text-orange-500" size={24} />
                <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-lg font-semibold text-white">{user.email}</p>
                </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                <Phone className="text-orange-500" size={24} />
                <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-lg font-semibold text-white">
                        {user.phone || "Not provided"}
                    </p>
                </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
                <MapPin className="text-orange-500 mt-1" size={24} />
                <div className="flex-1">
                    <p className="text-sm text-gray-400">Address</p>
                    <p className="text-lg font-semibold text-white">
                        {user.address || "Not provided"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
