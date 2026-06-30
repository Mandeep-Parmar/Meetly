import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import VideoMeet from "./pages/VideoMeet";
import JoinMeeting from "./pages/JoinMeeting";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  const isMeetingPage = location.pathname.startsWith("/meeting/");

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/join" element={<JoinMeeting />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />

        <Route path="/meeting/:roomId" element={<VideoMeet />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Hide Landing Footer inside Meeting */}
      {!isMeetingPage && <Footer />}
    </div>
  );
}

export default App;
