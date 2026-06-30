import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import Lobby from "./Lobby";
import MeetingRoom from "./MeetingRoom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const VideoMeet = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  // ======================================================
  // WebRTC Configuration
  //
  // STUN server helps browsers discover their
  // public network address.
  //
  // Google provides a free public STUN server,
  // which is enough for development.
  // ======================================================
  const peerConfigConnections = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

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

  const showChatRef = useRef(false);

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

  // show chat screen ui
  const [showChat, setShowChat] = useState(false);
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
  const [unreadCount, setUnreadCount] = useState(0);

  // ================= VIDEO LIST =================

  // Store other users videos (future WebRTC use)
  const [videos, setVideos] = useState([]);

  // Stores information of every participant
  // Example:
  // {
  //   socketId1: {
  //      username: "Mandeep",
  //      video: true,
  //      audio: true
  //   }
  // }
  const [usersData, setUsersData] = useState({});

  const { user, token, createMeeting } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const finalUsername = location.state?.username || user?.username || "";

    if (finalUsername) {
      setUsername(finalUsername);
    }
  }, [location.state, user]);

  //-------------------- GET PERMISSIONS (camera + mic) ------------
  const getPermissions = async () => {
    try {
      // Ask for video
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      // Store permission result in a local variable.
      // We use this immediately because React state
      // updates asynchronously.
      // !! (double exclamation mark) is a JavaScript operator used to forcefully convert any value into a strict boolean (true or false).
      const hasVideo = !!videoPermission;
      setVideoAvailable(hasVideo);

      // Ask for audio
      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Store permission result in a local variable.
      const hasAudio = !!audioPermission;
      setAudioAvailable(hasAudio);

      // Check screen share support
      setScreenAvailable(!!navigator.mediaDevices.getDisplayMedia);

      // Use local variables instead of React state.
      // React state hasn't updated yet inside this function.
      if (hasVideo || hasAudio) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: hasVideo,
          audio: hasAudio,
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

  // ======================================================
  // Handle every signaling message received from Socket.IO.
  //
  // The message(signal) may contain:
  //
  // 1. SDP Offer   -> "I want to start a call."
  // 2. SDP Answer  -> "I accept your call."
  // 3. ICE Candidate -> "Here is one network path to reach me."
  //
  // This function checks which type of signal arrived
  // and performs the appropriate action.
  // ======================================================
  const handleSignal = async (fromId, message) => {
    // Convert JSON string into JavaScript object
    const signal = JSON.parse(message);

    console.log(signal);

    //------------- OFFER / ANSWER ---------------

    // If signal contains "sdp",
    // then it is either an Offer or an Answer.
    if (signal.sdp) {
      // If this is the first message from this user, create a PeerConnection first.
      if (!connections.current[fromId]) {
        createPeerConnection(fromId);
      }
      // Get this participant's PeerConnection.
      const peer = connections.current[fromId];

      // Save remote description
      await peer.setRemoteDescription(new RTCSessionDescription(signal.sdp));

      // -------------------------------------------------
      // OFFER RECEIVED
      // -------------------------------------------------
      // Someone is asking to start a WebRTC connection.
      //
      // We must:
      //
      // 1. Create an Answer
      // 2. Save it locally
      // 3. Send it back
      // -------------------------------------------------
      if (signal.sdp.type === "offer") {
        console.log("Offer received");

        // Browser creates an Answer.
        const answer = await peer.createAnswer();

        // Save Answer inside this browser.
        await peer.setLocalDescription(answer);

        // Send Answer back to caller.
        socketRef.current.emit(
          "signal",
          fromId,
          JSON.stringify({
            sdp: peer.localDescription,
          }),
        );
      }
      // -------------------------------------------------
      // ANSWER RECEIVED
      // -------------------------------------------------
      // This means the other participant
      // accepted our Offer.
      //
      // Nothing else to create here because
      // setRemoteDescription() already saved it.
      // -------------------------------------------------
      else {
        console.log("Answer received");
      }
    }

    // ===================================================
    // ICE CANDIDATE
    // ===================================================
    // ICE Candidate contains one possible network path.
    //
    // Browser discovered a way to reach the other user.
    //
    // Add this path into the PeerConnection.
    //
    // Browser will automatically test it.
    // ===================================================
    else if (signal.ice) {
      console.log("ICE Candidate received");

      // Add this candidate to PeerConnection.
      // Browser will now try this network path.
      await connections.current[fromId].addIceCandidate(
        new RTCIceCandidate(signal.ice),
      );
    }
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

    if (!peer) return;

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
      userId,
      JSON.stringify({
        sdp: peer.localDescription,
      }),
    );
  };

  // ======================================================
  // User left (when other user leave the meeting)
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
    const peer = connections.current[userId];

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
        userId,
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

      addRemoteVideo(userId, event.streams[0]);
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
        peer.addTrack(track, window.localStream);
      });
    }
  };

  // ======================================================
  // NEW USER JOINED
  // ======================================================
  // participants → array of socket IDs
  // usersData → object containing usernames, video status, audio status
  const handleUserJoined = (newUserId, participants, userData) => {
    console.log("New User: ", newUserId);

    // Save latest participant information
    setUsersData(userData);

    participants.forEach((userId) => {
      // Don't create a connection with yourself.
      if (userId === socketIdRef.current) return;

      // Create a WebRTC connection (a communication pipe)
      // between me and this participant.
      if (!connections.current[userId]) {
        createPeerConnection(userId);
      }

      // -------------------------------------------------------
      // Start WebRTC negotiation.
      //
      // After creating a PeerConnection,
      // someone must initiate the connection.
      //
      // This browser becomes the "caller" by creating an Offer.
      //
      // Flow:
      //
      // Me
      //   │
      // createOffer()
      //   │
      // Socket.IO
      //   │
      // Other User
      //
      // The other user will receive this Offer,
      // create an Answer,
      // and send it back.
      // -------------------------------------------------------
      if (newUserId === userId) {
        createOffer(userId);
      }
    });
  };

  // ======================================================
  // REGISTER SOCKET EVENTS
  // ======================================================
  const registerSocketEvents = () => {
    // someone joined
    socketRef.current.on("user-joined", handleUserJoined);

    // whenever someone mutes/unmutes or turns video on/off, everyone's UI updates.
    socketRef.current.on("user-media-updated", (socketId, user) => {
      setUsersData((prev) => ({
        ...prev,
        [socketId]: user,
      }));
    });

    socketRef.current.on("chat-message", (chat) => {
      setMessages((prev) => [...prev, chat]);

      // Increase unread count only if chat panel is closed (also Don't count your own messages)
      if (!showChatRef.current && chat.socketId !== socketRef.current.id) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    // someone left
    socketRef.current.on("user-left", handleUserLeft);

    // Receive offer / answer / ice
    socketRef.current.on("signal", handleSignal);
  };

  // ======================================================
  // Join Meeting
  // ======================================================
  const joinMeeting = () => {
    socketRef.current.emit("join-call", { roomId, username });

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

  // ======================================================
  // Reattach the existing local media stream after
  // switching from the lobby to the meeting screen.
  // ======================================================
  useEffect(() => {
    if (!askForUsername && localVideoRef.current && window.localStream) {
      localVideoRef.current.srcObject = window.localStream;
    }
  }, [askForUsername]);

  // After clicking connect:
  // → if permission = true → turn ON
  // → if permission = false → stay OFF
  const connect = async () => {
    // Remove extra spaces
    const trimmedUsername = username.trim();

    //check if username is empty
    if (!trimmedUsername) {
      toast.error("Please enter your username.");
      return;
    }

    // Create meeting only for logged-in users
    if (token) {
      const meetingResponse = await createMeeting(roomId);

      if (!meetingResponse?.success) {
        toast.error("Unable to create meeting.");
        return;
      }
    }

    setAskForUsername(false);
    getMedia();
  };

  // ======================================================
  // VIDEO ON / OFF
  // ======================================================
  const toggleVideo = () => {
    // no stream yet
    if (!window.localStream) return;

    // Get video track
    const videoTrack = window.localStream.getVideoTracks()[0];

    if (!videoTrack) return;

    // Toggle the video.
    //
    // true  -> camera sends video
    // false -> camera not sends video
    videoTrack.enabled = !videoTrack.enabled;

    // update React State
    setVideo(videoTrack.enabled);

    // this is used bcz audio is react state which works asynchronously
    const audioTrack = window.localStream.getAudioTracks()[0];

    // emit media-status updated
    socketRef.current?.emit("media-status", {
      video: videoTrack.enabled,
      audio: audioTrack.enabled,
    });

    console.log(videoTrack.enabled ? "Camera Enabled" : "Camera Disabled");
  };

  // ======================================================
  // MICROPHONE ON / OFF
  // ======================================================
  const toggleAudio = () => {
    if (!window.localStream) return;

    const audioTrack = window.localStream.getAudioTracks()[0];

    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;

    setAudio(audioTrack.enabled);

    const videoTrack = window.localStream.getVideoTracks()[0];

    socketRef.current?.emit("media-status", {
      video: videoTrack.enabled,
      audio: audioTrack.enabled,
    });

    console.log(
      audioTrack.enabled ? "Microphone Enabled" : "Microphone Disabled",
    );
  };

  // when you leave the meeting
  const leaveMeeting = () => {
    // ---------------- Stop Camera & Mic ----------------
    if (window.localStream) {
      window.localStream.getTracks().forEach((track) => track.stop());
    }

    // ---------------- Close all Peer Connections ----------------
    Object.values(connections.current).forEach((peer) => {
      peer.close();
    });

    connect.current = {};

    // ---------------- Disconnect Socket ----------------
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    // ---------------- Clear UI ----------------
    setVideos([]);
    setUsersData({});
    setAskForUsername(true);

    // ---------------- Go Home ----------------
    navigate("/");
  };

  // ======================================================
  // Replace the camera video with the shared screen
  // for every connected participant.
  //
  // Every participant has their own RTCPeerConnection.
  // Inside each connection, there is a "video sender"
  // responsible for sending our camera to that participant.
  //
  // We find that sender and replace the camera track
  // with the screen track.
  //
  // This keeps the same WebRTC connection alive.
  // Only the video source changes (Camera → Screen).
  // ======================================================
  const replaceVideoTrack = (newTrack) => {
    Object.values(connections.current).forEach((peer) => {
      // Get all RTP senders from this PeerConnection.
      const videoSender = peer
        .getSenders()
        // Find the sender that is sending the VIDEO track. Ignore the audio sender.
        .find((sender) => sender.track?.kind === "video");

      // If a video sender exists,
      // replace the current camera track with the screen track.
      // The remote user will now see our screen instead of the camera.
      // No need to reconnect or create a new PeerConnection.
      if (videoSender) {
        videoSender.replaceTrack(newTrack);
        console.log("Track replaced");
      }
    });
  };

  // ======================================================
  // Stop Screen Sharing
  // ======================================================
  const stopScreenShare = async () => {
    const videoTrack = window.localStream.getVideoTracks()[0];

    replaceVideoTrack(videoTrack);

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = window.localStream;
    }

    if (window.screenStream) {
      window.screenStream.getTracks().forEach((track) => track.stop());
    }

    setScreen(false);

    console.log("Screen sharing stopped");
  };

  // ======================================================
  // Toggle Screen Sharing
  // ======================================================
  const toggleScreenShare = async () => {
    try {
      // If already sharing, stop sharing
      if (screen) {
        stopScreenShare();
        return;
      }

      // ask user which screen/window to share
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      const screenTrack = screenStream.getVideoTracks()[0];

      replaceVideoTrack(screenTrack);

      // save stream globally
      window.screenStream = screenStream;

      // Show Screen Locally
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }

      // update UI
      setScreen(true);

      console.log("Screen sharing started");
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    socketRef.current.emit("chat-message", message, username);

    setMessage("");
  };

  // Reset unread count when opening chat
  const toggleChat = () => {
    setShowChat((prev) => {
      const next = !prev;

      if (next) {
        setUnreadCount(0);
      }

      return next;
    });
  };

  // Whenever showChat changes
  useEffect(() => {
    showChatRef.current = showChat;
  }, [showChat]);

  return (
    <div className="text-white">
      {/* ================= USERNAME SCREEN ================= */}
      {askForUsername ? (
        <Lobby
          localVideoRef={localVideoRef}
          username={username}
          setUsername={setUsername}
          connect={connect}
          videoAvailable={videoAvailable}
          audioAvailable={audioAvailable}
          video={video}
          audio={audio}
          handleVideo={toggleVideo}
          handleAudio={toggleAudio}
        />
      ) : (
        <MeetingRoom
          localVideoRef={localVideoRef}
          videos={videos}
          usersData={usersData}
          username={username}
          video={video}
          audio={audio}
          screen={screen}
          toggleScreenShare={toggleScreenShare}
          handleVideo={toggleVideo}
          handleAudio={toggleAudio}
          leaveMeeting={leaveMeeting}
          showChat={showChat}
          setShowChat={setShowChat}
          message={message}
          setMessage={setMessage}
          messages={messages}
          sendMessage={sendMessage}
          unreadCount={unreadCount}
          toggleChat={toggleChat}
        />
      )}
    </div>
  );
};

export default VideoMeet;
