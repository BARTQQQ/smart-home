import React, { useState, useEffect } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import "./events.css";

// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

function Events() {
  const [current, setCurrent] = useState(new Date());

  const getMonthName = () => {
    const getMonthName = current.toLocaleString("default", { month: "long" });
    const getMonthNameToUpperCase =
      getMonthName.charAt(0).toUpperCase() + getMonthName.slice(1);
    return getMonthNameToUpperCase;
  };

  let previousMonth = async () => {
    setCurrent(new Date(current.setMonth(current.getMonth() - 1)));
  };

  let nextMonth = async () => {
    setCurrent(new Date(current.setMonth(current.getMonth() + 1)));
  };

  return (
    <div className='events'>
      <header className='select-month'>
        <div className='arrow-left' onClick={previousMonth}>
          <GoChevronLeft className='icon arrow' />
        </div>
        <div className='header-date'>
          <p>{current.getDate()}</p>
          <p>{getMonthName()}</p>
          <p>{current.getFullYear()}</p>
        </div>
        <div className='arrow-right' onClick={nextMonth}>
          <GoChevronRight className='icon arrow' />
        </div>
      </header>
      <section className='events-list'>s </section>
      <section className='events-create'>
        <button>Dodaj</button>
      </section>
    </div>
  );
}

export default Events;
