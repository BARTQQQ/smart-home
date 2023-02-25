import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../features/event/eventSlice";
import Events from "../../components/Events/Events";
// import GroupedEvents from "../../components/Events/GroupedEvents/GroupedEvents";
import Event from "../../components/Events/Event/Event";

import ReactLoading from "react-loading";

import "./dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();

  const { events, state } = useSelector((state) => state.event);
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date.split(".").reverse().join("-"));
    const dateB = new Date(b.date.split(".").reverse().join("-"));
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const groupEvents = sortedEvents.reduce((group, event) => {
    const { date } = event;
    group[date] = group[date] || [];
    group[date].push(event);
    return group;
  }, {});

  const today = new Date();
  const tomorrow = new Date(
    today.getTime() + 24 * 60 * 60 * 1000
  ).toLocaleDateString();
  const yesterday = new Date(
    today.getTime() - 24 * 60 * 60 * 1000
  ).toLocaleDateString();

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

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
        <div className='all-events'>
          <div className='header'>
            <h3>Wszystkie notatki</h3>
          </div>
          <div className='filter'>
            <label htmlFor='sortOrder'>Sortuj:</label>
            <select id='sortOrder' onChange={toggleSortOrder}>
              <option value='descending'>Od najnowszych</option>
              <option value='ascending'>Od najstarszych</option>
            </select>
          </div>
          <div className='all-events-list'>
            {state === "succeeded" ? (
              Object.entries(groupEvents).map(([date, events]) => (
                <>
                  <h4>
                    {date}
                    {today.toLocaleDateString() === date ? (
                      <p>(Dziś)</p>
                    ) : tomorrow === date ? (
                      <p>(Jutro)</p>
                    ) : yesterday === date ? (
                      <p>(Wczoraj)</p>
                    ) : (
                      ""
                    )}
                  </h4>
                  {events.map((event, id) => (
                    <Event key={id} data={event} />
                  ))}
                </>
              ))
            ) : (
              <div class='loading'>
                <ReactLoading
                  className='loading'
                  type='bubbles'
                  color='#cfcfcf'
                />
              </div>
            )}
          </div>
        </div>
      </aside>
    </main>
  );
}

export default Dashboard;
