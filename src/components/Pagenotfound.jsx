import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-red-50 to-yellow-100 px-6 text-center">
      
      {/* Animated 404 */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-[100px] sm:text-[150px] font-extrabold text-red-500 drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Funny Message */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2"
      >
        Oops! The page is missing... maybe it got eaten 🍕
      </motion.p>

      {/* Small Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="text-gray-600 mt-3 text-sm sm:text-base"
      >
        Don’t worry, our chef will cook it back soon.
      </motion.p>

      {/* Cute image or emoji */}
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        src="https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
        alt="Pizza Slice"
        className="w-36 sm:w-44 mt-8 mb-6 drop-shadow-md"
      />

      {/* Back Home Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <FontAwesomeIcon icon={faHome} />
        Go Back Home
      </motion.button>
    </div>
  );
};

export default PageNotFound;
