import React from 'react';

const AdminFilters = ({
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    loading,
    totalItems
}) => {
    return (
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden mb-6">
            <div className="p-6 border-b border-white/10 bg-white/5 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search by name or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none cursor-pointer hover:border-white/20 transition-colors"
                    >
                        <option value="all" className="bg-gray-900 text-white">All Status</option>
                        <option value="active" className="bg-gray-900 text-white">Active Only</option>
                        <option value="inactive" className="bg-gray-900 text-white">Inactive Only</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none cursor-pointer hover:border-white/20 transition-colors"
                    >
                        <option value="nameAZ" className="bg-gray-900 text-white">Name (A-Z)</option>
                        <option value="nameZA" className="bg-gray-900 text-white">Name (Z-A)</option>
                    </select>
                </div>
            </div>

            {!loading && (
                <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold text-white">Inventory Items</h3>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        Total: {totalItems}
                    </span>
                </div>
            )}
        </div>
    );
};

export default AdminFilters;
