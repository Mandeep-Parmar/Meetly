import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../public/meetly-logo.png";

const Navbar = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed py-5 top-0 w-full z-50 border-b bg-zinc-950/80 backdrop-blur-md border-white/10">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Left Side (Always Same) */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Meetly" className="w-36" />
          </Link>

          {/* Right Side (Desktop Actions) */}
          <div className="hidden md:flex">{children}</div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-72 bg-[#111118] border-l border-white/10">
            {/* Drawer Header */}
            <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
              <h2 className="text-xl font-semibold">Menu</h2>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            {/* Drawer Content */}
            <div onClick={() => setOpen(false)} className="p-6">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
