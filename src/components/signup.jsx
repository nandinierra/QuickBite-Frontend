

import { Navigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const {
    name, handleNameChange,
    email, handleEmailChange,
    password, handlePasswordChange,
    role, handleRoleChange,
    adminSecretKey, handleAdminSecretKeyChange,
    errors, errorMsg, showErrorMsg,
    signupForm,
    navigate,
    token
  } = useSignup();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative bg-[url('https://i.pinimg.com/736x/48/a9/74/48a9742a6ca340599dc847272c028874.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70"></div>

      <form onSubmit={signupForm} className="relative z-10 glass-panel text-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-[480px] border border-white/10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white font-playfair mb-1">
            Join <span className="text-primary">QuickBite</span>
          </h1>
          <p className="text-gray-400 text-sm">Create your account in seconds</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
            <input
              onChange={handleNameChange} value={name} type="text" id="name" placeholder="John Doe"
              className={`w-full bg-black/40 border px-4 py-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 text-sm h-[48px] ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-primary focus:ring-primary/20"}`}
            />
            {errors.name && <p className="text-red-400 text-[10px] mt-1 font-medium">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
            <input
              value={email} onChange={handleEmailChange} type="email" id="email" placeholder="you@example.com"
              className={`w-full bg-black/40 border px-4 py-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 text-sm h-[48px] ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-primary focus:ring-primary/20"}`}
            />
            {errors.email && <p className="text-red-400 text-[10px] mt-1 font-medium">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
            <input
              value={password} onChange={handlePasswordChange} type="password" id="password" placeholder="••••••••"
              className={`w-full bg-black/40 border px-4 py-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 text-sm h-[48px] ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-primary focus:ring-primary/20"}`}
            />
            {errors.password ? (<p className="text-red-400 text-[10px] mt-1 font-medium">{errors.password}</p>) : password ? (<p className="text-gray-500 text-[10px] mt-1">Abc123</p>) : null}
          </div>

          {/* Role Selection */}
          <div className="flex flex-col">
            <label htmlFor="role" className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Role</label>
            <select
              value={role} onChange={handleRoleChange} id="role"
              className="w-full bg-black/40 border border-white/10 px-4 rounded-xl shadow-inner focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-300 text-sm h-[48px] appearance-none"
            >
              <option value="customer" className="bg-gray-900 text-white">Customer</option>
              <option value="admin" className="bg-gray-900 text-white">Admin</option>
            </select>
          </div>
        </div>

        {role === "admin" && (
          <div className="flex flex-col mb-6 bg-red-900/10 p-4 rounded-xl border border-red-500/20">
            <label htmlFor="adminSecretKey" className="mb-2 text-xs font-bold uppercase tracking-wider text-red-300">Admin Secret Key</label>
            <input
              value={adminSecretKey} onChange={handleAdminSecretKeyChange} type="password" id="adminSecretKey" placeholder="Enter secret key..."
              className={`w-full bg-black/40 border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 text-sm h-[48px] ${errors.adminSecretKey ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-primary focus:ring-primary/20"}`}
            />
            {errors.adminSecretKey && <p className="text-red-400 text-[10px] mt-1 font-medium">{errors.adminSecretKey}</p>}
          </div>
        )}

        {showErrorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-5 text-center">
            <p className="text-red-200 text-sm font-medium">{errorMsg}</p>
          </div>
        )}

        <button type="submit" className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-primary hover:to-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 text-base">
          Create Account
        </button>

        <p className="text-center text-sm mt-6 text-gray-400 font-medium">
          Already a member? <span onClick={() => navigate("/login")} className="text-primary hover:text-orange-400 cursor-pointer font-bold transition-colors ml-1">Sign in</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
