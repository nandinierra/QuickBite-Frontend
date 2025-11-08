
import { createContext, useContext, useState } from "react";
import { useEffect  } from "react";
import Cookies from "js-cookie";


const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
   // show celebration card
  const token = Cookies.get("jwt_token");
  const [cartLength, setCartLength] = useState();
  console.log(cart);
  
  const fetchCartItems = async () => {
    try {
      const response = await fetch("https://quickbite-backendd.onrender.com/cart/getItems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (response.ok){ 
        setCart(data);
        setCartLength(data.foodItems.length)
        console.log("data:", data);
         console.log("lenght", data.foodItems.length)
    
        // setCartLength();

      };
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

 console.log(cart)

  const updateQuantity = async (itemId, action) => {
    try {
      const response = await fetch(
        `https://quickbite-backendd.onrender.com/cart/update/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ action }),
        }
      );
      if (response.ok) fetchCartItems();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  
  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `https://quickbite-backendd.onrender.com/cart/deleteItem/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) fetchCartItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };


  
  const handleClearCart = async () => {
    try {
      const response = await fetch("https://quickbite-backendd.onrender.com/cart/clear", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) setCart({ foodItems: [] });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{
        cart,
        loading,
        cartLength,   // ✅ Use this in Navbar
        updateQuantity,
        handleDelete,
        handleClearCart,
        fetchCartItems,
      }}>
      {children}
    </CartContext.Provider>
  );


};

export const useCart = () => useContext(CartContext);
