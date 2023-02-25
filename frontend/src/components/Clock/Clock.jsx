import React, { useEffect, useState } from "react";
import "./clock.css";

function Clock() {
  const [time, setTime] = useState(new Date());

  const currentHour = String(time.getHours()).padStart(2, "0");
  const currentMinute = String(time.getMinutes()).padStart(2, "0");

  const now = new Date();
  const todayDate = now.toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='clock'>
      <div className='current-time'>
        {currentHour}
        <span>:</span>
        {currentMinute}
      </div>
      <div className='today-date'>{todayDate}</div>
    </div>
  );
}

export default Clock;
