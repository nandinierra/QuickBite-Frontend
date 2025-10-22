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
    <footer className="bg-black  w-full text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center sm:text-left">
        {/* Left - Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-3">QuickBite 🍴</h2>
          <p className="text-sm leading-relaxed text-gray-400 max-w-sm mx-auto sm:mx-0">
            Delivering happiness one bite at a time!  
            Fresh, fast, and made with love ❤️
          </p>
        </div>

       
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <p
                onClick={() => navigate("/")}
                className="hover:text-red-400 cursor-pointer transition"
              >
                Home
              </p>
            </li>
            <li>
              <p
                onClick={() => navigate("/aboutus")}
                className="hover:text-red-400 cursor-pointer transition"
              >
                About Us
              </p>
            </li>
            <li>
              <p
                onClick={() => navigate("/contactus")}
                className="hover:text-red-400 cursor-pointer transition"
              >
                Contact Us
              </p>
            </li>
          </ul>
        </div>


        <div className="flex flex-col items-center sm:items-end">
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 justify-center sm:justify-end">
            <p
              onClick={()=>navigate("/")}
              className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </p>
            <p
             onClick={()=>navigate("/")}
              className="w-9 h-9 flex cursor-pointer items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </p>
            <p
              onClick={()=>navigate("/")}
              className="w-9 h-9 flex cursor-pointer items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </p>
            <p
              onClick={()=>navigate("/")}
              className="w-9 h-9 flex cursor-pointer items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </p>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} QuickBite. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
