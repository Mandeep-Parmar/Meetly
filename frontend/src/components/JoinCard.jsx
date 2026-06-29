import React from "react";
import { Video, User, Link2, ArrowRight, Plus } from "lucide-react";

const JoinCard = ({
  username,
  setUsername,
  meetingId,
  setMeetingId,
  handleJoinMeeting,
  handleCreateMeeting,
}) => {
  return (
    <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#171721]/95 backdrop-blur-xl shadow-[0_0_80px_rgba(124,58,237,0.12)] overflow-hidden">
      {/* ================= Card Body ================= */}

      <div className="p-8 md:p-10">
        {/* Meeting Icon */}

        <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
          <Video className="text-purple-400" size={20} />
        </div>

        {/* Heading */}

        <h1 className="text-3xl md:text-4xl font-bold">
          Join a <span className="text-purple-400">Meeting</span>
        </h1>

        <p className="mt-3 text-gray-400 text-sm leading-8">
          Enter a meeting code or paste a meeting link to join instantly.
        </p>

        {/* ================= Display Name ================= */}

        <div className="mt-6">
          <label
            htmlFor="username"
            className="block mb-1 ml-2 text-xs tracking-widest uppercase text-gray-500 font-semibold"
          >
            Display Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              value={username}
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="w-full h-12 rounded-2xl bg-[#1D1D28] border border-white/10 pl-14 pr-5 outline-none text-base focus:border-purple-500 transition"
            />
          </div>
        </div>

        {/* ================= Meeting ID ================= */}

        <div className="mt-5">
          <label
            htmlFor="meetingId"
            className="block mb-1 ml-2 text-xs tracking-widest uppercase text-gray-500 font-semibold"
          >
            Meeting ID or Link
          </label>

          <div className="relative">
            <Link2
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              value={meetingId}
              id="meetingId"
              onChange={(e) => setMeetingId(e.target.value)}
              placeholder="Paste meeting link"
              className="w-full h-12 rounded-2xl bg-[#1D1D28] border border-white/10 pl-14 pr-5 outline-none text-base focus:border-purple-500 transition"
            />
          </div>
        </div>

        {/* ================= Join Button ================= */}

        <button
          onClick={handleJoinMeeting}
          className="mt-5 w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 text-lg font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] transition"
        >
          Join Meeting
          <ArrowRight size={22} />
        </button>

        {/* Divider */}

        <div className="flex items-center gap-4 my-3">
          <div className="flex-1 h-px bg-white/10" />

          <span className="text-gray-500 font-semibold">OR</span>

          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* ================= Create Meeting ================= */}

        <p className="text-center text-gray-500 mb-3">
          Don't have a meeting link?
        </p>

        <button
          onClick={handleCreateMeeting}
          className="w-full h-12 rounded-2xl border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 transition text-lg font-semibold flex items-center justify-center gap-3"
        >
          <Plus size={20} />
          Create Meeting
        </button>
      </div>
    </div>
  );
};

export default JoinCard;
