import React from "react";
import MeetingNavbar from "../components/MeetingNavbar";

const MeetingRoom = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col">
      {/* Top Navbar */}
      <MeetingNavbar />

      {/* Main Meeting Area */}
      <div className="flex-1 p-5">
        {/* Video Grid will come here */}
      </div>

      {/* Bottom Controls will come here */}
    </div>
  );
};

export default MeetingRoom;
