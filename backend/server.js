import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import { connectToSocket } from "./sockets/socket.js";
import { createServer } from "node:http";
import userRouter from "./routes/userRoute.js";

const app = express();
connectDB();
const server = createServer(app);
connectToSocket(server);

// middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

// api routes
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

server.listen(port, () => {
  console.log(`Server is listing on port ${port}`);
});
