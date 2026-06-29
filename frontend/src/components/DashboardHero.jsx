import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardHero = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="mt-40 mb-16">
      {/* Small Badge */}
      <span className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1 text-sm font-medium text-purple-400">
        Dashboard
      </span>

      {/* Heading */}
      <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
        Welcome back,
        <br />
        <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
          {user?.username}
        </span>
        👋
      </h1>

      {/* Description */}
      <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-400">
        Start a new meeting, join an existing one, or access your meeting
        history—all from one place.
      </p>
    </section>
  );
};

export default DashboardHero;
