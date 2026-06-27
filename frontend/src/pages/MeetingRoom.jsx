import React from "react";
import MeetingNavbar from "../components/MeetingNavbar";
import BottomControls from "../components/BottomControls";
import { MicOff } from "lucide-react";

const MeetingRoom = ({
  localVideoRef,
  videos,
  video,
  audio,
  screen,
  handleVideo,
  handleAudio,
}) => {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col">
      {/* Top Navbar */}
      <MeetingNavbar />

      {/* Main Meeting Area */}
      <div className="flex-1 p-5 overflow-y-auto">
        {/* ===================== VIDEO GRID ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {/* ================= Local User ================= */}
          {/*  aspect-video -> Maintains a 16:9 video ratio automatically. */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-purple-500 bg-[#151520]">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {!audio && (
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 flex items-center justify-center">
                <MicOff size={16} className="text-red-400" />
              </div>
            )}

            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 text-sm font-medium">
              You
            </div>
          </div>

          {/* ================= Remote Users ================= */}
          {videos.map((video) => (
            <div
              key={video.socketId}
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#151520]"
            >
              <video
                autoPlay
                playsInline
                ref={(ref) => {
                  if (ref && video.stream) {
                    ref.srcObject = video.stream;
                  }
                }}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 text-sm">
                {video.username || "Participant"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomControls
        video={video}
        audio={audio}
        screen={screen}
        handleVideo={handleVideo}
        handleAudio={handleAudio}
      />
    </div>
  );
};

export default MeetingRoom;
