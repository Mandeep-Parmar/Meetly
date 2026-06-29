import React from "react";
import { toast } from "react-toastify";
import generateMeetingId from "../utils/generateMeetingId";
import { useNavigate } from "react-router-dom";

const useMeeting = () => {
  const navigate = useNavigate();

  const getMeetingId = (value) => {
    value = value.trim();

    if (value.includes("/")) {
      const parts = value.split("/");

      return parts[parts.length - 1];
    }

    return value;
  };

  const joinMeeting = ({ username, meetingId }) => {
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

  const createMeeting = ({ username }) => {
    const roomId = generateMeetingId();

    navigate(`/meeting/${roomId}`, {
      state: { username },
    });
  };

  return {
    joinMeeting,
    createMeeting,
  };
};

export default useMeeting;
