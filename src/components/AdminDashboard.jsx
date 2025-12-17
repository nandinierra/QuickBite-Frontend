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
  const [sortBy, setSortBy] = useState("newest");
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("price.")) {
      const priceField = name.split(".")[1];
      setFormData({
        ...formData,
        price: {
          ...formData.price,
          [priceField]: parseFloat(value) || 0,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
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
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.type) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.price.regular <= 0 || formData.price.medium <= 0 || formData.price.large <= 0) {
      toast.error("All prices must be greater than 0");
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

    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "nameAZ") {
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
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <p className="subtitle">Manage your restaurant's menu items</p>
        </div>
        <div className="admin-header-actions">
          <div className="admin-user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role.toUpperCase()}</span>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>

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
                  required
                />
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
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Type *</label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    placeholder="e.g., Vegetarian"
                    required
                  />
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
                    required
                  />
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
                    required
                  />
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
                    required
                  />
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
                  />
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <input
                    type="text"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    placeholder="e.g., 4.5"
                  />
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
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
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
                        ✏️ Edit
                      </button>

                      {item.isActive ? (
                        <button
                          onClick={() => handleDeactivate(item._id)}
                          className="action-btn deactivate-btn"
                          title="Deactivate item"
                        >
                          👁️ Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReactivate(item._id)}
                          className="action-btn reactivate-btn"
                          title="Reactivate item"
                        >
                          🔄 Reactivate
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="action-btn delete-btn"
                        title="Delete item"
                      >
                        🗑️ Delete
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
