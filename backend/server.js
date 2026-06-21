import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
connectDB();
const server = createServer(app);
const io = new Server(server);

// middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

// api routes

app.get("/", (req, res) => {
  res.send("API Working");
});

server.listen(port, () => {
  console.log(`Server is listing on port ${port}`);
});
