import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import VideoMeet from "./pages/VideoMeet";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      {/* grow → pushes footer to bottom */}
      <main className="grow pt-20">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />

          <Route path="/meeting/:roomId" element={<VideoMeet />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
