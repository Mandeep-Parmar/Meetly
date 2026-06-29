import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import DashboardActions from "../components/DashboardActions";
import DashboardHero from "../components/DashboardHero";
import QuickActions from "../components/QuickActions";
import { AuthContext } from "../context/AuthContext";
import useMeeting from "../hooks/useMeeting";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { createMeeting } = useMeeting();

  const handleCreateMeeting = () => {
    createMeeting({ username: user.username });
  };

  const handleJoinMeeting = () => {
    navigate("/join");
  };

  const handleHistory = () => {
    navigate("/history");
  };

  return (
    <>
      <div className="min-h-screen bg-[#0B0B0F] text-white">
        {/* ================= Navbar ================= */}
        <Navbar>
          <DashboardActions />
        </Navbar>

        {/* ================= Main Content ================= */}
        <main className="relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-purple-700/20 blur-[180px]" />

            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-indigo-700/10 blur-[180px]" />

            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-700/10 blur-[180px]" />
          </div>

          {/* Content Container */}
          <div className="relative max-w-7xl mx-auto px-6">
            {/* Hero */}
            <DashboardHero />

            {/* Quick Actions */}
            <QuickActions
              handleCreateMeeting={handleCreateMeeting}
              handleJoinMeeting={handleJoinMeeting}
              handleHistory={handleHistory}
            />

            {/* Tips */}
            {/* <TipsCard /> */}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
