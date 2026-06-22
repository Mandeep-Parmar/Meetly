import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed py-3 top-0 w-full z-50 border-b bg-zinc-950/80 backdrop-blur-md border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="meetly-logo.png" alt="logo" className="w-36" />
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition">
            Join as Guest
          </button>

          <button className="px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition">
            Register
          </button>

          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:opacity-90 transition shadow-lg shadow-purple-500/20">
            Login
          </button>
        </div>

        {/* Mobile Hamburger  */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-white/10 px-6 py-6 flex flex-col gap-4 shadow-2xl shadow-black/80">
            <button className="w-full px-4 py-2.5 rounded-full bg-white/10 text-white text-center hover:bg-white/20 transition">
              Join as Guest
            </button>

            <button className="w-full px-4 py-2.5 rounded-full bg-white/10 text-white text-center hover:bg-white/20 transition">
              Register
            </button>

            <button className="w-full px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center font-medium hover:opacity-90 transition">
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
