import { FaPlay, FaPause, FaUndo } from "react-icons/fa";

const Display = ({ displayState, reset, startStop }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes.toString() : minutes}:${
      seconds < 10 ? "0" + seconds.toString() : seconds
    }`;
  };
  return (
    <div className="display">
      <h4 id="timer-label">{displayState.timeType}</h4>
      <span
        id="time-left"
        style={{ color: displayState.timerRunning ? "red" : "black" }}
      >
        {formatTime(displayState.time)}
      </span>
      <div>
        <button id="start_stop" onClick={() => startStop(displayState)}>
          {displayState.timerRunning ? <FaPause /> : <FaPlay />}
        </button>
        <button id="reset" onClick={reset}>
          <FaUndo />
        </button>
      </div>
    </div>
  );
};

export default Display;
