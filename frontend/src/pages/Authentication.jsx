import React from "react";
import AuthCard from "../components/AuthCard";
import Navbar from "../components/Navbar";
import LandingActions from "../components/LandingActions";

const Authentication = () => {
  return (
    <>
      <Navbar>
        {/* pass as children */}
        <LandingActions />
      </Navbar>

      <div className="min-h-screen grid md:grid-cols-2 bg-zinc-950 text-white">
        {/* Left Side  */}
        <div className="hidden md:flex flex-col justify-center px-16 relative overflow-hidden">
          {/* Glow */}
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-bold leading-tight">
              Connect instantly <br />
              with{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                anyone
              </span>
            </h1>
          </div>

          <div className="mt-6 text-gray-400 max-w-md">
            Simple, secure, and fast video communication for everyone.{" "}
          </div>

          <div className="mt-8 flex gap-4 text-sm text-gray-400">
            <span>✓ No downloads</span>
            <span>✓ Secure</span>
            <span>✓ Instant join</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-6">
          <div className="relative w-full max-w-md">
            {/* 🔥 Glow (BACKGROUND) */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-[300px] h-[300px] bg-purple-500/20 blur-[120px] rounded-full"></div>
            </div>

            <AuthCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
