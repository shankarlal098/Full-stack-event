import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";


export default function ChatPanel({
  messages,
  message,
  setMessage,
  sendMessage
}) {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  return (
    <div className="w-[320px] h-[700px] bg-base-200 border border-cyan-500 rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="p-4 border-b border-cyan-500">
          <h2 className="text-2xl font-semibold text-cyan-400">
            Room Chat
          </h2>
        </div>
        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 ">
          {
            messages.map((msg, index) => (
               msg.system ? (
                  <div key={index}   className="text-center text-xs text-cyan-400 italic">
                    {msg.text}
                  </div>
               ) :
              <ChatMessage
                key={index}
                msg={msg}
              />
            ))
          }

         <div ref={bottomRef}></div>
        </div>
        {/* INPUT AREA */}
        <div className="p-4 border-t border-cyan-500 flex gap-2">
          <input
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input input-bordered input-info flex-1"
          />
          <button
            onClick={sendMessage}
            className="btn btn-info text-black"
          >
            Send
          </button>
        </div>
    </div>
  );

}