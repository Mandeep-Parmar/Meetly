import mongoose from "mongoose";

const MeetingSchema = mongoose.Schema({
  // User who created the meeting
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  meetingCode: {
    type: String,
    required: true,
  },

  // meeting start time
  startedAt: {
    type: Date,
    default: Date.now,
  },
});

const MeetingModel = mongoose.model("Meeting", MeetingSchema);

export default MeetingModel;
