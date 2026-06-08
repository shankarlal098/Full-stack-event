import { useState } from "react";
import RoomJoin from "../components/room/RoomJoin";
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  // JOIN ROOM
  function joinRoom() {
    if (!room.trim()) return;
    navigate(`/room/${room}`);
  }
  // CREATE ROOM
  function createRoom() {
    const randomRoom = Math.random()
      .toString(36)
      .substring(2, 8);
    navigate(`/room/${randomRoom}`);
  }
  return (
    <div className="min-h-screen bg-base-300 text-white p-5">
      {/* APP TITLE */}
      <h1 className="text-4xl font-bold mb-6 text-cyan-400">
        CodeTogether
      </h1>
      <RoomJoin
        room={room}
        setRoom={setRoom}
        joinRoom={joinRoom}
        createRoom={createRoom}
      />

    </div>
  );
}





//  undersant the replace button bhai and bhai ab leetcode ko bhi fir se strtt kr or deply kr usko
// yarr important hai bhai vo karna bhai 