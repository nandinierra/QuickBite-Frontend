import { createContext, useContext, useEffect, useReducer, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { cartReducer, initialState } from "../reducer/cartReducer.jsx";
import {toast} from "react-toastify"

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
      setIsLoading(false);
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
    const foodItem = state.cart.data.foodItems.find(item => item.itemId._id === itemId);
    if (!foodItem) return;

    const newQty =
      action === "increase" ? foodItem.quantity + 1 : Math.max(foodItem.quantity - 1, 1);

    
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, quantity: newQty } });

    
    try {
      await fetch(`${BACKEND_URL}/cart/update/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });
    } catch {
      fetchCartItems();
    }
  };


  const handleDelete = async (itemId) => {
    dispatch({ type: "DELETE_ITEM", payload: itemId });

    try {
      await fetch(`${BACKEND_URL}/cart/deleteItem/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      fetchCartItems();
    }
    toast.success(`Item  delete Successfully!`, {
            position: "bottom-right",
            autoClose: 1500,
          });
  };

  
  const handleClearCart = async () => {
    dispatch({ type: "CLEAR_CART" });

    try {
      await fetch(`${BACKEND_URL}/cart/clear`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      fetchCartItems();
    }
  };



  const addItemToCart = async (itemData) => {
    const existingItem = state.cart.data.foodItems.find(
      item => item.itemId._id === itemData.itemId
    );

    let isNewItem = true;
    if (existingItem) {
      isNewItem = false;
      const newQty = existingItem.quantity + itemData.quantity;
      console.log(newQty)
      dispatch({ 
        type: "UPDATE_QUANTITY", 
        payload: { itemId: itemData.itemId, quantity: newQty } 
      });
    } else {
      dispatch({ type: "ADD_ITEM", payload: itemData });
    }


    try {
      const response = await fetch(`${BACKEND_URL}/cart/addItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
      });

      const result = await response.json();
      console.log("result", result);
      
      
      fetchCartItems();
      return { success: true, isNewItem };
    } catch(err) {
      console.log(err);
      fetchCartItems();
      return { success: false, isNewItem };
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

console.log("state", state)

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
        logout,
        token,
        updateTokenState
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);
