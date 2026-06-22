import React from "react";

const Hero = () => {
  return (
    <section className="py-14 md:pt-32 md:px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Connect <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              anytime, anywhere
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-md">
            High-quality video calls with zero hassle. No downloads required.
            Just share a link and start talking instantly.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90 transition">
              Create Meeting
            </button>

            <button className="px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition">
              Join Meeting
            </button>
          </div>
        </div>

        {/* RIGHT SIDE (UI MOCKUP) */}
        <div className="relative">
          {/* Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-xl">
            {/* Fake Video Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800 h-28 rounded-lg"></div>
              <div className="bg-gray-800 h-28 rounded-lg"></div>
              <div className="bg-gray-800 h-28 rounded-lg"></div>
              <div className="bg-gray-800 h-28 rounded-lg"></div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div className="w-10 h-10 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
