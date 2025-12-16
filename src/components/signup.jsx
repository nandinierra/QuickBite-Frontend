

import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";


const Signup = () => {
  const navigate = useNavigate();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [adminSecretKey, setAdminSecretKey] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
 
  const nameInput = (event) => {
    setErrorMsg("");
    setUsername(event.target.value);
    
  }; 

  const emailInput=(event)=>{
        setErrorMsg("");
        setEmail(event.target.value);
         
  }
  const passwordInput=(event)=>{
      setErrorMsg("");
      setPassword(event.target.value)
  }

  const roleInput=(event)=>{
      setErrorMsg("");
      setRole(event.target.value)
  }


  const onSubmitSuccess = () => {
    console.log("on submit success")
    navigate("/login", { replace: true });
  };

  const onSubmitFailure = (e) => {
    console.log(e)
    setShowErrorMsg(true);
    setErrorMsg(e);
  };


  const signupForm = async (event) => {
    event.preventDefault();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";
    const url = `${BACKEND_URL}/auth/register`;
    const userDetails = { 
      name, 
      email, 
      password, 
      role,
      ...(role === "admin" && { adminSecretKey })
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      onSubmitSuccess();
    } else {
      onSubmitFailure(data.message);
    }
  };


  const token = Cookies.get("jwt_token");
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative bg-[url('https://i.pinimg.com/736x/48/a9/74/48a9742a6ca340599dc847272c028874.jpg')] bg-cover bg-center bg-black/60 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_8%,rgba(0,0,0,0.8)_80%)]"></div>

      <form
        onSubmit={signupForm}
        className="relative z-10 bg-black/80 text-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-[400px] flex flex-col"
      >
        
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center">Sign Up</h1>
        </div>

        
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-1 text-sm sm:text-base">
            NAME 
          </label>
          <input
            onChange={nameInput}
            value={name}
            type="text"
            id="name"
            placeholder="Enter your name"
            className="bg-[#333333] p-2 sm:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

       
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-1 text-sm sm:text-base">
            EMAIL
          </label>
          <input
            value={email}
            onChange={emailInput}
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className="bg-[#333333] p-2 sm:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

       
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="mb-1 text-sm sm:text-base">
            PASSWORD
          </label>
          <input
            value={password}
            onChange={passwordInput}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="bg-[#333333] p-2 sm:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="role" className="mb-1 text-sm sm:text-base">
            SELECT ROLE
          </label>
          <select
            value={role}
            onChange={roleInput}
            id="role"
            className="bg-[#333333] p-2 sm:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>

        {role === "admin" && (
          <div className="flex flex-col mb-4">
            <label htmlFor="adminSecretKey" className="mb-1 text-sm sm:text-base">
              ADMIN SECRET KEY
            </label>
            <input
              value={adminSecretKey}
              onChange={(event) => {
                setErrorMsg("");
                setAdminSecretKey(event.target.value);
              }}
              type="password"
              id="adminSecretKey"
              placeholder="Enter admin secret key"
              className="bg-[#333333] p-2 sm:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}

       
        
        {showErrorMsg && (
          <p className="text-red-500 text-center text-sm mb-2">{errorMsg}</p>
        )}

        
        <button
          type="submit"
          className="bg-gradient-to-r mt-4 cursor-pointer from-red-700 to-orange-600 py-2 sm:py-3 rounded-lg font-semibold text-white text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          Sign Up
        </button> 

          <p className="text-center text-sm sm:text-base mt-4 text-gray-300">
  Already have an account?{" "}
  <span
    onClick={() => navigate("/login")}
    className="text-red-400 hover:text-red-500 cursor-pointer font-semibold"
  >
    Login
  </span>
</p>


      </form>
    </div>
  );
};


export default Signup;

