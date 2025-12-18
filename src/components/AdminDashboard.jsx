import React, { useState, useEffect } from "react";
import { useCart } from "../context/context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/AdminDashboard.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";

const AdminDashboard = () => {
  const { user, token, logout } = useCart();
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nameAZ");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    type: "",
    description: "",
    price: {
      regular: 0,
      medium: 0,
      large: 0,
    },
    image: "",
    popular: false,
    rating: "0",
  });
  
  // Form validation errors
  const [formErrors, setFormErrors] = useState({
    name: "",
    category: "",
    type: "",
    price: {
      regular: "",
      medium: "",
      large: "",
    },
    image: "",
    rating: "",
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      toast.error("You don't have admin access");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (token && user?.role === "admin") {
      fetchFoodItems();
    }
  }, [token, user]);

  const fetchFoodItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/foodItems/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setFoodItems(data.food);
      } else {
        toast.error(data.message || "Failed to fetch food items");
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
      toast.error("Failed to fetch food items");
    } finally {
      setLoading(false);
    }
  };

  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) return "Name is required";
    if (value.trim().length < 3) return "Name must be at least 3 characters";
    if (value.trim().length > 100) return "Name must not exceed 100 characters";
    return "";
  };

  const validateCategory = (value) => {
    if (!value.trim()) return "Category is required";
    if (value.trim().length < 2) return "Category must be at least 2 characters";
    if (value.trim().length > 50) return "Category must not exceed 50 characters";
    return "";
  };

  const validateType = (value) => {
    if (!value.trim()) return "Type is required";
    if (value.trim().length < 2) return "Type must be at least 2 characters";
    if (value.trim().length > 50) return "Type must not exceed 50 characters";
    return "";
  };

  const validatePrice = (value) => {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) return "Price must be greater than 0";
    if (num > 100000) return "Price must not exceed 100,000";
    return "";
  };

  const validateImageUrl = (value) => {
    if (!value.trim()) return ""; // Optional field
    try {
      new URL(value);
      return "";
    } catch {
      return "Please enter a valid URL";
    }
  };

  const validateRating = (value) => {
    if (!value.trim()) return ""; // Optional field
    const num = parseFloat(value);
    if (isNaN(num)) return "Rating must be a number";
    if (num < 0 || num > 5) return "Rating must be between 0 and 5";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("price.")) {
      const priceField = name.split(".")[1];
      const numValue = parseFloat(value) || 0;
      setFormData({
        ...formData,
        price: {
          ...formData.price,
          [priceField]: numValue,
        },
      });
      // Validate price
      setFormErrors({
        ...formErrors,
        price: {
          ...formErrors.price,
          [priceField]: validatePrice(value),
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
      
      // Validate field
      let error = "";
      if (name === "name") error = validateName(value);
      else if (name === "category") error = validateCategory(value);
      else if (name === "type") error = validateType(value);
      else if (name === "image") error = validateImageUrl(value);
      else if (name === "rating") error = validateRating(value);
      
      setFormErrors({
        ...formErrors,
        [name]: error,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      type: "",
      description: "",
      price: {
        regular: 0,
        medium: 0,
        large: 0,
      },
      image: "",
      popular: false,
      rating: "0",
    });
    setFormErrors({
      name: "",
      category: "",
      type: "",
      price: {
        regular: "",
        medium: "",
        large: "",
      },
      image: "",
      rating: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(formData.name);
    const categoryError = validateCategory(formData.category);
    const typeError = validateType(formData.type);
    const regularPriceError = validatePrice(formData.price.regular.toString());
    const mediumPriceError = validatePrice(formData.price.medium.toString());
    const largePriceError = validatePrice(formData.price.large.toString());
    const imageError = validateImageUrl(formData.image);
    const ratingError = validateRating(formData.rating);

    setFormErrors({
      name: nameError,
      category: categoryError,
      type: typeError,
      price: {
        regular: regularPriceError,
        medium: mediumPriceError,
        large: largePriceError,
      },
      image: imageError,
      rating: ratingError,
    });

    if (nameError || categoryError || typeError || regularPriceError || mediumPriceError || largePriceError || imageError || ratingError) {
      toast.error("Please fix the validation errors before submitting");
      return;
    }

    try {
      let response;
      if (editingId) {
        response = await fetch(
          `${BACKEND_URL}/foodItems/admin/update/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );
      } else {
        response = await fetch(`${BACKEND_URL}/foodItems/admin/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();

      if (response.ok) {
        toast.success(editingId ? "Item updated successfully" : "Item created successfully");
        fetchFoodItems();
        resetForm();
      } else {
        toast.error(data.message || "Error saving item");
      }
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error("Failed to save item");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      category: item.category,
      type: item.type,
      description: item.description || "",
      price: item.price || { regular: 0, medium: 0, large: 0 },
      image: item.image || "",
      popular: item.popular || false,
      rating: item.rating || "0",
    });
    setFormErrors({
      name: "",
      category: "",
      type: "",
      price: {
        regular: "",
        medium: "",
        large: "",
      },
      image: "",
      rating: "",
    });
    setEditingId(item._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this item?")) {
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/foodItems/admin/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Item deleted successfully");
        fetchFoodItems();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  const handleDeactivate = async (id) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/foodItems/admin/deactivate/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Item deactivated successfully");
        fetchFoodItems();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to deactivate item");
      }
    } catch (error) {
      console.error("Error deactivating item:", error);
      toast.error("Failed to deactivate item");
    }
  };

  const handleReactivate = async (id) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/foodItems/admin/reactivate/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Item reactivated successfully");
        fetchFoodItems();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to reactivate item");
      }
    } catch (error) {
      console.error("Error reactivating item:", error);
      toast.error("Failed to reactivate item");
    }
  };

  const getFilteredAndSortedItems = () => {
    let filtered = foodItems;

    if (filterStatus === "active") {
      filtered = filtered.filter(item => item.isActive);
    } else if (filterStatus === "inactive") {
      filtered = filtered.filter(item => !item.isActive);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "nameAZ") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "nameZA") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  const filteredItems = getFilteredAndSortedItems();

  return (
    <div className="admin-dashboard"> 
      <div className="admin-container">
        <div className="admin-controls">
          <button
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
              }
            }}
            className={`add-item-btn ${showForm ? "cancel" : ""}`}
          >
            {showForm ? "Cancel" : "+ Add New Item"}
          </button>
        </div>

        {showForm && (
          <div className="form-container">
            <h2>{editingId ? "Edit Food Item" : "Create New Food Item"}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Margherita Pizza"
                  className={formErrors.name ? "error" : ""}
                  required
                />
                {formErrors.name && (
                  <span className="error-message">{formErrors.name}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g., Pizza"
                    className={formErrors.category ? "error" : ""}
                    required
                  />
                  {formErrors.category && (
                    <span className="error-message">{formErrors.category}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Type *</label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    placeholder="e.g., Vegetarian"
                    className={formErrors.type ? "error" : ""}
                    required
                  />
                  {formErrors.type && (
                    <span className="error-message">{formErrors.type}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Add a detailed description..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Regular Price *</label>
                  <input
                    type="number"
                    name="price.regular"
                    value={formData.price.regular}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className={formErrors.price.regular ? "error" : ""}
                    required
                  />
                  {formErrors.price.regular && (
                    <span className="error-message">{formErrors.price.regular}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Medium Price *</label>
                  <input
                    type="number"
                    name="price.medium"
                    value={formData.price.medium}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className={formErrors.price.medium ? "error" : ""}
                    required
                  />
                  {formErrors.price.medium && (
                    <span className="error-message">{formErrors.price.medium}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Large Price *</label>
                  <input
                    type="number"
                    name="price.large"
                    value={formData.price.large}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className={formErrors.price.large ? "error" : ""}
                    required
                  />
                  {formErrors.price.large && (
                    <span className="error-message">{formErrors.price.large}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className={formErrors.image ? "error" : ""}
                  />
                  {formErrors.image && (
                    <span className="error-message">{formErrors.image}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <input
                    type="text"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    placeholder="e.g., 4.5"
                    className={formErrors.rating ? "error" : ""}
                  />
                  {formErrors.rating && (
                    <span className="error-message">{formErrors.rating}</span>
                  )}
                </div>
              </div>

              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  name="popular"
                  id="popular"
                  checked={formData.popular}
                  onChange={handleInputChange}
                />
                <label htmlFor="popular">Mark as Popular Dish</label>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editingId ? "Update Item" : "Create Item"}
                </button>
                <button type="button" onClick={resetForm} className="cancel-btn">
                  Clear
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="items-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Items</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="nameAZ">Name (A-Z)</option>
              <option value="nameZA">Name (Z-A)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading items...</div>
        ) : (
          <>
            <div className="items-header">
              <h3>Food Items ({filteredItems.length})</h3>
              <p className="total-items">Total: {foodItems.length}</p>
            </div>

            {filteredItems.length === 0 ? (
              <div className="no-items">
                <p>No food items found. {searchTerm ? "Try a different search." : "Create your first item!"}</p>
              </div>
            ) : (
              <div className="items-grid">
                {filteredItems.map((item) => (
                  <div key={item._id} className={`item-card ${!item.isActive ? "inactive" : ""}`}>
                    {!item.isActive && <div className="inactive-badge">Inactive</div>}
                    {item.popular && <div className="popular-badge">Popular</div>}
                    
                    <div className="item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </div>

                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-meta">
                        <span className="category">{item.category}</span>
                        <span className="type">{item.type}</span>
                      </p>
                      
                      {item.description && (
                        <p className="item-description">{item.description.substring(0, 100)}...</p>
                      )}

                      <div className="item-prices">
                        <span className="price">₹{item.price?.regular || 0}</span>
                        <span className="price">₹{item.price?.medium || 0}</span>
                        <span className="price">₹{item.price?.large || 0}</span>
                      </div>

                      {item.rating && (
                        <p className="item-rating">Rating: {item.rating}⭐</p>
                      )}
                    </div>

                    <div className="item-actions">
                      <button
                        onClick={() => handleEdit(item)}
                        className="action-btn edit-btn"
                        title="Edit item"
                      >
                         Edit
                      </button>

                      {item.isActive ? (
                        <button
                          onClick={() => handleDeactivate(item._id)}
                          className="action-btn deactivate-btn"
                          title="Deactivate item"
                        >
                           Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReactivate(item._id)}
                          className="action-btn reactivate-btn"
                          title="Reactivate item"
                        >
                           Reactivate
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="action-btn delete-btn"
                        title="Delete item"
                      >
                         Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
