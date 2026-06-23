import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorkes";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden">
      {/* Soft Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-500 opacity-20 blur-[180px] rounded-full z-0"></div>

      {/* Soft Right Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500 opacity-20 blur-[150px] rounded-full z-0"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="pt-32 px-5">
          <Hero />
        </div>

        <Features />
        <HowItWorks />
        <CTA />

        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
