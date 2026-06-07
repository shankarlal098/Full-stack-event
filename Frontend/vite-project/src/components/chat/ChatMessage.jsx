export default function ChatMessage({ msg }) {

  return (
    <div className="bg-base-300 rounded-xl p-3 break-words">
      {/* USERNAME */}
      <p className="text-cyan-400 text-sm font-semibold mb-1">
        {msg.username}
      </p>
      {/* MESSAGE */}
      <p className="text-sm text-white leading-relaxed">
        {msg.text}
      </p>
    </div>
  );

}