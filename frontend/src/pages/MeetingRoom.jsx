import React from "react";
import MeetingNavbar from "../components/MeetingNavbar";
import BottomControls from "../components/BottomControls";
import { MicOff } from "lucide-react";
import ChatPanel from "../components/ChatPanel";

const MeetingRoom = ({
  localVideoRef,
  videos,
  usersData,
  username,
  video,
  audio,
  screen,
  toggleScreenShare,
  handleVideo,
  handleAudio,
  leaveMeeting,
  showChat,
  setShowChat,
  message,
  setMessage,
  messages,
  sendMessage,
  unreadCount,
  toggleChat,
}) => {
  // Total participants (You + Remote Users)
  const totalParticipants = videos.length + 1;

  // Mobile: scroll after 3 users
  // Desktop: scroll after 5 users
  const shouldScrollMobile = totalParticipants > 3;
  const shouldScrollDesktop = totalParticipants > 5;

  return (
    <div className="h-screen bg-[#0B0B0F] text-white flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <MeetingNavbar />

      {/* Main Meeting Area */}
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex-1 transition-all duration-300 
            ${showChat ? "md:w-[calc(100%-380px)]" : "w-full"} 
            p-5 pb-28 md:pb-32
            ${shouldScrollMobile ? "overflow-y-auto" : "overflow-hidden"} 
            md:${shouldScrollDesktop ? "overflow-y-auto" : "overflow-hidden"}
          `}
        >
          {/* ===================== VIDEO GRID ===================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {/* ================= Local User ================= */}
            {/*  aspect-video -> Maintains a 16:9 video ratio automatically. */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-purple-500 bg-[#151520]">
              {/* Keep the video element mounted */}
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className={`w-full h-full object-cover ${
                  video ? "block" : "hidden"
                }`}
              />

              {/* Show avatar only when camera is off */}
              {!video && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#151520]">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-semibold">
                    {username.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}

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
                  className={`w-full h-full object-cover ${
                    usersData[video.socketId]?.video ? "block" : "hidden"
                  }`}
                />

                {!usersData[video.socketId]?.video && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#151520]">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-semibold">
                      {usersData[video.socketId]?.username
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                  </div>
                )}

                {/* Username */}
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 text-sm font-medium">
                  {usersData[video.socketId]?.username}
                </div>

                {/* Mic Status */}
                {!usersData[video.socketId]?.audio && (
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 flex items-center justify-center">
                    <MicOff size={16} className="text-red-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/*---------------- Chat panel ---------- */}
        {showChat && (
          <ChatPanel
            setShowChat={setShowChat}
            message={message}
            setMessage={setMessage}
            messages={messages}
            sendMessage={sendMessage}
            username={username}
          />
        )}
      </div>

      <div className={showChat ? "hidden md:block" : ""}>
        <BottomControls
          video={video}
          audio={audio}
          screen={screen}
          handleVideo={handleVideo}
          handleAudio={handleAudio}
          leaveMeeting={leaveMeeting}
          toggleScreenShare={toggleScreenShare}
          unreadCount={unreadCount}
          toggleChat={toggleChat}
        />
      </div>
    </div>
  );
};

export default MeetingRoom;
