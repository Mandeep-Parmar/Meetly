import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const VideoMeet = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Stores one RTCPeerConnection per user
  const connections = useRef({});

  // ================= REFERENCE =================

  // Used to access <video> DOM element directly
  // So we can attach camera stream to it
  let localVideoRef = useRef();

  // This stores the socket connection
  const socketRef = useRef();
  // This stores the socket id
  const socketIdRef = useRef();

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
        const tracks = localVideoRef.current?.srcObject?.getTracks();
        tracks?.forEach((track) => track.stop());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ======================================================
  // Handle every signaling message.
  //
  // The message may contain:
  //
  // 1. Offer
  // 2. Answer
  // 3. ICE Candidate
  //
  // We'll identify which one it is
  // and process it accordingly.
  // ======================================================
  const handleSignal = async (fromId, message) => {
    // Convert JSON string into JavaScript object
    const signal = JSON.parse(message);

    // Handle Offer

    // Handle Answer

    // Handle ICE
  };

  // ======================================================
  // Create a WebRTC Offer.
  //
  // Think of an Offer as:
  //
  // "Hello!
  // I want to start a video call with you."
  // ======================================================
  const createOffer = async (userId) => {
    // Get this participant's PeerConnection.
    const peer = connections.current[userId];

    // --------------------------------------------
    // Create Offer
    // --------------------------------------------
    // Browser generates the information needed
    // to start the WebRTC connection.
    // --------------------------------------------
    const offer = await peer.createOffer();

    // Save this offer inside the browser. Later the browser uses it to establish the connection.
    await peer.setLocalDescription(offer);

    // Send the Offer to the other participant
    // through Socket.IO.
    //
    // Socket.IO only transfers the Offer.
    // Video is NOT sent through Socket.IO.
    socketRef.current.emit(
      "signal",
      clientId,
      JSON.stringify({
        sdp: peer.localDescription,
      }),
    );
  };

  // ======================================================
  // User left
  // Remove their video from the UI.
  // ======================================================
  const handleUserLeft = (userId) => {
    console.log(userId, "Left the meeting");

    setVideos((prev) => prev.filter((video) => video.socketId !== userId));
  };

  // ======================================================
  // ADD REMOTE VIDEO
  // Adds or updates a participant's video
  // inside the videos state
  // ======================================================
  const addRemoteVideo = (userId, stream) => {
    setVideos((prev) => {
      // Adds or updates a participant's video inside the videos state
      const alreadyExists = prev.find((video) => video.socketId === userId);

      // -------------------------------------------
      // User already exists
      // -------------------------------------------
      // Just replace the stream.
      // This avoids creating duplicate videos.
      // -------------------------------------------
      if (alreadyExists) {
        return prev.map((video) =>
          video.socketId === userId ? { ...video, stream } : video,
        );
      }

      // -------------------------------------------
      // First time seeing this participant
      // -------------------------------------------
      // Add them into the videos array.
      // -------------------------------------------
      return [
        ...prev,
        {
          socketId: userId,
          stream,
        },
      ];
    });
  };

  // ======================================================
  // CREATE PEER CONNECTION
  // Creates a direct WebRTC connection with one participant.
  // Think of it like creating a private communication pipe.
  // ======================================================
  const createPeerConnection = (userId) => {
    // Create a new WebRTC PeerConnection object.
    // Every participant has their own PeerConnection
    connections.current[userId] = new RTCPeerConnection(peerConfigConnections);

    // Short variable for easier reading.
    const peer = connections.current[clientId];

    // ------------------------------------------------------
    // ICE Candidate
    // ------------------------------------------------------
    // Whenever the browser discovers a new network path
    // (called an ICE Candidate),
    // send it to the other participant through Socket.IO.
    //
    // NOTE:
    // Socket.IO is NOT sending video.
    // It only sends connection information.
    // ------------------------------------------------------
    peer.onicecandidate = (event) => {
      // Browser finished finding candidates.
      if (!event.candidate) return;

      socketRef.current.emit(
        "signal",
        cliendId,
        JSON.stringify({
          ice: event.candidate,
        }),
      );
    };

    // ------------------------------------------------------
    // Remote Stream Received
    // ------------------------------------------------------
    // This runs when the other user's
    // camera & microphone arrive.
    //
    // We simply display their video.
    // ------------------------------------------------------
    peer.ontrack = (event) => {
      console.log("Remote stream received");

      addRemoteVideo(userId, event.stream[0]);
    };

    // ------------------------------------------------------
    // Send My Camera + Microphone
    // ------------------------------------------------------
    // localStream contains:
    // Camera Track
    // +
    // Microphone Track
    //
    // We attach both tracks to this PeerConnection
    // so the other participant can receive them.
    // ------------------------------------------------------
    if (window.localStream) {
      window.localStream.getTracks().forEach((track) => {
        peeer.addTrack(track, window.localStream);
      });
    }
  };

  // ======================================================
  // NEW USER JOINED
  // ======================================================
  const handleUserJoined = (newUserId, users) => {
    console.log("New User: ", newUserId);

    users.forEach((userId) => {
      // Don't create a connection with yourself.
      if (userId === socketIdRef.current) return;

      // Create a WebRTC connection (a communication pipe)
      // between me and this participant.
      createPeerConnection(userId);
    });
  };

  // ======================================================
  // REGISTER SOCKET EVENTS
  // ======================================================
  const registerSocketEvents = () => {
    // someone joined
    socketRef.current.on("user-joined", handleUserJoined);

    // someone left
    socketRef.current.on("user-left", handleUserLeft);

    // Receive offer / answer / ice
    socketRef.current.on("signal", handleSignal);
  };

  // ======================================================
  // Join Meeting
  // ======================================================
  const joinMeeting = () => {
    const roomId = "meeting-123";

    socketRef.current.emit("join-call", roomId);

    console.log("Joined Room:", roomId);
  };

  // ================= CONNECT TO SOCKET SERVER =================
  const connectToSocketServer = () => {
    // Already connected
    if (socketRef.current) return;

    // Connect frontend to socket server.
    socketRef.current = io(backendUrl);

    // ---------------- CONNECTED ----------------
    socketRef.current.on("connect", () => {
      console.log("Connected to socket server");

      // Save socket id
      socketIdRef.current = socketRef.current.id;

      console.log("My Socket ID:", socketIdRef.current);

      // Join meeting room
      joinMeeting();

      // Start listening to events
      registerSocketEvents();
    });
  };

  const getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);

    connectToSocketServer();
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
