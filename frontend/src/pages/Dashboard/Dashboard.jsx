import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../features/event/eventSlice";
import Events from "../../components/Events/Events";
import "./dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();

  const { events, state } = useSelector((state) => state.event);

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
