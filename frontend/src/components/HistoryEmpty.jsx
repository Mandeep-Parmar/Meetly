import { History } from "lucide-react";
import { Link } from "react-router-dom";

const HistoryEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-24 text-center">
      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
        <History size={35} className="text-purple-400" />
      </div>

      <h2 className="mt-8 text-3xl font-bold">No Meetings Yet</h2>

      <p className="mt-4 max-w-md text-gray-400 leading-7">
        Once you create your first meeting, it will appear here for quick
        access.
      </p>

      <Link
        to="/dashboard"
        className="mt-8 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 font-medium"
      >
        Create Meeting
      </Link>
    </div>
  );
};

export default HistoryEmpty;
