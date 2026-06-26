import React from "react";
import { Copy } from "lucide-react";

const MeetingNavbar = () => {
  return (
    <header className="h-18 border-b border-white/10 bg-[#0B0B0F]">
      <div className="mx-auto px-6 h-full flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <img src="/meetly-logo.png" alt="Meetly Logo" className="w-28" />
        </div>

        {/* Center */}
        <div className="hidden md:block">
          <span className="text-lg font-medium tracking-wider text-gray-300">
            00:00
          </span>
        </div>

        {/* Right */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
          <span className="text-sm text-gray-300">mtly-xk9m2</span>

          <Copy size={16} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
};

export default MeetingNavbar;
