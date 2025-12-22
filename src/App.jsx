

import { Routes, Route } from "react-router-dom"
import Signup from "./components/signup"
import Login from "./components/login"
import Home from "./components/Home"
import Navbar from "./components/Navbar.jsx"
import Fooddetails from "./components/Fooddetails.jsx"
import { useLocation } from "react-router-dom"
import Footer from "./components/Footer.jsx"
import ViewDetails from "./components/ViewDetails.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Cart from "./components/Cart.jsx"
import Aboutus from "./components/Aboutus.jsx"
import ContactUs from "./components/Contactus.jsx"
import PageNotFound from "./components/Pagenotfound.jsx"
import AdminDashboard from "./components/AdminDashboard.jsx"
import UserProfile from "./components/UserProfile.jsx"
import Payment from "./components/Payment.jsx"
import { CartProvider } from "./context/context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  const location = useLocation();
  const requiredPath = location.pathname
  const hiddenpath = requiredPath === "/signup" || requiredPath === "/login" || requiredPath === "/admin" || requiredPath === "/payment";


  return (
    <CartProvider>
      <div className="flex flex-col justify-between min-h-screen">
        {!hiddenpath && <Navbar />}
        <div className={hiddenpath ? "" : requiredPath === "/" ? "" : "pt-16 sm:pt-20"}>
          <Routes>
            <Route path="/" element={<ProtectedRoute userOnly={true}><Home /></ProtectedRoute>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/food/:category" element={<ProtectedRoute userOnly={true}><Fooddetails /></ProtectedRoute>} />
            <Route path="/food/:category/:id" element={<ProtectedRoute userOnly={true}><ViewDetails /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute userOnly={true}><Cart /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute userOnly={true}><UserProfile /></ProtectedRoute>} />
            <Route path="/aboutus" element={<ProtectedRoute userOnly={true}><Aboutus /></ProtectedRoute>} />
            <Route path="/contactus" element={<ProtectedRoute userOnly={true}><ContactUs /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute userOnly={true}><Payment /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        {!hiddenpath && <Footer />}
      </div>
      <ToastContainer />
    </CartProvider>
  )
}

export default App


