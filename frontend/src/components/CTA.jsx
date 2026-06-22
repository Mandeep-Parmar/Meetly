import React from "react";
import { Video } from "lucide-react";

const CTA = () => {
  return (
    <section className="my-32 px-6 text-center relative overflow-hidden">
      {/* Tag */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-8"
        style={{
          background: "rgba(124,58,237,0.1)",
          border: "1px solid rgba(124,58,237,0.2)",
          color: "#a78bfa",
        }}
      >
        START FOR FREE
      </div>

      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto tracking-tight">
        Your next meeting <br />
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          is one click away.
        </span>
      </h2>

      {/* Subtext */}
      <p className="mt-6 text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
        No credit card. No downloads. No friction. Just press the button and
        you're live.
      </p>

      {/* CTA Button */}
      <div className="mt-10">
        <button className="group relative px-10 py-4 rounded-full text-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 transition duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-purple-500/30">
          {/* Content */}
          <span className="relative flex items-center gap-2 justify-center">
            <Video /> Create Meeting — it's free
          </span>
        </button>
      </div>

      {/* Bottom Points */}
      <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
        <span className="hover:text-white transition">
          ✓ No sign-up required
        </span>
        <span className="hover:text-white transition">
          ✓ Works in any browser
        </span>
        <span className="hover:text-white transition">✓ Free forever</span>
      </div>
    </section>
  );
};

export default CTA;
