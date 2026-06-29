import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LandingActions = () => {
  const { token } = useContext(AuthContext);

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
        <Link
          to="/dashboard"
          className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition font-medium"
        >
          Go to Dashboard
        </Link>
      )}
    </div>
  );
};

export default LandingActions;
