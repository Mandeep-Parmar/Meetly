import express from "express";
import auth from "../middlewares/auth.js";
import { createMeeting } from "../controllers/meetingController.js";

const meetingRouter = express.Router();

meetingRouter.post("/create", auth, createMeeting);

export default meetingRouter;
