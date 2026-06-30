const formatTime = (time) => {
  return new Date(time).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default formatTime;
