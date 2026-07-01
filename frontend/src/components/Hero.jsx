import React, { useEffect, useState } from "react";
import lobby from "../assets/lobby.jpeg";
import meeting from "../assets/meeting.jpeg";
import chat from "../assets/chat.jpeg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const screenshots = [lobby, meeting, chat];
  const labels = ["Lobby Preview", "Meeting Room", "Live Chat"];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % screenshots.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

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
          <div className="my-5">
            <button
              className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
              onClick={() => navigate("/join")}
            >
              Join Meeting
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative animate-float">
          {/* Background Glow  */}
          <div
            className="absolute -inset-12 -z-10 rounded-full blur-[120px] transition-all duration-700"
            style={{
              background:
                current === 0
                  ? "rgba(99,102,241,.20)"
                  : current === 1
                    ? "rgba(168,85,247,.20)"
                    : "rgba(236,72,153,.20)",
            }}
          />

          {/* Browser Frame */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#171721] shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            {/* Browser Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#1D1D28]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>

              <span className="text-xs text-gray-400 font-medium">
                Meetly Preview
              </span>

              {/* Empty div keeps the title centered */}
              <div className="w-11" />
            </div>

            {/* Screenshot */}
            <img
              key={current}
              src={screenshots[current]}
              alt="Meetly Preview"
              className="w-full transition-all duration-700 animate-fade"
            />
          </div>

          {/* Indicators */}
          <div className="mt-6 flex justify-center gap-3">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-12 bg-gradient-to-r from-indigo-500 to-purple-500"
                    : "w-3 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <p className="mt-4 text-center text-sm text-gray-400">
            {labels[current]}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
