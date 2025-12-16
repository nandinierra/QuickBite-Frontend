
// Get initial length from localStorage if available
const getInitialLength = () => {
  try {
    const savedLength = localStorage.getItem("cartLength");
    return savedLength ? parseInt(savedLength, 10) : 0;
  } catch {
    return 0;
  }
};


export const initialState = {
  cart: { data: { foodItems: [] } },
  loading: false,
  length: getInitialLength(),
};


export function cartReducer(state, action) {
  console.log("action", action)
  switch (action.type) {
    case "SET_CART": {
      // Filter out items with null itemId to prevent crashes
      const validFoodItems = action.payload?.data?.foodItems?.filter(item => item?.itemId) || [];
      const newLength = validFoodItems.length;
      try {
        localStorage.setItem("cartLength", newLength.toString());
      } catch {
        console.error("Failed to save cart length to localStorage");
      }
      return { 
        ...state, 
        cart: { 
          ...action.payload,
          data: {
            ...action.payload?.data,
            foodItems: validFoodItems
          }
        }, 
        length: newLength, 
        loading: false 
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedCart = {
        ...state.cart,
        data: {
          ...state.cart.data,
          foodItems: state.cart.data.foodItems.map(item =>
            item?.itemId?._id === action.payload.itemId
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        },
      };
      const updatedLength = updatedCart.data.foodItems.length;
      try {
        localStorage.setItem("cartLength", updatedLength.toString());
      } catch {
        console.error("Failed to save cart length to localStorage");
      }
      return {
        ...state,
        cart: updatedCart,
        length: updatedLength,
      };
    }

    case "DELETE_ITEM": {
      const filteredCart = {
        ...state.cart,
        data: {
          ...state.cart.data,
          foodItems: state.cart.data.foodItems.filter(
            item => item?.itemId?._id !== action.payload
          ),
        },
      };
      const deletedLength = filteredCart.data.foodItems.length;
      try {
        localStorage.setItem("cartLength", deletedLength.toString());
      } catch {
        console.error("Failed to save cart length to localStorage");
      }
      return {
        ...state,
        cart: filteredCart,
        length: deletedLength,
      };
    }

    case "CLEAR_CART":
      try {
        localStorage.setItem("cartLength", "0");
      } catch {
        console.error("Failed to save cart length to localStorage");
      }
      return { 
        ...state, 
        cart: { data: { foodItems: [] } },
        length: 0 
      };

    case "ADD_ITEM": {
      const newCart = {
        ...state.cart,
        data: {
          ...state.cart.data,
          foodItems: [...state.cart.data.foodItems, action.payload]
        }
      };
      const addedLength = newCart.data.foodItems.length;
      try {
        localStorage.setItem("cartLength", addedLength.toString());
      } catch {
        console.error("Failed to save cart length to localStorage");
      }
      return {
        ...state,
        cart: newCart,
        length: addedLength,
      };
    }

    default:
      return state;
  }
}

