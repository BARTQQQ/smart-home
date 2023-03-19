import { useState, useEffect } from "react";
import { HiLightBulb } from "react-icons/hi";
import { BsMoonStars } from "react-icons/bs";
import { GiOpenGate } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { setState } from "../../features/device/deviceSlice";
import "./style.css";
import { socket } from "../../App";

function Thing({ key, gpio, name, state, type }) {
  const dispatch = useDispatch();

  const [currentState, setCurrentState] = useState(state);

  useEffect(() => {
    socket.on("getState", (data) => {
      if (data.gpio === gpio) {
        setCurrentState(data.state);
      }
    });

    socket.on("dusk", (data) => {
      if (data.gpio === gpio) {
        setCurrentState(data.state);
      }
    });
  }, [gpio]);

  const handleStateToggle = () => {
    const newState = !currentState;
    const stateString = newState.toString();
    setCurrentState(newState);
    const deviceData = {
      gpio,
      stateString,
      type,
    };
    socket.emit("sendState", { gpio, state: newState, type });
    dispatch(setState(deviceData));
  };

  return (
    <button
      className={
        "box " +
        (currentState ? "box-on " : "") +
        (type === "dusk" ? "dusk " : "")
      }
      onClick={handleStateToggle}
      disabled={type === "dusk" ? true : false}>
      <div className='icon'>
        <span className={currentState ? "on" : "off"}>
          {type === "dusk" ? (
            <BsMoonStars />
          ) : type === "servo" ? (
            <GiOpenGate />
          ) : (
            <HiLightBulb />
          )}
        </span>
      </div>
      <div className='details'>
        <p>{name}</p>
      </div>
    </button>
  );
}

export default Thing;
