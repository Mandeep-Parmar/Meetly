const generateMeetingId = () => {
  return "mtly-" + Math.random().toString(36).substring(2, 8);
};

export default generateMeetingId;
