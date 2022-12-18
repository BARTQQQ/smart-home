import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../features/event/eventSlice";
import Events from "../../components/Events/Events";
import "./dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();

  const { events, state } = useSelector((state) => state.event);

  // events.map((event) => {
  //   const input = event.date;
  //   const parts = input.split(".");
  //   const reversed = parts.reverse();
  //   const output = reversed.join(".");

  //   let array = [];
  //   array.push(output);
  // });
  // if (state === "succeeded") {
  //   const sortedDates = events.sort((a, b) => {
  //     const dateA = new Date(a.date);
  //     const dateB = new Date(b.date);

  //     return dateA - dateB;
  //   });
  //   console.log(sortedDates);
  // }

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <main>
      <section className='things'></section>
      <aside className='things-details'>
        <h2>Details</h2>
      </aside>
      <aside className='event-wrapper'>
        <Events data={events} />
        <div>Nadchodzące</div>
      </aside>
    </main>
  );
}

export default Dashboard;
