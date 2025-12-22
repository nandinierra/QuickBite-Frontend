

import React, { useState } from "react";

const AdminItemForm = ({
    formData,
    formErrors,
    handleInputChange,
    handleSubmit,
    resetForm,
    editingId
}) => {
    return (
        <div className="glass-panel rounded-2xl p-8 mb-8 animate-fadeIn border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/10">
                {editingId ? "Edit Food Item" : "Create New Food Item"}
            </h2>
            <form onSubmit={handleSubmit} className="admin-form space-y-6">
                <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Margherita Pizza"
                        className={`glass-input ${formErrors.name ? "border-red-500" : "focus:border-red-500"}`}
                        required
                    />
                    {formErrors.name && (
                        <span className="text-red-500 text-xs mt-1 block">{formErrors.name}</span>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Category *</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            placeholder="e.g., Pizza"
                            className={`glass-input ${formErrors.category ? "border-red-500" : "focus:border-red-500"}`}
                            required
                        />
                        {formErrors.category && (
                            <span className="text-red-500 text-xs mt-1 block">{formErrors.category}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Type *</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            placeholder="e.g., Vegetarian"
                            className={`glass-input ${formErrors.type ? "border-red-500" : "focus:border-red-500"}`}
                            required
                        />
                        {formErrors.type && (
                            <span className="text-red-500 text-xs mt-1 block">{formErrors.type}</span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Add a detailed description..."
                        className="glass-input focus:border-red-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="form-group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Regular Price *</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input
                                type="number"
                                name="price.regular"
                                value={formData.price.regular}
                                onChange={handleInputChange}
                                step="0.01"
                                min="0"
                                className={`glass-input pl-8 ${formErrors.price.regular ? "border-red-500" : "focus:border-red-500"}`}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Medium Price *</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input
                                type="number"
                                name="price.medium"
                                value={formData.price.medium}
                                onChange={handleInputChange}
                                step="0.01"
                                min="0"
                                className={`glass-input pl-8 ${formErrors.price.medium ? "border-red-500" : "focus:border-red-500"}`}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Large Price *</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input
                                type="number"
                                name="price.large"
                                value={formData.price.large}
                                onChange={handleInputChange}
                                step="0.01"
                                min="0"
                                className={`glass-input pl-8 ${formErrors.price.large ? "border-red-500" : "focus:border-red-500"}`}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                            className={`glass-input ${formErrors.image ? "border-red-500" : "focus:border-red-500"}`}
                        />
                        {formErrors.image && (
                            <span className="text-red-500 text-xs mt-1 block">{formErrors.image}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                        <input
                            type="text"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            placeholder="e.g., 4.5"
                            className={`glass-input ${formErrors.rating ? "border-red-500" : "focus:border-red-500"}`}
                        />
                        {formErrors.rating && (
                            <span className="text-red-500 text-xs mt-1 block">{formErrors.rating}</span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                    <input
                        type="checkbox"
                        name="popular"
                        id="popular"
                        checked={formData.popular}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-red-600 rounded focus:ring-red-500 border-gray-600 bg-gray-800 cursor-pointer"
                    />
                    <label htmlFor="popular" className="text-gray-300 font-medium cursor-pointer select-none">Mark as Popular Dish</label>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        {editingId ? "Update Item" : "Create Item"}
                    </button>
                    <button
                        type="button"
                        onClick={resetForm}
                        className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/10"
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminItemForm;
