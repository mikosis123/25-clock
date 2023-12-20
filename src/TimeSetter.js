import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const TimeSetter = ({ time, setTime, min, max, interval, type }) => {
  return (
    <div className="adjustable">
      <button
        onClick={() => (time > min ? setTime(time - interval) : null)}
        id={`${type}-decrement`}
      >
        <FaArrowDown />
      </button>
      <span id={`${type}-length`} className="timer">
        {time / interval}
      </span>
      <button
        onClick={() => (time < max ? setTime(time + interval) : null)}
        id={`${type}-increment`}
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default TimeSetter;
