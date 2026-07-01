import React, { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "react-toastify";
import logo from "../assets/meetly-logo.png";

const MeetingNavbar = ({ roomId }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const meetingLink = `${window.location.origin}/meeting/${roomId}`;

    await navigator.clipboard.writeText(meetingLink);

    setCopied(true);

    toast.success("Meeting link copied");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return hrs === "00" ? `${mins}:${secs}` : `${hrs}${mins}:${secs}`;
  };

  return (
    <header className="py-5 border-b border-white/10 bg-[#0B0B0F]">
      <div className="mx-auto px-6 h-full flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Meetly Logo" className="w-28" />
        </div>

        {/* Center */}

        <span className="text-md font-medium tracking-wider text-gray-300">
          {formatTime(elapsedTime)}
        </span>

        {/* Right */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#151520] px-3 py-2 hover:border-purple-500 transition"
        >
          <span>{roomId}</span>

          {copied ? (
            <Check size={18} className="text-green-400" />
          ) : (
            <Copy size={18} />
          )}
        </button>
      </div>
    </header>
  );
};

export default MeetingNavbar;
