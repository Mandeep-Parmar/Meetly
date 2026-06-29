import React from "react";
import { Video, Link2, History, ArrowUpRight } from "lucide-react";

const actions = [
  {
    title: "New Meeting",
    description: "Start an instant meeting and invite anyone.",
    icon: Video,
    color: "from-indigo-500 to-purple-500",
    action: "create",
  },
  {
    title: "Join Meeting",
    description: "Join instantly using a meeting code or link.",
    icon: Link2,
    color: "from-violet-500 to-fuchsia-500",
    action: "join",
  },
  {
    title: "Meeting History",
    description: "View all your previous meetings.",
    icon: History,
    color: "from-purple-500 to-pink-500",
    action: "history",
  },
];

const QuickActions = ({
  handleCreateMeeting,
  handleJoinMeeting,
  handleHistory,
}) => {
  return (
    <section className="mt-16 mb-20">
      {/* Heading */}

      <div className="mb-8">
        <h2 className="text-3xl font-bold">Quick Actions</h2>

        <p className="mt-2 text-gray-400">
          Everything you need to start collaborating.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              onClick={() => {
                if (action.action === "create") {
                  handleCreateMeeting();
                } else if (action.action === "join") {
                  handleJoinMeeting();
                } else {
                  handleHistory();
                }
              }}
              key={action.title}
              className="group rounded-3xl border border-white/10 bg-[#171721]/90 p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(139,92,246,.15)] cursor-pointer"
            >
              {/* Icon */}
              <div
                className={`w-13 h-13 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center`}
              >
                <Icon size={20} />
              </div>

              {/* Title */}
              <h3 className="mt-7 text-2xl font-semibold">{action.title}</h3>

              {/* Description */}
              <p className="mt-3 text-gray-400 leading-7">
                {action.description}
              </p>

              {/* Arrow */}
              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm text-gray-500">Click to continue</span>

                <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center transition group-hover:bg-purple-500">
                  <ArrowUpRight
                    size={20}
                    className="transition group-hover:rotate-45"
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;
