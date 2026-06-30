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

  // Users who joined the meeting
  participants: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: {
        type: String,
        required: true,
      },
    },
  ],

  // meeting start time
  startedAt: {
    type: Date,
    default: Date.now,
  },

  // Meeting end time
  endedAt: {
    type: Date,
  },

  // Duration in seconds
  duration: {
    type: Number,
    default: 0,
  },
});

const MeetingModel = mongoose.model("Meeting", MeetingSchema);

export default MeetingModel;
