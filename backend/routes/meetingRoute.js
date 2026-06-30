import express from "express";
import auth from "../middlewares/auth.js";
import {
  createMeeting,
  getMeetingHistory,
} from "../controllers/meetingController.js";

const meetingRouter = express.Router();

meetingRouter.post("/create", auth, createMeeting);
meetingRouter.get("/history", auth, getMeetingHistory);

export default meetingRouter;
