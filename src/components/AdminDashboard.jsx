import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminItemForm from "./AdminItemForm";
import AdminFilters from "./AdminFilters";
import AdminFoodGrid from "./AdminFoodGrid";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const {
    user,
    loading,
    showForm,
    setShowForm,
    editingId,
    selectedCategory,
    setSelectedCategory,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    formData,
    setFormData,
    formErrors,
    handleInputChange,
    handleSubmit,
    resetForm,
    handleEdit,
    handleDelete,
    handleDeactivate,
    handleReactivate,
    filteredItems
  } = useAdminDashboard();

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-transparent font-sans">
      <AdminSidebar
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="flex-1 ml-64 p-8">
        <div className="admin-dashboard-content max-w-7xl mx-auto">
          {/* Header Area */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {selectedCategory === "all" ? "All Items" : `${selectedCategory} Management`}
              </h1>
              <p className="text-gray-400 mt-1">Manage your food items and inventory</p>
            </div>

            <button
              onClick={() => {
                if (showForm) {
                  resetForm();
                } else {
                  setShowForm(true);
                  if (selectedCategory !== "all") {
                    setFormData(prev => ({ ...prev, category: selectedCategory }));
                  }
                }
              }}
              className={`px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2
                ${showForm
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                }`}
            >
              <span className="text-xl">{showForm ? "×" : "+"}</span>
              {showForm ? "Cancel" : "Add New Item"}
            </button>
          </div>

          {showForm && (
            <AdminItemForm
              formData={formData}
              formErrors={formErrors}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              resetForm={resetForm}
              editingId={editingId}
            />
          )}

          <AdminFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
            loading={loading}
            totalItems={filteredItems.length}
          />

          <AdminFoodGrid
            items={filteredItems}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDeactivate={handleDeactivate}
            onReactivate={handleReactivate}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
