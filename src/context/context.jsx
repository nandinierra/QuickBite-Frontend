import { createContext, useContext, useEffect, useReducer, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { cartReducer, initialState } from "../reducer/cartReducer.jsx";
import {toast} from "react-toastify"


const CartContext = createContext();


export const CartProvider = ({ children }) => {
 
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [hasInitialized, setHasInitialized] = useState(false);
  const token = Cookies.get("jwt_token");
  
  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch("https://quickbite-backendd.onrender.com/cart/getItems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("fatchedData",result)
      if (response.ok) {
        dispatch({ type: "SET_CART", payload: result });  
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
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
      await fetch(`https://quickbite-backendd.onrender.com/cart/update/${itemId}`, {
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
      await fetch(`https://quickbite-backendd.onrender.com/cart/deleteItem/${itemId}`, {
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
      await fetch("https://quickbite-backendd.onrender.com/cart/clear", {
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
      const response = await fetch("https://quickbite-backendd.onrender.com/cart/addItem", {
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
        cartLength: state.length
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);
