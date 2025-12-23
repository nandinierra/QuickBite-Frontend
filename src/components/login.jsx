import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useCart } from "../context/context";

const Login = () => {
  const navigate = useNavigate();
  const { updateTokenState, setIsLoading, user, updateUser } = useCart();
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingText, setLoadingText] = useState("Sign In");

  // Field-level validation errors
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  // Redirect if already logged in
  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token && user) {
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, navigate]);

  const onSubmitSuccess = (token, user) => {
    console.log("Login Success - User:", user);
    console.log("Login Success - Role:", user?.role);
    Cookies.set("jwt_token", token, { expires: 30 });

    // IMMEDIATELY update global state so ProtectedRoute sees the user
    updateUser(user);
    updateTokenState();

    if (user?.role === "admin") {
      console.log("Redirecting to /admin");
      navigate("/admin", { replace: true });
    } else {
      console.log("Redirecting to / (Home)");
      navigate("/", { replace: true });
      setIsLoading(true)
    }
  };


  // Validation functions
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
    return "";
  };

  const handleEmailChange = (event) => {
    const value = event.target.value.toLowerCase();
    setMail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    setErrorMsg("");
    setShowErrorMsg(false);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    setErrorMsg("");
    setShowErrorMsg(false);
  };

  const onSubmitFailure = (e) => {
    setShowErrorMsg(true);
    setErrorMsg(e);
  };


  const submitLoginForm = async (event) => {
    event.preventDefault();

    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError
    });

    if (emailError || passwordError) {
      setShowErrorMsg(true);
      setErrorMsg("Please fix the errors above before submitting");
      return;
    }

    setIsSubmitting(true);
    setLoadingText("Signing In...");

    // Timer to change text if it takes too long (Render free tier cold start)
    const timeoutId = setTimeout(() => {
      setLoadingText("Waking up server...");
    }, 3000);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";
    const url = `${BACKEND_URL}/auth/login`;
    const userDetails = {
      email: email.trim().toLowerCase(),
      password
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      clearTimeout(timeoutId); // Clear timer on response
      const data = await response.json();

      if (response.ok) {
        onSubmitSuccess(data.token, data.user);
      } else {
        setIsSubmitting(false);
        setLoadingText("Sign In");
        // Handle backend validation errors
        if (data.errors && Array.isArray(data.errors)) {
          const fieldErrors = {};
          data.errors.forEach(err => {
            fieldErrors[err.field] = err.message;
          });
          setErrors(prev => ({ ...prev, ...fieldErrors }));
          setErrorMsg(data.message || "Validation failed");
        } else {
          setErrorMsg(data.message || "Login failed");
        }
        setShowErrorMsg(true);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
      setLoadingText("Sign In");
      console.error("Login Error:", error);

      let msg = "Network error. Please try again.";
      if (error.message === "Failed to fetch" || error.name === "TypeError") {
        msg = "Unable to connect to server. It might be waking up, please wait a moment and try again.";
      }

      setErrorMsg(msg);
      setShowErrorMsg(true);
    }
  };

  return (
    <div className="relative font-Inter bg-[url('https://i.pinimg.com/1200x/27/19/61/271961e178db1f2696ced7d0af38b4e3.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center md:justify-end text-white px-4 sm:px-6 lg:px-12">
      <div className="absolute inset-0 bg-black/70"></div>

      <form
        onSubmit={submitLoginForm}
        className="relative z-10 md:mr-16 lg:mr-32 glass-panel rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-[420px] flex flex-col text-white border border-white/10 transform transition-all duration-300 hover:shadow-primary/20 hover:border-primary/40 hover:-translate-y-1"
      >
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Welcome Back
          </h1>
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="email" className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-300">
            Email Address
          </label>
          <input
            value={email}
            onChange={handleEmailChange}
            id="email"
            type="email"
            placeholder="you@example.com"
            disabled={isSubmitting}
            className={`bg-black/40 border p-3 sm:p-4 rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-primary focus:ring-primary/30"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col mb-8">
          <label htmlFor="password" className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-300">
            Password
          </label>
          <input
            value={password}
            type="password"
            onChange={handlePasswordChange}
            id="password"
            placeholder="••••••••"
            disabled={isSubmitting}
            className={`bg-black/40 border p-3 sm:p-4 rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-primary focus:ring-primary/30"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {showErrorMsg && (
          <p className="text-red-400 text-center text-sm mb-4 bg-red-900/20 p-3 rounded-lg border border-red-600/30">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-primary hover:bg-red-700 cursor-pointer py-3 sm:py-4 rounded-lg font-semibold text-white text-sm sm:text-base shadow-lg transition-all duration-300 hover:shadow-primary/50 hover:scale-105 transform border border-white/10 ${isSubmitting ? "opacity-75 cursor-wait" : ""}`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              {loadingText}
            </div>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="text-center text-sm sm:text-base mt-6 text-gray-400">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => !isSubmitting && navigate("/signup")}
            disabled={isSubmitting}
            className={`text-red-400 hover:text-red-300 cursor-pointer font-semibold transition-colors bg-transparent border-none p-0 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
