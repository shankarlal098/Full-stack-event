export default function RunButton({ runButton, runCode  }) {

  const isRunning = runButton === "Running...";

  return (

    <button
      onClick={runCode}
      disabled={isRunning}
      className={`btn btn-primary min-w-[130px] ${
        isRunning ? "btn-disabled" : ""
      }`}
    >

      {
        isRunning && (
          <span className="loading loading-spinner loading-sm"></span>
        )
      }

      {runButton}

    </button>

  );

}