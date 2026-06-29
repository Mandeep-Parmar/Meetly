import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import VideoMeet from "./pages/VideoMeet";
import JoinMeeting from "./pages/JoinMeeting";
import Dashboard from "./pages/Dashboard";

function App() {
  const location = useLocation();

  const isMeetingPage = location.pathname.startsWith("/meeting/");

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Hide Landing Navbar inside Meeting */}
      {!isMeetingPage && <Navbar />}

      {/* grow → pushes footer to bottom */}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/join" element={<JoinMeeting />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/meeting/:roomId" element={<VideoMeet />} />
        </Routes>
      </main>

      {/* Hide Landing Footer inside Meeting */}
      {!isMeetingPage && <Footer />}
    </div>
  );
}

export default App;
