import MeetingModel from "../models/MeetingModel.js";

export const createMeeting = async (req, res) => {
  try {
    const { meetingCode } = req.body;

    // Check if meeting already exists
    const existingMeeting = await MeetingModel.findOne({
      meetingCode,
    });

    if (existingMeeting) {
      return res.json({
        success: true,
        meeting: existingMeeting,
      });
    }

    const userId = req.user.id;

    // Create new meeting
    const meeting = await MeetingModel.create({
      user_id: userId,
      meetingCode,
      participants: [
        {
          user_id: userId,
          username: req.user.username,
        },
      ],
      startedAt: new Date(),
    });

    res.json({
      success: true,
      meeting,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getMeetingHistory = async (req, res) => {
  try {
    const meetings = await MeetingModel.find({ user_id: req.user.id }).sort({
      date: -1,
    });

    res.json({ success: true, meetings });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const addParticipant = async (req, res) => {
  try {
    const { meetingCode } = req.body;

    // Check if meeting already exists
    const meeting = await MeetingModel.findOne({
      meetingCode,
    });

    if (!meeting) {
      return res.json({
        success: false,
        message: "Meeting not found",
      });
    }

    const userId = req.user.id;

    const alreadyJoined = await meeting.participants.some(
      (participant) => participant.user_id.toString() === userId,
    );

    if (!alreadyJoined) {
      meeting.participants.push({
        user_id: userId,
        username: req.user.username,
      });

      await meeting.save();
    }

    res.json({
      success: true,
      meeting,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
