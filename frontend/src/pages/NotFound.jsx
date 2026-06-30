import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Compass } from "lucide-react";
import Navbar from "../components/Navbar";
import LandingActions from "../components/LandingActions";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar>
        <LandingActions />
      </Navbar>

      <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden px-6 py-36">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-purple-700/20 blur-[180px]" />

          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-indigo-700/10 blur-[180px]" />

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-700/10 blur-[180px]" />
        </div>

        {/* Main glassmorphism card */}
        <div className="relative z-10 max-w-lg w-full bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl transition-transform duration-300 ease-out">
          {/* Floating icon header */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-8 animate-float">
            <Compass
              className="w-12 h-12 text-indigo-400 animate-spin"
              style={{ animationDuration: "30s" }}
            />
            <div
              className="absolute inset-0 rounded-full border border-dashed border-purple-500/40 animate-spin"
              style={{ animationDuration: "15s" }}
            ></div>
          </div>

          {/* Big 404 Text */}
          <h1 className="text-8xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-wider select-none font-sans drop-shadow-[0_5px_15px_rgba(99,102,241,0.2)]">
            404
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl font-bold mt-4 mb-3 text-zinc-100">
            Lost in Navigation
          </h2>

          {/* Description */}
          <p className="text-zinc-400 text-sm md:text-base mb-10 leading-relaxed max-w-sm mx-auto">
            We searched everywhere, but this room seems to have expired or never
            existed. Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-6 py-3.5 flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10 hover:border-white/20 text-zinc-200 font-medium transition-all duration-300 active:scale-95 cursor-pointer shadow-lg hover:shadow-zinc-950/50"
            >
              <ArrowLeft className="w-4.5 h-4.5" />
              Go Back
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3.5 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium transition-all duration-300 active:scale-95 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 cursor-pointer"
            >
              <Home className="w-4.5 h-4.5" />
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
