


import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie"

const ViewDetails = () => {
  const navigate=useNavigate()
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size,setSize] = useState("Regular")
  const token=Cookies.get("jwt_token")
  
  useEffect(() => {
    const getItem = async () => {
      try {
        const url = `https://quickbite-backendd.onrender.com/foodItems/getItemId/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setItem(data.food);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    getItem();
  }, [id]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    console.log("Added to cart:", { ...item, quantity });
     const postItem = async ()=>{
        const options={
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          },
          
          body:JSON.stringify({itemId:id,
            quantity,size
          })
        }
        const response=await fetch("http://localhost:3060/cart/addItem", options)
        const data=await response.json()
        console.log(data)
        navigate("/cart")
     }
     postItem()
  };



  if (!item) return <p className="text-center mt-10">Loading item details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-20">
  
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={item.image}
          alt={item.name}
          className="w-full md:w-1/2 rounded-2xl object-cover shadow-lg"
        />

        {/* Info Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-1">
              <strong>Category:</strong> {item.category}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Type:</strong> {item.type}
            </p>
            <p className="text-gray-700 mt-3">{item.description}</p>
          </div>


          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Price:</h3>
            <div className="text-gray-800 space-y-1">
              <button onClick={()=>setSize("Regular")}>Regular: ₹{item.price.regular}</button>
              <button onClick={()=>setSize("Medium")}>Medium: ₹{item.price.medium}</button>
              <button onClick={()=>setSize("Large")}>Large: ₹{item.price.large}</button>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleDecrease}
              className="bg-gray-300 px-3 py-1 rounded-lg text-xl font-bold"
            >
              −
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="bg-gray-300 px-3 py-1 rounded-lg text-xl font-bold"
            >
              +
            </button>

            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 ml-6"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
