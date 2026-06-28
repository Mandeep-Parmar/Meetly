import React from "react";
import { X } from "lucide-react";

const ChatPanel = ({ showChat, setShowChat }) => {
  return (
    // inset-0 is a utility class that sets the top, right, bottom, and left CSS properties of a positioned element to 0px simultaneously
    <div className="fixed inset-0 z-50 bg-[#111118] flex flex-col md:relative md:inset-auto md:w-[360px] md:border-l md:border-white/10">
      {/* Header  */}
      <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-xl font-semibold">In-call messages</h2>

        <button
          onClick={() => setShowChat(!showChat)}
          className="text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto"></div>

      {/* Input */}

      <div className="border-t border-white/10 p-4">
        <input
          type="text"
          placeholder="Send a message..."
          className="w-full h-12 rounded-xl bg-[#1B1B25] px-4 outline-none border border-white/5 focus:border-purple-500"
        />
      </div>
    </div>
  );
};

export default ChatPanel;
