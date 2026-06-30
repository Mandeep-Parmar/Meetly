import { Video, Copy, ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HistoryCard = ({ meeting }) => {
  const navigate = useNavigate();

  const joinMeeting = () => {
    navigate(`/meeting/${meeting.meetingCode}`);
  };

  const copyMeeting = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/meeting/${meeting.meetingCode}`,
    );

    toast.success("Meeting link copied");
  };

  return (
    <div className="group rounded-3xl border border-white/10 bg-[#171721]/90 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(139,92,246,.15)]">
      {/* Icon */}
      <div className="w-13 h-13 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
        <Video size={20} />
      </div>

      {/* Code */}
      <p className="mt-5 rounded-xl border border-purple-500/20 bg-purple-500/5 px-4 py-3 font-mono tracking-wider text-purple-300">
        {meeting.meetingCode}
      </p>

      <div className="mt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Created at
        </p>

        <div className="flex justify-between">
          <div className="flex items-center gap-3 text-gray-300">
            <CalendarDays size={18} className="text-purple-400" />

            <span>
              {new Date(meeting.startedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <Clock size={18} className="text-purple-400" />

            <span>
              {new Date(meeting.startedAt).toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex gap-3">
        <button
          onClick={joinMeeting}
          className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3 font-medium hover:opacity-90"
        >
          Join Again
        </button>

        <button
          onClick={copyMeeting}
          className="w-12 rounded-xl border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 flex items-center justify-center"
        >
          <Copy size={18} />
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;
