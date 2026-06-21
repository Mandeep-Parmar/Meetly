import mongoose from "mongoose";

const MeetingSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  meetingCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const MeetingModel = mongoose.model("Meeting", MeetingSchema);

export default MeetingModel;
