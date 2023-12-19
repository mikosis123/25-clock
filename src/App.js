import { useState, useEffect } from "react";
import "./App.css";
import Display from "./Display";
import TimeSetter from "./TimeSetter";

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60;
const max = 60 * 60;
const interval = 60;

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState({
    time: sessionTime,
    timeType: "Session",
    timerRunning: false,
  });

  useEffect(() => {
    let timerID = "";
    if (!displayState.timerRunning) return;

    if (displayState.timerRunning) {
      timerID = window.setInterval(decrementDisplay, 1000);
    }

    return () => {
      window.clearInterval(timerID);
    };
  }, [displayState.timerRunning]);

  useEffect(() => {
    if (displayState.time === 0) {
      setDisplayState((prev) => ({
        ...prev,
        timeType: prev.timeType === "Session" ? "Break" : "Session",
        time: prev.timeType === "Session" ? breakTime : sessionTime,
      }));
    }
  }, [displayState, breakTime, sessionTime]);

  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: "Session",
      timerRunning: false,
    });
  };

  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning,
    }));
  };

  const changeBreakTime = (time) => {
    if (displayState.timerRunning) return;
    setBreakTime(time);
  };

  const decrementDisplay = () => {
    setDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1,
    }));
  };

  const changeSessionTime = (time) => {
    if (displayState.timerRunning) return;
    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: "Session",
      timerRunning: false,
    });
  };

  return (
    <div className="clock">
      <div className="setters">
        <div className="break">
          <h4 id="break-label">Break Length</h4>
          <TimeSetter
            time={breakTime}
            setTime={changeBreakTime}
            min={min}
            max={max}
            interval={interval}
            type="break"
          />
        </div>
        <div className="session">
          <h4 id="session-label">Session Length</h4>
          <TimeSetter
            time={sessionTime}
            setTime={changeSessionTime}
            min={min}
            max={max}
            interval={interval}
            type="session"
          />
        </div>
      </div>
      <Display
        displayState={displayState}
        reset={reset}
        startStop={startStop}
      />
    </div>
  );
}

export default App;
