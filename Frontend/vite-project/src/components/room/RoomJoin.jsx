export default function RoomJoin({
  room,
  setRoom,
  joinRoom ,
  createRoom
}) {

  return (

    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl border border-cyan-500">
          <div className="card-body">
            {/* TITLE */}
            <h2 className="text-3xl font-bold text-center text-cyan-400">
              Join Code Room
            </h2>
            <p className="text-center text-gray-400 mb-4">
              Collaborate and code in realtime
            </p>
            {/* USERNAME */}
            {/* ROOM */}
            <input
              type="text"
              placeholder="Enter Room ID"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="input input-bordered w-full mt-3"
            />
            {/* BUTTON */}
            <button
              onClick={joinRoom}
              className="btn btn-primary mt-5"
            >
              Join Room
            </button>
            <button
              onClick={createRoom}
              className="btn btn-outline btn-info w-full"
            >
              Create Random Room
            </button>
          </div>
      </div>
    </div>

  );

}