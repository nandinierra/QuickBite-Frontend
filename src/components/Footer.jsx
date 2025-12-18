import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black w-full text-gray-300 py-16 px-6 border-t border-red-600/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center sm:text-left mb-12">
          {/* Left - Brand Section */}
          <div className="group">
            <h2 className="text-3xl font-bold text-red-500 mb-4 group-hover:text-red-400 transition">QuickBite 🍴</h2>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm mx-auto sm:mx-0 group-hover:text-gray-300 transition">
              Delivering happiness one bite at a time!  
              Fresh, fast, and made with love ❤️
            </p>
          </div>

         
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="h-1 w-8 bg-red-600 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <p
                  onClick={() => navigate("/")}
                  className="hover:text-red-400 cursor-pointer transition duration-300 text-gray-400 hover:translate-x-1 transform"
                >
                  🏠 Home
                </p>
              </li>
              <li>
                <p
                  onClick={() => navigate("/aboutus")}
                  className="hover:text-red-400 cursor-pointer transition duration-300 text-gray-400 hover:translate-x-1 transform"
                >
                  ℹ️ About Us
                </p>
              </li>
              <li>
                <p
                  onClick={() => navigate("/contactus")}
                  className="hover:text-red-400 cursor-pointer transition duration-300 text-gray-400 hover:translate-x-1 transform"
                >
                  📞 Contact Us
                </p>
              </li>
            </ul>
          </div>


          <div className="flex flex-col items-center sm:items-end">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              Follow Us
              <span className="h-1 w-8 bg-red-600 rounded-full"></span>
            </h3>
            <div className="flex gap-5 justify-center sm:justify-end">
              <button
                onClick={()=>navigate("/")}
                className="w-12 h-12 cursor-pointer flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-lg" />
              </button>
              <button
               onClick={()=>navigate("/")}
                className="w-12 h-12 flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-lg" />
              </button>
              <button
                onClick={()=>navigate("/")}
                className="w-12 h-12 flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-lg" />
              </button>
              <button
                onClick={()=>navigate("/")}
                className="w-12 h-12 flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        
        <div className="border-t border-red-600/20 pt-8 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} <span className="text-red-600 font-bold">QuickBite</span>. All Rights Reserved.</p>
          <p className="text-xs text-gray-500 mt-2">Made with ❤️ for food lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
