import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../features/event/eventSlice";
import { getDevices } from "../../features/device/deviceSlice";
import Events from "../../components/Events/Events";
import Event from "../../components/Events/Event/Event";
import ChartTemperature from "../../components/ChartComponent/ChartTemperature";
import ChartHumidity from "../../components/ChartComponent/ChartHumidity";
import ReactLoading from "react-loading";
import "./dashboard.css";
import Thing from "../../components/Thing/Thing";

function Dashboard() {
  const dispatch = useDispatch();

  const { events, state } = useSelector((state) => state.event);
  const { devices } = useSelector((state) => state.device);
  const [sortOrder, setSortOrder] = useState("desc");
  const { temp, humidity } = useSelector((state) => state.device);
  const [t, setT] = useState(null);
  const [h, setH] = useState(null);

  let avgT = 0;
  let avgH = 0;

  if (temp && temp.length > 0) {
    for (let i = 0; i < temp.length; i++) {
      avgT += temp[i].temp;
    }
    avgT = avgT / temp.length;
    avgT = Number(avgT.toFixed(2));
  }

  if (humidity && humidity.length > 0) {
    for (let i = 0; i < humidity.length; i++) {
      avgH += humidity[i].humidity;
    }
    avgH = avgH / humidity.length;
    avgH = Number(avgH.toFixed(2));
  }

  useEffect(() => {
    if (temp && temp.length > 0) {
      setT(avgT);
    }

    if (humidity && humidity.length > 0) {
      setH(avgH);
    }
  }, [temp, humidity, avgH, avgT]);

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
    dispatch(getDevices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <main>
      <section className='things'>
        {devices.map((device) => (
          <Thing
            key={device._id}
            gpio={device.gpio}
            type={device.type}
            name={device.name}
            state={device.state}
          />
        ))}
      </section>
      <aside className='things-details'>
        <div className='chart'>
          <ChartTemperature />
          <ChartHumidity />
        </div>
        <div className='stats'>
          <span className='stats-header'>
            <h2>Średnie odczyty czujników z ostatnich 12h</h2>
          </span>
          <div className='temp'>
            <h3>Temperatura</h3>
            <p>{t}°C</p>
          </div>
          <div className='humidity'>
            <h3>Wilgotność</h3>
            <p>{h}%</p>
          </div>
        </div>
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
