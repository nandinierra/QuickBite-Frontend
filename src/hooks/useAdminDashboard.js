

import { useState, useEffect } from "react";
import { useCart } from "../context/context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useAdminDashboard = () => {
    const { user, token } = useCart();
    const navigate = useNavigate();
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("nameAZ");
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        type: "",
        description: "",
        price: { regular: 0, medium: 0, large: 0 },
        image: "",
        popular: false,
        rating: "0",
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        category: "",
        type: "",
        price: { regular: "", medium: "", large: "" },
        image: "",
        rating: "",
    });

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";

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
                    // Authorization: `Bearer ${token}` 
                },
                credentials: "include",
            });
            const data = await response.json();
            if (response.ok) setFoodItems(data.food);
            else toast.error(data.message || "Failed to fetch food items");
        } catch (error) {
            console.error("Error fetching food items:", error);
            toast.error("Failed to fetch food items");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "", category: "", type: "", description: "",
            price: { regular: 0, medium: 0, large: 0 },
            image: "", popular: false, rating: "0",
        });
        setFormErrors({
            name: "", category: "", type: "",
            price: { regular: "", medium: "", large: "" },
            image: "", rating: "",
        });
        setEditingId(null);
        setShowForm(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this item?")) return;
        try {
            const response = await fetch(`${BACKEND_URL}/foodItems/admin/delete/${id}`, {
                method: "DELETE",
                headers: {
                    // Authorization: `Bearer ${token}` 
                },
                credentials: "include",
            });
            if (response.ok) {
                toast.success("Item deleted successfully");
                setFoodItems(prev => prev.filter(item => item._id !== id));
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
            const response = await fetch(`${BACKEND_URL}/foodItems/admin/deactivate/${id}`, {
                method: "PATCH",
                headers: {
                    // Authorization: `Bearer ${token}` 
                },
                credentials: "include",
            });
            if (response.ok) {
                toast.success("Item deactivated successfully");
                setFoodItems(prev => prev.map(item => item._id === id ? { ...item, isActive: false } : item));
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
            const response = await fetch(`${BACKEND_URL}/foodItems/admin/reactivate/${id}`, {
                method: "PATCH",
                headers: {
                    // Authorization: `Bearer ${token}` 
                },
                credentials: "include",
            });
            if (response.ok) {
                toast.success("Item reactivated successfully");
                setFoodItems(prev => prev.map(item => item._id === id ? { ...item, isActive: true } : item));
            } else {
                const data = await response.json();
                toast.error(data.message || "Failed to reactivate item");
            }
        } catch (error) {
            console.error("Error reactivating item:", error);
            toast.error("Failed to reactivate item");
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
            name: "", category: "", type: "",
            price: { regular: "", medium: "", large: "" },
            image: "", rating: "",
        });
        setEditingId(item._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // --- Validation Logic ---
    const validateName = (value) => !value.trim() ? "Name is required" : (value.trim().length < 3 ? "Name must be at least 3 characters" : (value.trim().length > 100 ? "Name must not exceed 100 characters" : ""));
    const validateCategory = (value) => !value.trim() ? "Category is required" : (value.trim().length < 2 ? "Category must be at least 2 characters" : (value.trim().length > 50 ? "Category must not exceed 50 characters" : ""));
    const validateType = (value) => !value.trim() ? "Type is required" : (value.trim().length < 2 ? "Type must be at least 2 characters" : (value.trim().length > 50 ? "Type must not exceed 50 characters" : ""));
    const validatePrice = (value) => { const num = parseFloat(value); return (isNaN(num) || num <= 0) ? "Price must be greater than 0" : (num > 100000 ? "Price must not exceed 100,000" : ""); };
    const validateImageUrl = (value) => { if (!value.trim()) return ""; try { new URL(value); return ""; } catch { return "Please enter a valid URL"; } };
    const validateRating = (value) => { if (!value.trim()) return ""; const num = parseFloat(value); return (isNaN(num)) ? "Rating must be a number" : ((num < 0 || num > 5) ? "Rating must be between 0 and 5" : ""); };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("price.")) {
            const priceField = name.split(".")[1];
            setFormData({ ...formData, price: { ...formData.price, [priceField]: parseFloat(value) || 0 } });
            setFormErrors({ ...formErrors, price: { ...formErrors.price, [priceField]: validatePrice(value) } });
        } else {
            setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
            let error = "";
            if (name === "name") error = validateName(value);
            else if (name === "category") error = validateCategory(value);
            else if (name === "type") error = validateType(value);
            else if (name === "image") error = validateImageUrl(value);
            else if (name === "rating") error = validateRating(value);
            setFormErrors({ ...formErrors, [name]: error });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nameError = validateName(formData.name);
        const categoryError = validateCategory(formData.category);
        const typeError = validateType(formData.type);
        const regularPriceError = validatePrice(formData.price.regular.toString());
        const mediumPriceError = validatePrice(formData.price.medium.toString());
        const largePriceError = validatePrice(formData.price.large.toString());
        const imageError = validateImageUrl(formData.image);
        const ratingError = validateRating(formData.rating);

        setFormErrors({
            name: nameError, category: categoryError, type: typeError,
            price: { regular: regularPriceError, medium: mediumPriceError, large: largePriceError },
            image: imageError, rating: ratingError,
        });

        if (nameError || categoryError || typeError || regularPriceError || mediumPriceError || largePriceError || imageError || ratingError) {
            toast.error("Please fix the validation errors before submitting");
            return;
        }

        try {
            let response;
            if (editingId) {
                response = await fetch(`${BACKEND_URL}/foodItems/admin/update/${editingId}`, {
                    method: "PUT", headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${token}` 
                    },
                    credentials: "include",
                    body: JSON.stringify(formData),
                });
            } else {
                response = await fetch(`${BACKEND_URL}/foodItems/admin/create`, {
                    method: "POST", headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${token}` 
                    },
                    credentials: "include",
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

    const getFilteredAndSortedItems = () => {
        let filtered = foodItems;
        if (filterStatus === "active") filtered = filtered.filter(item => item.isActive);
        else if (filterStatus === "inactive") filtered = filtered.filter(item => !item.isActive);

        if (searchTerm) filtered = filtered.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase()));
        if (selectedCategory !== "all") filtered = filtered.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase());

        if (sortBy === "nameAZ") filtered.sort((a, b) => a.name.localeCompare(b.name));
        else if (sortBy === "nameZA") filtered.sort((a, b) => b.name.localeCompare(a.name));

        return filtered;
    };

    return {
        user,
        foodItems,
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
        filteredItems: getFilteredAndSortedItems()
    };
};
