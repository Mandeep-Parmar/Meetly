import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from "../assets/meetly-logo.png";

const Footer = () => {
  return (
    <footer className="px-6 border-t border-white/10 bg-gradient-to-b from-zinc-950 to-black">
      <div className="max-w-7xl mx-auto py-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo" className="w-28" />
            </div>

            <p className="mt-4 text-gray-400 max-w-sm">
              Connecting people with seamless video communication.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://github.com/Mandeep-Parmar"
                target="_blank"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-white/5 transition"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/mandeep-p-b44930327/"
                target="_blank"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-white/5 transition"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="mailto:mandeeppar07@gmail.com"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-white/5 transition"
              >
                <MdEmail size={18} />
              </a>
            </div>
          </div>

          {/* Right  */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            {/* PRODUCT */}
            <div>
              <h4 className="text-gray-500 tracking-widest text-xs mb-4">
                PRODUCT
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Changelog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h4 className="text-gray-500 tracking-widest text-xs mb-4">
                COMPANY
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="text-gray-500 tracking-widest text-xs mb-4">
                LEGAL
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Meetly, Inc. All rights reserved.</p>

          <p>
            Made with <span className="text-purple-400">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
