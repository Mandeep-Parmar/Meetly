import React from "react";
import { X, Send } from "lucide-react";

const ChatPanel = ({
  showChat,
  setShowChat,
  message,
  setMessage,
  messages,
  sendMessage,
  username,
}) => {
  return (
    // inset-0 is a utility class that sets the top, right, bottom, and left CSS properties of a positioned element to 0px simultaneously
    <div className="fixed inset-0 z-50 bg-[#111118] flex flex-col md:relative md:inset-auto md:w-[380px] md:flex-shrink-0 md:border-l md:border-white/10">
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

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm mt-2">Start the conversation 👋</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.sender === username;

            return (
              <div
                key={index}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                {/* username */}
                <span className="mb-1 text-sm font-semibold text-purple-400">
                  {msg.sender}
                </span>

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 wrap-break-word ${
                    isMe
                      ? "bg-gradient-to-r from-purple-600 to-violet-500"
                      : "bg-[#1A1A28]"
                  }`}
                >
                  {msg.data}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}

      <div className="border-t border-white/10 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Send a message..."
            className="w-full h-12 rounded-2xl bg-[#1B1B25] px-4 outline-none border border-white/5 focus:border-purple-500 placeholder:text-gray-500"
          />

          <button
            onClick={sendMessage}
            className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-500 hover:scale-105 transition flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
