import React, { useEffect, useState } from "react";
import "./clock.css";

function Clock() {
  const [time, setTime] = useState(new Date());

  const currentHour = time.getHours();
  const currentMinute = String(time.getMinutes()).padStart(2, "0");

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='current-time'>
      {currentHour}
      <span>:</span>
      {currentMinute}
    </div>
  );
}

export default Clock;
