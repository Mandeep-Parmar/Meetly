import React from "react";
import { Video, VideoOff, Mic, MicOff, Circle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Lobby = ({
  localVideoRef,
  username,
  setUsername,
  connect,
  videoAvailable,
  audioAvailable,
  video,
  audio,
  handleVideo,
  handleAudio,
}) => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="h-16 border-b border-white/10 flex items-center px-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <div className="bg-[#09090B] text-white flex justify-center py-10 px-6 md:py-14">
        <div className="w-full max-w-2xl">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Ready to{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                join?
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-400 max-w-lg leading-8">
              Check your camera, microphone and device settings before entering
              the meeting.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-2">
            <label className="text-xs ml-2 tracking-widest uppercase text-gray-500">
              Your Name
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="w-full h-13 px-5 rounded-xl bg-[#151520] border border-white/10 outline-none focus:border-purple-500 placeholder:text-gray-500"
            />
          </div>

          <button
            onClick={connect}
            className="w-full h-13 mt-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <Video size={18} />
            Join Meeting
          </button>

          {/* CARD */}
          <div className="mt-8 rounded-3xl border border-white/10 bg-[#12121A] px-5 shadow-xl shadow-purple-900/10">
            {/* Camera Preview */}
            {/*  aspect-video -> Maintains a 16:9 video ratio automatically. */}
            <div className="mt-8 aspect-video max-h-[420px] rounded-2xl border border-white/10 bg-[#12121A] overflow-hidden relative">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />

              {!videoAvailable && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#12121A]">
                  <VideoOff size={36} className="text-gray-500" />
                  <p className="mt-4 text-gray-500">Camera access blocked</p>
                </div>
              )}

              <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-sm backdrop-blur">
                {username || "You"}
              </div>
            </div>

            {/* Controls */}

            <div className="flex flex-col gap-5  px-6 py-5 md:flex-row md:items-center md:justify-between">
              {/* Left Controls */}
              <div className="flex gap-3">
                {/* Camera Button */}
                <button
                  onClick={handleVideo}
                  className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#151520] hover:border-purple-500 transition"
                >
                  {video ? <Video size={22} /> : <VideoOff size={22} />}
                </button>

                {/* Mic Button */}
                <button
                  onClick={handleAudio}
                  className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#151520] hover:border-purple-500 transition"
                >
                  {audio ? <Mic size={22} /> : <MicOff size={22} />}
                </button>
              </div>

              {/* Right Status */}
              <div className="flex flex-col items-start md:items-end gap-3">
                {/* Pills */}
                <div className="flex gap-2">
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      video
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {video ? "Video On" : "Video Off"}
                  </span>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      audio
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {audio ? "Audio On" : "Audio Off"}
                  </span>
                </div>

                {/* Availability */}
                <div className="space-y-1 text-sm">
                  <div
                    className={`flex items-center gap-2 ${
                      videoAvailable ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    <Circle size={8} fill="currentColor" />
                    {videoAvailable ? "Camera Ready" : "Camera Blocked"}
                  </div>

                  <div
                    className={`flex items-center gap-2 ${
                      audioAvailable ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    <Circle size={8} fill="currentColor" />
                    {audioAvailable ? "Microphone Ready" : "Microphone Blocked"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Your video and audio are never recorded before you join.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Lobby;
