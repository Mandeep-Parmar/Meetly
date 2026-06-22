import { Server, Socket } from "socket.io";

// on     → listen (wait for something to happen)
// emit   → send data / trigger event
// to     → send to specific user

// Store all active connections (rooms)
let connections = {};
// Example:
// {
// "room1": ["socketId1", "socketId2"]
// }

// Store chat messages per room
let messages = {};

// Store user join time
let timeOnline = {};

export const connectToSocket = (server) => {
  // create socket server
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // when user connects
  io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    // ------------------- JOIN ROOM (JOIN CALL) -----------------------
    socket.on("join-call", (roomId) => {
      // create room if not exists
      if (!connections[roomId]) {
        connections[roomId] = [];
      }

      // add user to room
      connections[roomId].push(socket.id);

      // store join time
      timeOnline[socket.id] = new Date();

      console.log("Room: ", roomId, connections[roomId]);

      // notify all users in room
      connections[roomId].forEach((id) => {
        io.to(id).emmit("user-joined", socket.id, connections[roomId]);
      });

      // send old messages to new user
      if (messages[roomId]) {
        messages[roomId].forEach((msg) => {
          io.to(socket.id).emit(
            "chat-message",
            msg.data,
            msg.sender,
            msg.socketId,
          );
        });
      }
    });

    // ------------- SIGNAL (WEBRTC CORE) ----------------
    socket.on("signal", (toId, data) => {
      // Forward WebRTC data to other user
      io.to(toId).emit("signal", socket.id, data);
    });

    // -------------- CHAT MESSAGE ---------------
    socket.on("chat-message", (data, sender) => {
      // find which room user is belongs to
      let roomId = null;

      for (let key in connections) {
        if (connections[key].includes(socket.id)) {
          roomId = key;
          break;
        }
      }

      if (!roomId) return;

      // store message
      if (!messages[roomId]) {
        messages[roomId] = [];
      }

      messages[roomId].push({ sender, data, socketId: socket.id });

      console.log("Message:", roomId, sender, data);

      // Send message to all users in room
      connections[roomId].forEach((id) => {
        io.to(id).emit("chat-message", data, sender, socket.id);
      });
    });

    // -------------------- DISCONNECT --------------
    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.id);

      let roomId = null;

      // Find room
      for (let key in connections) {
        if (connections[key].includes(socket.id)) {
          roomId = key;
          break;
        }
      }

      if (!roomId) return;

      // Notify others
      connections[roomId].forEach((id) => {
        io.to(id).emit("user-left", socket.id);
      });

      // Remove user
      connections[roomId] = connections[roomId].filter(
        (id) => id !== socket.id,
      );

      // Delete room id empty
      if (connections[roomId].length === 0) {
        delete connections[roomId];
      }

      // Remove time tracking
      delete timeOnline[socket.id];
    });
  });

  return io;
};
