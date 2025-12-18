

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
  
  // Field-level validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    adminSecretKey: ""
  });
 
  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) {
      return "Name is required";
    }
    if (value.trim().length < 3) {
      return "Name must be at least 3 characters";
    }
    if (value.trim().length > 50) {
      return "Name must not exceed 50 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return "Name can only contain letters and spaces";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (value.length > 50) {
      return "Password must not exceed 50 characters";
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return "Password must contain uppercase, lowercase, and a number";
    }
    return "";
  };

  const validateAdminSecretKey = (value) => {
    if (role === "admin" && !value.trim()) {
      return "Admin secret key is required";
    }
    return "";
  };

  const nameInput = (event) => {
    const value = event.target.value;
    setUsername(value);
    setErrors(prev => ({ ...prev, name: validateName(value) }));
    setErrorMsg("");
  }; 

  const emailInput = (event) => {
    const value = event.target.value;
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    setErrorMsg("");
  };

  const passwordInput = (event) => {
    const value = event.target.value;
    setPassword(value);
    setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    setErrorMsg("");
  };

  const roleInput = (event) => {
    const value = event.target.value;
    setRole(value);
    setErrorMsg("");
    if (value === "admin") {
      setErrors(prev => ({ ...prev, adminSecretKey: validateAdminSecretKey(adminSecretKey) }));
    } else {
      setErrors(prev => ({ ...prev, adminSecretKey: "" }));
    }
  };

  const adminSecretKeyInput = (event) => {
    const value = event.target.value;
    setAdminSecretKey(value);
    setErrors(prev => ({ ...prev, adminSecretKey: validateAdminSecretKey(value) }));
    setErrorMsg("");
  };


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
    
    // Validate all fields
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const adminSecretKeyError = validateAdminSecretKey(adminSecretKey);
    
    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      adminSecretKey: adminSecretKeyError
    });
    
    if (nameError || emailError || passwordError || adminSecretKeyError) {
      setShowErrorMsg(true);
      setErrorMsg("Please fix the errors above before submitting");
      return;
    }
    
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";
    const url = `${BACKEND_URL}/auth/register`;
    const userDetails = { 
      name: name.trim(), 
      email: email.trim().toLowerCase(), 
      password, 
      role,
      ...(role === "admin" && { adminSecretKey: adminSecretKey.trim() })
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        onSubmitSuccess();
      } else {
        // Handle backend validation errors
        if (data.errors && Array.isArray(data.errors)) {
          const fieldErrors = {};
          data.errors.forEach(err => {
            fieldErrors[err.field] = err.message;
          });
          setErrors(prev => ({ ...prev, ...fieldErrors }));
          setErrorMsg(data.message || "Validation failed");
        } else {
          setErrorMsg(data.message || "Registration failed");
        }
        setShowErrorMsg(true);
      }
    } catch (error) {
      setErrorMsg("Network error. Please try again.");
      setShowErrorMsg(true);
    }
  };


  const token = Cookies.get("jwt_token");
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative bg-[url('https://i.pinimg.com/736x/48/a9/74/48a9742a6ca340599dc847272c028874.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      
      <div className="absolute inset-0 bg-black/70"></div>

      <form
        onSubmit={signupForm}
        className="relative z-10 bg-black/80 backdrop-blur-md text-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-[420px] flex flex-col border border-red-600/20 transform transition-all duration-300 hover:shadow-2xl hover:border-red-600/40 hover:-translate-y-1"
      >
        
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Join QuickBite
          </h1>
        </div>

        
        <div className="flex flex-col mb-5">
          <label htmlFor="name" className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-300">
            Full Name
          </label>
          <input
            onChange={nameInput}
            value={name}
            type="text"
            id="name"
            placeholder="John Doe"
            className={`bg-gray-900/50 border-2 p-3 sm:p-4 rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 ${
              errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : "border-gray-700 focus:border-red-600 focus:ring-red-600/30"
            }`}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name}</p>
          )}
        </div>

       
        <div className="flex flex-col mb-5">
          <label htmlFor="email" className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-300">
            Email Address
          </label>
          <input
            value={email}
            onChange={emailInput}
            type="email"
            id="email"
            placeholder="you@example.com"
            className={`bg-gray-900/50 border-2 p-3 sm:p-4 rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 ${
              errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : "border-gray-700 focus:border-red-600 focus:ring-red-600/30"
            }`}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

       
        <div className="flex flex-col mb-5">
          <label htmlFor="password" className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-300">
            Password
          </label>
          <input
            value={password}
            onChange={passwordInput}
            type="password"
            id="password"
            placeholder="••••••••"
            className={`bg-gray-900/50 border-2 p-3 sm:p-4 rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 ${
              errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : "border-gray-700 focus:border-red-600 focus:ring-red-600/30"
            }`}
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
          )}
          {!errors.password && password && (
            <p className="text-gray-400 text-xs mt-1">Must contain uppercase, lowercase, and a number</p>
          )}
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="role" className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-300">
            Select Role
          </label>
          <select
            value={role}
            onChange={roleInput}
            id="role"
            className="bg-gray-900/50 border-2 border-gray-700 p-3 sm:p-4 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all text-white"
          >
            <option value="customer" className="bg-gray-800">Customer</option>
            <option value="admin" className="bg-gray-800">Admin</option>
          </select>
        </div>

        {role === "admin" && (
          <div className="flex flex-col mb-5 border-l-4 border-red-600 pl-4 py-2">
            <label htmlFor="adminSecretKey" className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-300">
              Admin Secret Key
            </label>
            <input
              value={adminSecretKey}
              onChange={adminSecretKeyInput}
              type="password"
              id="adminSecretKey"
              placeholder="••••••••"
              className={`bg-gray-900/50 border-2 p-3 sm:p-4 rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 ${
                errors.adminSecretKey ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : "border-gray-700 focus:border-red-600 focus:ring-red-600/30"
              }`}
            />
            {errors.adminSecretKey && (
              <p className="text-red-400 text-xs mt-1">{errors.adminSecretKey}</p>
            )}
          </div>
        )}

        {showErrorMsg && (
          <p className="text-red-400 text-center text-sm mb-4 bg-red-900/20 p-3 rounded-lg border border-red-600/30">
            {errorMsg}
          </p>
        )}

        
        <button
          type="submit"
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 cursor-pointer py-3 sm:py-4 rounded-lg font-semibold text-white text-sm sm:text-base shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
        >
          Create Account
        </button> 

        <p className="text-center text-sm sm:text-base mt-6 text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-400 hover:text-red-300 cursor-pointer font-semibold transition-colors"
          >
            Sign in
          </span>
        </p>

      </form>
    </div>
  );
};


export default Signup;

