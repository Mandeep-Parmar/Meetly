import React from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MessageCircle,
  Users,
  PhoneOff,
} from "lucide-react";

const BottomControls = ({
  video,
  audio,
  screen,
  handleVideo,
  handleAudio,
  leaveMeeting,
  toggleScreenShare,
  showChat,
  setShowChat,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 sm:gap-3 rounded-2xl border border-white/10 bg-[#151520]/95 backdrop-blur-md px-4 py-3 shadow-2xl">
        {/* Mic */}
        <button
          onClick={handleAudio}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-white/10 transition flex items-center justify-center">
            {audio ? <Mic size={18} /> : <MicOff size={18} />}
          </div>
          <span className="text-xs text-gray-400">
            {audio ? "Mute" : "Unmute"}
          </span>
        </button>

        {/* Video */}
        <button
          onClick={handleVideo}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-white/10 transition flex items-center justify-center">
            {video ? <Video size={18} /> : <VideoOff size={18} />}
          </div>
          <span className="text-xs text-gray-400">
            {video ? "Video" : "Video Off"}
          </span>
        </button>

        {/* Divider */}
        <div className="mx-1 w-px h-8 sm:h-10 bg-white/10" />

        {/* Screen Share */}
        <button
          onClick={toggleScreenShare}
          className="flex flex-col items-center gap-1"
        >
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full transition flex items-center justify-center ${
              screen
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <MonitorUp size={18} />
          </div>

          <span
            className={`text-xs ${screen ? "text-blue-400" : "text-gray-400"}`}
          >
            {screen ? "Sharing" : "Share"}
          </span>
        </button>

        {/* Chat */}
        <button
          onClick={() => setShowChat(!showChat)}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-white/10 transition flex items-center justify-center">
            <MessageCircle size={18} />
          </div>
          <span className="text-xs text-gray-400">Chat</span>
        </button>

        {/* Participants */}
        <button className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-white/10 transition flex items-center justify-center">
            <Users size={18} />
          </div>
          <span className="text-xs text-gray-400">People</span>
        </button>

        {/* Divider */}
        <div className="mx-1 w-px h-8 sm:h-10 bg-white/10" />

        {/* Leave */}
        <button
          onClick={leaveMeeting}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500 hover:bg-red-600 transition flex items-center justify-center">
            <PhoneOff size={18} />
          </div>
          <span className="text-xs text-red-400">Leave</span>
        </button>
      </div>
    </div>
  );
};

export default BottomControls;
