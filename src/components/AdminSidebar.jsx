
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPizzaSlice,
    faHamburger,
    faGlassMartiniAlt,
    faIceCream,
    faLeaf,
    faUtensils,
    faSignOutAlt,
    faThLarge
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/context";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ activeCategory, onSelectCategory }) => {
    const { logout } = useCart();
    const navigate = useNavigate();

    const categories = [
        { id: "all", label: "All Items", icon: faThLarge },
        { id: "Pizza", label: "Pizza", icon: faPizzaSlice },
        { id: "Burger", label: "Burger", icon: faHamburger },
        { id: "Beverages", label: "Beverages", icon: faGlassMartiniAlt },
        { id: "Desserts", label: "Desserts", icon: faIceCream },
        { id: "Salads", label: "Salads", icon: faLeaf },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="w-64 glass-panel h-screen fixed left-0 top-0 text-white flex flex-col shadow-2xl z-50 border-r border-white/10">
            {/* Logo Area */}
            <div className="p-6 border-b border-white/10 flex items-center gap-3 bg-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center shadow-lg">
                    <FontAwesomeIcon icon={faUtensils} className="text-white text-lg" />
                </div>
                <div>
                    <h2 className="text-xl font-bold tracking-wide font-outfit">QuickBite</h2>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Admin Panel</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
                <p className="px-4 text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wider">Menu Management</p>

                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
              ${activeCategory === category.id
                                ? "bg-gradient-to-r from-primary to-red-700 text-white shadow-lg shadow-primary/20"
                                : "text-gray-400 hover:bg-white/10 hover:text-white"
                            }`}
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
              ${activeCategory === category.id
                                ? "bg-white/20 text-white"
                                : "bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-white"
                            }`}>
                            <FontAwesomeIcon icon={category.icon} />
                        </div>
                        <span className="font-medium text-sm">{category.label}</span>
                        {activeCategory === category.id && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                        )}
                    </button>
                ))}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-white/10 bg-white/5">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 border border-transparent hover:border-red-500/20"
                >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span className="font-semibold text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
