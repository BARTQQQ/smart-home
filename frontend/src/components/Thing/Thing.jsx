import { useState } from "react";
// import { IoIosPower } from "react-icons/io";
import { HiLightBulb } from "react-icons/hi";
import "./style.css";

function Thing({ dusk, name, state }) {
  const [currentState, setCurrentState] = useState(state);

  const handleStateToggle = () => {
    setCurrentState(!currentState);
  };

  return (
    <div
      className={"box " + (currentState ? "box-on" : "")}
      onClick={handleStateToggle}>
      <div className='icon'>
        <span className={currentState ? "on" : "off"}>
          <HiLightBulb />
        </span>
      </div>
      <div className='details'>
        <p>{name}</p>
      </div>
      {/* <div className='state'>
        {dusk ? (
          ""
        ) : (
          <span className={currentState ? "on" : "off"}>
            <IoIosPower />
          </span>
        )}
      </div> */}
    </div>
  );
}

export default Thing;
