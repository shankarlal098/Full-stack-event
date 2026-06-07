export default function OutputPanel({ output }) {

  return (

    <div className="bg-base-200 border border-cyan-500 rounded-2xl p-5 shadow-xl">

      {/* TITLE */}

      <h2 className="text-2xl font-bold text-cyan-400 mb-4">
        Output
      </h2>

      {/* OUTPUT BOX */}

      <pre className="bg-black text-green-400 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap min-h-[120px]">

        {output || "Run your code to see output..."}

      </pre>

    </div>

  );

}