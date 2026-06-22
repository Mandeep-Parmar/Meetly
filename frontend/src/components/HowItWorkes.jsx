import React from "react";
import { Link, Share2, Video } from "lucide-react";

const steps = [
  {
    title: "Create a link",
    desc: "Generate a unique meeting room with a single click.",
    icon: <Link />,
  },
  {
    title: "Share with team",
    desc: "Invite participants via link, email or calendar.",
    icon: <Share2 />,
  },
  {
    title: "Start talking",
    desc: "Join instantly and start your conversation.",
    icon: <Video />,
  },
];

const HowItWorks = () => {
  return (
    <section className="mt-32 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Simple steps to get{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            started
          </span>
        </h2>

        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Start your meeting in seconds with our simple workflow.
        </p>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-12 mt-16">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {steps.map((step, i) => (
            <div
              key={i}
              className="group flex flex-col items-center text-center relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 text-xs text-gray-500">
                0{i + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/10 text-2xl mb-6 relative transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20">
                {/* Glow */}
                <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl opacity-0 group-hover:opacity-100 transition"></div>

                <span className="relative z-10">{step.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold group-hover:text-indigo-400 transition">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mt-2 max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
