import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DashboardActions from "../components/DashboardActions";
import HistoryHero from "../components/HistoryHero";
import HistoryCard from "../components/HistoryCard";
import HistoryEmpty from "../components/HistoryEmpty";
import { AuthContext } from "../context/AuthContext";

const History = () => {
  const { token, getMeetingHistory } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  const loadHistory = async () => {
    const response = await getMeetingHistory();

    if (response?.success) {
      setMeetings(response.meetings);
    }
  };

  useEffect(() => {
    if (token) {
      loadHistory();
    }
  }, [token]);

  return (
    <>
      <Navbar>
        <DashboardActions />
      </Navbar>

      <div className="min-h-screen bg-[#0B0B0F] text-white">
        {/* Background Glow */}

        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-purple-700/15 blur-[180px]" />

          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-700/10 blur-[180px]" />

          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-700/10 blur-[180px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <HistoryHero />

          {meetings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-24">
              {meetings.map((meeting) => (
                <HistoryCard key={meeting._id} meeting={meeting} />
              ))}
            </div>
          ) : (
            <HistoryEmpty />
          )}
        </div>
      </div>
    </>
  );
};

export default History;
