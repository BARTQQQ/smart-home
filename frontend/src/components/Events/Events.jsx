import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoChevronLeft, GoChevronRight, GoPin } from "react-icons/go";
import { createEvent } from "../../features/event/eventSlice";
import ReactLoading from "react-loading";
import Event from "./Event/Event";
import "./events.css";

// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

function Events() {
  const dispatch = useDispatch();

  const { events, state } = useSelector((state) => state.event);

  const [contents, setContents] = useState("");
  const [current, setCurrent] = useState(new Date());

  const date = current.toLocaleDateString("default", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  let weekDays = [];
  let selectWeek = current.getDay();

  if (selectWeek === 0) {
    selectWeek = 7;
  }

  for (let i = 1; i <= 7; i++) {
    let day = new Date(2022, 7, i).toLocaleString("default", {
      weekday: "long",
    });
    let daysToUpperCase = day.charAt(0).toUpperCase() + day.slice(1);
    weekDays.push(daysToUpperCase.substring(0, 3));
  }

  let previousDays = async () => {
    setCurrent(new Date(current.setDate(current.getDate() - 1)));
  };

  let nextDays = async () => {
    setCurrent(new Date(current.setDate(current.getDate() + 1)));
  };

  const getMonthName = () => {
    const getMonthName = current.toLocaleString("default", { month: "long" });
    const getMonthNameToUpperCase =
      getMonthName.charAt(0).toUpperCase() + getMonthName.slice(1);
    return getMonthNameToUpperCase;
  };

  const onChange = (e) => {
    setContents(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const eventData = { contents, date };
    dispatch(createEvent(eventData));
    setContents("");
  };

  return (
    <div className='events'>
      <header className='select-month'>
        <div className='arrow-left' onClick={previousDays}>
          <GoChevronLeft className='icon arrow' />
        </div>
        <div className='header-date'>
          <p>{current.getDate()}</p>
          <p>{getMonthName()}</p>
          <p>{current.getFullYear()}</p>
        </div>
        <div className='arrow-right' onClick={nextDays}>
          <GoChevronRight className='icon arrow' />
        </div>
      </header>
      <section className='weekday'>
        {weekDays.map((day, i) => {
          return (
            <div
              key={i}
              className={"day " + (i + 1 === selectWeek ? "selected " : " ")}>
              {day}
            </div>
          );
        })}
      </section>
      <section className='events-list'>
        {state === "succeeded" ? (
          events.filter((event) => event.date.toString() === date).length >
          0 ? (
            events.map((event, id) => {
              if (event.date.toString() === date) {
                return <Event key={id} data={event} />;
              }
            })
          ) : (
            <div className='empty'>Brak notatek na dzisiaj</div>
          )
        ) : (
          <div class='loading'>
            <ReactLoading className='loading' type='bubbles' color='#cfcfcf' />
          </div>
        )}
      </section>
      <section className='events-create'>
        <textarea
          type='text'
          className='text'
          id='contents'
          name='contents'
          value={contents}
          placeholder='Aa'
          onChange={onChange}
        />
        <button onClick={onSubmit}>
          <GoPin />
        </button>
      </section>
    </div>
  );
}

export default Events;
