import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LandingActions = () => {
  const { token, handleLogout } = useContext(AuthContext);

  return (
    <div className="flex flex-col md:flex-row gap-5">
      {!token ? (
        <>
          <Link
            to="/join"
            className="px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition"
          >
            Join as Guest
          </Link>

          <Link
            to="/auth"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
          >
            Login
          </Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 px-5 py-2 rounded-full text-white border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/50 transition text-sm font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      )}
    </div>
  );
};

export default LandingActions;
