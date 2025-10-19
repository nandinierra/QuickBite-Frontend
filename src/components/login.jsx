import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const onSubmitSuccess = (token) => {
    Cookies.set("jwt_token", token, { expires: 30 });
    navigate("/", { replace: true });
  };

  const onSubmitFailure = (e) => {
    setShowErrorMsg(true);
    setErrorMsg(e);
  };

  const submitLoginForm = async (event) => {
    event.preventDefault();
    const url = "https://quickbite-backendd.onrender.com/auth/login";
    const userDetails = { email, password };
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
    <div className="relative font-Inter bg-[url('https://i.pinimg.com/1200x/27/19/61/271961e178db1f2696ced7d0af38b4e3.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center md:justify-end text-white px-4 sm:px-6 lg:px-8">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <form
        onSubmit={submitLoginForm}
        className="relative z-10 md:mr-26 bg-black/70 rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-[400px] flex flex-col text-white"
      >
        {/* Title */}
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center">Login</h1>
        </div>

       
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2 text-sm sm:text-base">
            EMAIL
          </label>
          <input
            value={email}
            onChange={(event) => setMail(event.target.value)}
            id="email"
            type="email"
            placeholder="Enter your email"
            className="bg-[#333333] p-2 sm:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="password" className="mb-2 text-sm sm:text-base">
            PASSWORD
          </label>
          <input
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            id="password"
            placeholder="Enter your password"
            className="bg-[#333333] p-2 sm:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {errorMsg && (
          <p className="text-red-500 text-center text-sm mb-3">{errorMsg}</p>
        )}
        {showErrorMsg && (
          <p className="text-red-500 text-center text-sm mb-3">{errorMsg}</p>
        )}


        <button
          type="submit"
          className="bg-gradient-to-r cursor-pointer from-red-700 to-orange-600 py-2 sm:py-3 rounded-lg font-semibold text-white text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
