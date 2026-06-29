import React, { useContext } from "react";
import { LogOut } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const DashboardActions = () => {
  const { handleLogout, user } = useContext(AuthContext);

  return (
    <div className="flex items-center gap-4">
      {/* User Info */}
      <div className="hidden sm:flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-semibold text-white">
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        {/* Username */}
        <span className="font-medium">{user?.username}</span>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 px-5 py-2 rounded-full text-white border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/50 transition text-sm font-medium"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default DashboardActions;
