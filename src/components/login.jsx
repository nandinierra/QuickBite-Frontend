import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useCart } from "../context/context";

const Login = () => {
  const navigate = useNavigate();
  const { updateTokenState } = useCart();
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const onSubmitSuccess = (token) => {
    Cookies.set("jwt_token", token, { expires: 30 });
    updateTokenState();
    navigate("/", { replace: true });
  };


  const onSubmitFailure = (e) => {
    setShowErrorMsg(true);
    setErrorMsg(e);
  };


  const submitLoginForm = async (event) => {
    event.preventDefault();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://quickbite-backendd.onrender.com";
    const url = `${BACKEND_URL}/auth/login`;
    const userDetails = { 
      email, 
      password
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      onSubmitSuccess(data.token);
    } else {
      onSubmitFailure(data.message);
    }

  };



  const token = Cookies.get("jwt_token");
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative font-Inter bg-[url('https://i.pinimg.com/1200x/27/19/61/271961e178db1f2696ced7d0af38b4e3.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center md:justify-end text-white px-4 sm:px-6 lg:px-12">
      <div className="absolute inset-0 bg-black/70"></div>

      <form
        onSubmit={submitLoginForm}
        className="relative z-10 md:mr-16 lg:mr-32 bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-[420px] flex flex-col text-white border border-red-600/20 transform transition-all duration-300 hover:shadow-2xl hover:border-red-600/40 hover:-translate-y-1"
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
            onChange={(event) => setMail(event.target.value)}
            id="email"
            type="email"
            placeholder="you@example.com"
            className="bg-gray-900/50 border-2 border-gray-700 p-3 sm:p-4 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all text-white placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col mb-8">
          <label htmlFor="password" className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-300">
            Password
          </label>
          <input
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            id="password"
            placeholder="••••••••"
            className="bg-gray-900/50 border-2 border-gray-700 p-3 sm:p-4 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all text-white placeholder-gray-500"
          />
        </div>

        {showErrorMsg && (
          <p className="text-red-400 text-center text-sm mb-4 bg-red-900/20 p-3 rounded-lg border border-red-600/30">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 cursor-pointer py-3 sm:py-4 rounded-lg font-semibold text-white text-sm sm:text-base shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
        >
          Sign In
        </button>

        <p className="text-center text-sm sm:text-base mt-6 text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-red-400 hover:text-red-300 cursor-pointer font-semibold transition-colors"
          >
            Create one
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
