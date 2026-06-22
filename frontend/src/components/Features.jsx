import React from "react";
import { Video, Shield, MessageSquare, Zap } from "lucide-react";

const features = [
  {
    title: "HD Video",
    desc: "Crystal clear 4K video with adaptive bandwidth.",
    icon: <Video />,
  },
  {
    title: "Secure Calls",
    desc: "End-to-end encrypted communication.",
    icon: <Shield />,
  },
  {
    title: "Instant Join",
    desc: "No downloads. Join instantly via link.",
    icon: <Zap />,
  },
  {
    title: "Live Chat",
    desc: "Chat during meetings with file sharing.",
    icon: <MessageSquare />,
  },
];

const Features = () => {
  return (
    <section className="mt-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Everything you need for{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            perfect meetings
          </span>
        </h2>

        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Secure, fast and remarkably easy to use video communication platform.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {features.map((item, i) => (
            <div
              key={i}
              className="group relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition"></div>

              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 mb-5 text-xl">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
