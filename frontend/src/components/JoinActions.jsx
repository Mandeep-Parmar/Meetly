import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const JoinActions = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition"
    >
      <ArrowLeft size={18} />
      Back to Home
    </Link>
  );
};

export default JoinActions;
