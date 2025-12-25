
const AdminFoodGrid = ({
    items,
    loading,
    onEdit,
    onDelete,
    onDeactivate,
    onReactivate,
    searchTerm
}) => {

    if (loading) {
        return <div className="p-12 text-center text-gray-500">Loading items...</div>;
    }

    if (items.length === 0) {
        return (
            <div className="p-12 text-center glass-panel rounded-2xl border border-white/10">
                <p className="text-gray-500 text-lg">No food items found matching your criteria.</p>
                {searchTerm && <p className="text-gray-400 mt-2 text-sm">Try clearing your search filters</p>}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <div key={item._id} className={`group bg-white/5 rounded-xl shadow-lg hover:shadow-2xl border transition-all duration-300 overflow-hidden flex flex-col ${!item.isActive ? "border-red-500/30 bg-red-900/10" : "border-white/10 hover:border-primary/50"}`}>
                    <div className="relative h-48 overflow-hidden bg-gray-900">
                        {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 text-sm">No Image Available</div>
                        )}

                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {!item.isActive && (
                                <span className="bg-red-600/90 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg">Inactive</span>
                            )}
                            {item.popular && (
                                <span className="bg-yellow-500/90 backdrop-blur text-black text-xs font-bold px-2.5 py-1 rounded-md shadow-lg">Popular</span>
                            )}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="bg-white hover:bg-gray-200 text-black p-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(item._id)}
                                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-white text-lg leading-tight group-hover:text-primary transition-colors">{item.name}</h4>
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-1">{item.category} • {item.type}</p>
                            </div>
                            {item.rating && (
                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                                    <span className="text-yellow-500 text-xs">⭐</span>
                                    <span className="text-xs font-bold text-yellow-700">{item.rating}</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-white text-lg">₹{item.price?.regular}</span>
                                <button
                                    onClick={() => item.isActive ? onDeactivate(item._id) : onReactivate(item._id)}
                                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors ${item.isActive ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
                                >
                                    {item.isActive ? "Deactivate" : "Activate"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminFoodGrid;
