import React, { useEffect, useRef, useState } from "react";

const VideoMeet = () => {
  // ================= REFERENCE =================

  // Used to access <video> DOM element directly
  // So we can attach camera stream to it
  let localVideoRef = useRef();

  // ================= PERMISSIONS =================

  // Whether camera permission is granted
  const [videoAvailable, setVideoAvailable] = useState(false);
  // Whether mic permission is granted
  const [audioAvailable, setAudioAvailable] = useState(false);
  // Whether screen sharing is supported
  const [screenAvailable, setScreenAvailable] = useState(false);

  // ================= MEDIA CONTROLS =================

  // Is camera ON/OFF
  const [video, setVideo] = useState(true);
  // Is mic ON/OFF
  const [audio, setAudio] = useState(true);
  // Is screen sharing ON/OFF
  const [screen, setScreen] = useState(false);

  // ================= UI STATES =================

  // Show model (not used yet)
  const [showModel, setShowMode] = useState(true);
  // Show username input screen first
  const [askForUsername, setAskForUsername] = useState(true);

  // ================= USER =================

  // Store username input
  const [username, setUsername] = useState("");

  // ================= CHAT =================

  // Store all chat messages
  const [messages, setMessages] = useState([]);
  // Current message typing
  const [message, setMessage] = useState("");
  // Count unread messages
  const [NewMessages, setNewMessages] = useState(0);

  // ================= VIDEO LIST =================

  // Store other users videos (future WebRTC use)
  const [videos, setVideos] = useState([]);

  //-------------------- GET PERMISSIONS (camera + mic) ------------
  const getPermissions = async () => {
    try {
      // Ask for video
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoPermission) {
        setVideoAvailable(true);
      } else {
        setVideoAvailable(false);
      }

      // Ask for audio
      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      if (audioPermission) {
        setAudioAvailable(true);
      } else {
        setAudioAvailable(false);
      }

      // Check screen share support
      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });

        if (userMediaStream) {
          // Save stream globally (used later for WebRTC)
          window.localStream = userMediaStream;

          // Show video on screen
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (error) {
      console.log("Permission denied:", error);

      setVideoAvailable(false);
      setAudioAvailable(false);
    }
  };

  //---------------------- CONTROL CAMERA / MIC ON-OFF ---------------
  let updateMedia = async () => {
    try {
      // If video or audio enabled
      if ((video && videoAvailable) || (audio && audioAvailable)) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: video,
          audio: audio,
        });

        // Save stream globally
        window.localStream = stream;

        // Show video on screen
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } else {
        // else both off → stop everything
        const tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);

    // connectToSocketServer();
  };

  // run on page load
  useEffect(() => {
    getPermissions();
  }, []);

  // Whenever video OR audio changes
  // → run updateMedia()
  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      updateMedia();
    }
  }, [audio, video]);

  // After clicking connect:
  // → if permission = true → turn ON
  // → if permission = false → stay OFF
  const connect = () => {
    setAskForUsername(false);
    getMedia();
  };

  return (
    <div className="p-6 text-white">
      {/* ================= USERNAME SCREEN ================= */}
      {askForUsername ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Enter Lobby</h2>

          <div className="space-y-1">
            <label
              htmlFor="username"
              className="block text-xs font-medium text-gray-400 ml-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 rounded bg-white/10 border border-white/20"
            />

            <button
              onClick={() => connect()}
              className="px-4 py-2 bg-purple-600 rounded"
            >
              Connect
            </button>
          </div>

          {/* ================= VIDEO SCREEN ================= */}
          <div className="space-y-4">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="w-[400px] bg-black rounded"
            />

            {/* CONTROLS */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setVideo(!video);
                }}
                className="px-3 py-2 bg-blue-600 rounded"
              >
                {video ? "Turn Video Off" : "Turn Video On"}
              </button>

              <button
                onClick={() => {
                  setAudio(!audio);
                }}
                className="px-3 py-2 bg-green-600 rounded"
              >
                {audio ? "Mute Mic" : "Unmute Mic"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default VideoMeet;
