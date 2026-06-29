import React, { useState } from "react";
import JoinCard from "../components/JoinCard";
import Navbar from "../components/Navbar";
import JoinActions from "../components/JoinActions";
import generateMeetingId from "../utils/generateMeetingId";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const JoinMeeting = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [meetingId, setMeetingId] = useState("");

  const getMeetingId = (value) => {
    value = value.trim();

    if (value.includes("/")) {
      const parts = value.split("/");

      return parts[parts.length - 1];
    }

    return value;
  };

  const handleJoinMeeting = () => {
    if (!username.trim()) {
      toast.error("Enter your name");
      return;
    }

    if (!meetingId.trim()) {
      toast.error("Enter meeting ID");
      return;
    }

    const roomId = getMeetingId(meetingId);

    if (!roomId.startsWith("mtly-")) {
      toast.error("Invalid meeting ID");
      return;
    }

    navigate(`/meeting/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleCreateMeeting = () => {
    const roomId = generateMeetingId();

    navigate(`/meeting/${roomId}`, {
      state: { username },
    });
  };

  return (
    <>
      <Navbar>
        <JoinActions />
      </Navbar>

      <div className="min-h-screen py-16 bg-[#0B0B0F] text-white">
        <div className="relative">
          {/* Background Glow */}

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-700/20 blur-[180px]" />

            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-700/10 blur-[180px]" />

            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-700/10 blur-[180px]" />
          </div>

          {/* Content */}

          <div className="mx-auto px-5 py-20 flex justify-center">
            <JoinCard
              username={username}
              setUsername={setUsername}
              meetingId={meetingId}
              setMeetingId={setMeetingId}
              handleJoinMeeting={handleJoinMeeting}
              handleCreateMeeting={handleCreateMeeting}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinMeeting;
