import { createContext, useContext, useEffect, useReducer, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { cartReducer, initialState } from "../reducer/cartReducer.jsx";
import { toast } from "react-toastify"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";

const CartContext = createContext();


export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenState, setTokenState] = useState(() => Cookies.get("jwt_token"));
  const token = tokenState;

  // Verify user and fetch user details on mount or when token changes
  useEffect(() => {
    const verifyUserToken = async () => {
      if (token) {
        try {
          const response = await fetch(`${BACKEND_URL}/auth/api/verify`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const result = await response.json();
            setUser(result.user);
            setIsLoading(false);
          } else {
            // Token is invalid
            Cookies.remove("jwt_token");
            setUser(null);
            setTokenState(null);
          }
        } catch (error) {
          console.error("Error verifying user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

    };

    verifyUserToken();
  }, [token]);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/cart/getItems`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("Cart fetched from backend:", result);
      console.log("Cart items count:", result?.data?.foodItems?.length || 0);

      if (response.ok) {
        // Backend returns { data, length }, dispatch expects the full response
        dispatch({ type: "SET_CART", payload: result });
      } else {
        console.error("Failed to fetch cart:", result.message);
        // If cart fetch fails, initialize with empty cart
        dispatch({ type: "SET_CART", payload: { data: { foodItems: [] }, length: 0 } });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      // On error, initialize with empty cart
      dispatch({ type: "SET_CART", payload: { data: { foodItems: [] }, length: 0 } });
    }
  }, [token]);

  useEffect(() => {
    if (!hasInitialized && token) {
      fetchCartItems();

      setHasInitialized(true);
    }
  }, [token, hasInitialized, fetchCartItems]);



  const updateQuantity = async (itemId, action) => {
    try {
      console.log("updateQuantity called:", { itemId, action, cartItems: state.cart.data.foodItems.length });

      // Filter to only valid items (where itemId is not null)
      const validItems = state.cart.data.foodItems.filter(item => item?.itemId);

      // Defensive check for null itemId or missing items
      const foodItem = validItems.find(item => item?.itemId?._id === itemId);
      if (!foodItem) {
        console.error("Item not found in cart:", itemId);
        toast.error("Item not found in cart", {
          position: "bottom-right",
          autoClose: 1500,
        });
        // Refetch to get correct state
        await fetchCartItems();
        return;
      }

      const newQty =
        action === "increase" ? foodItem.quantity + 1 : Math.max(foodItem.quantity - 1, 1);

      console.log("Updating quantity:", { itemId, oldQty: foodItem.quantity, newQty, action });

      // Optimistically update local state
      dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, quantity: newQty } });

      // Send to backend
      const response = await fetch(`${BACKEND_URL}/cart/update/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      console.log("Update response status:", response.status);
      const result = await response.json();
      console.log("Update response:", result);

      if (!response.ok) {
        console.error("Failed to update quantity on backend:", result);
        toast.error(result.message || "Failed to update quantity", {
          position: "bottom-right",
          autoClose: 1500,
        });
        // Revert optimistic update by fetching fresh data
        await fetchCartItems();
        return;
      }

      toast.success("Quantity updated", {
        position: "bottom-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity", {
        position: "bottom-right",
        autoClose: 1500,
      });
      // Restore cart from backend on error
      await fetchCartItems();
    }
  };


  const handleDelete = async (itemId) => {
    try {
      console.log("handleDelete called:", { itemId });

      // Check if item exists with valid itemId
      const itemExists = state.cart.data.foodItems.some(item => item?.itemId?._id === itemId);
      if (!itemExists) {
        console.error("Item not found in cart for deletion:", itemId);
        toast.error("Item not found in cart", {
          position: "bottom-right",
          autoClose: 1500,
        });
        // Refetch to get correct state
        await fetchCartItems();
        return;
      }

      // Optimistically remove from local state
      dispatch({ type: "DELETE_ITEM", payload: itemId });

      // Send delete request to backend
      const response = await fetch(`${BACKEND_URL}/cart/deleteItem/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Delete response status:", response.status);
      const result = await response.json();
      console.log("Delete response:", result);

      if (!response.ok) {
        console.error("Failed to delete item from backend:", result);
        toast.error(result.message || "Failed to remove item", {
          position: "bottom-right",
          autoClose: 1500,
        });
        // Restore cart from backend on error
        await fetchCartItems();
        return;
      }

      toast.success(`Item removed successfully!`, {
        position: "bottom-right",
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      // Restore cart from backend on error
      await fetchCartItems();
      toast.error("Failed to remove item from cart", {
        position: "bottom-right",
        autoClose: 1500,
      });
    }
  };


  const handleClearCart = async (showToast = true) => {
    try {
      console.log("handleClearCart called", { showToast });

      // Optimistically clear local state
      dispatch({ type: "CLEAR_CART" });

      // Send clear request to backend
      const response = await fetch(`${BACKEND_URL}/cart/clear`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Clear cart response status:", response.status);
      const result = await response.json();
      console.log("Clear cart response:", result);

      if (!response.ok) {
        console.error("Failed to clear cart on backend:", result);
        // Restore cart from backend on error
        await fetchCartItems();

        if (showToast === true) {
          toast.error(result.message || "Failed to clear cart", {
            position: "bottom-right",
            autoClose: 1500,
          });
        }
        return;
      }

      if (showToast === true) {
        toast.success("Cart cleared successfully!", {
          position: "bottom-right",
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      // Restore cart from backend on error
      await fetchCartItems();

      if (showToast === true) {
        toast.error("Failed to clear cart", {
          position: "bottom-right",
          autoClose: 1500,
        });
      }
    }
  };



  const addItemToCart = async (itemData) => {
    try {
      // Validate required fields
      if (!itemData.itemId || !itemData.quantity || !itemData.size) {
        console.error("Missing required fields:", itemData);
        return { success: false, isNewItem: false };
      }

      // Check if user is authenticated
      if (!token) {
        console.error("User not authenticated - no token available");
        return { success: false, isNewItem: false };
      }

      // Check if food item exists in current cart (being defensive)
      const existingItem = state.cart.data.foodItems.find(
        item => item.itemId && item.itemId._id === itemData.itemId
      );

      let isNewItem = !existingItem;

      console.log("Adding to cart:", { itemData, isNewItem, tokenExists: !!token });

      // Optimistic UI Update
      const optimisticItem = {
        _id: `temp-${Date.now()}`, // Temporary ID
        itemId: {
          _id: itemData.itemId,
          name: "Item Added", // We don't have full details here unless passed, but that's okay for count/existence
          // Ideally we would pass the full item object to addItemToCart to display better empty states if needed
          // But for now, we just want to update the cart length/state
        },
        quantity: itemData.quantity,
        size: itemData.size,
        price: 0, // Placeholder
      };

      if (existingItem) {
        // If item exists, we are essentially increasing quantity (or adding duplicate line item depending on logic, 
        // but backend usually merges. Here we assume merge for simplicity or just add as new line in local state if unmatched size)

        // Actually, for optimistic add, if we don't know if backend merges, safer to just ADD ITEM locally. 
        // Or better yet, just trust the backend response usually? 
        // User requested instant update.

        // Let's Dispatch ADD_ITEM effectively for the visual feedback even if it might be merged later
        // But better: if we pass the full item object from ViewDetails, we can do this properly.
        // For now, let's just increment length or add to list to trigger UI update.

        const newQuantity = existingItem.quantity + itemData.quantity;
        dispatch({ type: "UPDATE_QUANTITY", payload: { itemId: itemData.itemId, quantity: newQuantity } });
      } else {
        dispatch({ type: "ADD_ITEM", payload: optimisticItem });
      }

      console.log("Optimistically updated cart");


      // Send to backend
      const response = await fetch(`${BACKEND_URL}/cart/addItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
      });

      console.log("Add to cart response status:", response.status);
      const result = await response.json();
      console.log("Add to cart response data:", result);

      if (!response.ok) {
        console.error("Backend error adding to cart:", result);
        // Revert on failure by fetching valid state
        await fetchCartItems();
        return { success: false, isNewItem };
      }

      // Fetch updated cart from backend to ensure consistency (background sync)
      // We don't await this to keep UI responsive, or we do if we want strict consistency.
      // Since user wants SPEED, we let this happen in background or after small delay
      fetchCartItems();

      return { success: true, isNewItem };
    } catch (err) {
      console.error("Error adding to cart (catch block):", err);
      // Refetch to restore state on error
      await fetchCartItems();
      return { success: false, isNewItem: false };
    }
  };

  const logout = () => {
    Cookies.remove("jwt_token");
    setTokenState(null);
    setUser(null);
    dispatch({ type: "CLEAR_CART" });
  };

  const updateTokenState = () => {
    const newToken = Cookies.get("jwt_token");
    setTokenState(newToken);
  };

  const refreshUser = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(`${BACKEND_URL}/auth/api/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setUser(result.user);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  }, [token]);

  const updateUser = (updatedUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUserData,
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        loading: state.loading,
        updateQuantity,
        handleDelete,
        handleClearCart,
        addItemToCart,
        cartLength: state.length,
        user,
        isLoading,
        setIsLoading,
        logout,
        token,
        updateTokenState,
        refreshUser,
        updateUser
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);
