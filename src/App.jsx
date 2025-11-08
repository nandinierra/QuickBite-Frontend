

import {Routes, Route} from "react-router-dom"
import Signup from "./components/signup"
import Login from "./components/login"
import Home from "./components/Home"
import Navbar from "./components/Navbar.jsx"
import Fooddetails from "./components/Fooddetails.jsx"
import {useLocation} from "react-router-dom"
import Footer from "./components/Footer.jsx"
import ViewDetails from "./components/ViewDetails.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Cart from "./components/Cart.jsx"
import Aboutus from "./components/Aboutus.jsx"
import ContactUs from "./components/Contactus.jsx"
import PageNotFound from "./components/Pagenotfound.jsx"
import { CartProvider } from "./context/context.jsx";

const App = () => { 
  const location=useLocation(); 
  const requiredPath=location.pathname
  const hiddenpath=requiredPath==="/signup" || requiredPath==="/login";


  return (
    <CartProvider>
    <div className="flex flex-col justify-between min-h-screen">
      {!hiddenpath&&<Navbar/>}
      <Routes>
            <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
             <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login  />} /> 
               <Route path="/food/:category" element={<ProtectedRoute><Fooddetails/></ProtectedRoute>}/>
                <Route path="/food/:category/:id" element={<ProtectedRoute><ViewDetails/></ProtectedRoute>}/>
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>}/>
                <Route path="/aboutus" element={<ProtectedRoute><Aboutus /></ProtectedRoute>}/>
                <Route path="/contactus" element={<ProtectedRoute><ContactUs /></ProtectedRoute>}/>
                <Route path="*" element={<PageNotFound />}/>
      </Routes>
       {!hiddenpath&&<Footer/>}
    </div>
    </CartProvider>
  )
}

export default App


