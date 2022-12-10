import React from "react";
import Events from "../../components/Events/Events";

import "./dashboard.css";

function Dashboard() {
  return (
    <main>
      <section className='things'></section>
      <aside className='things-details'>
        <h2>Details</h2>
      </aside>
      <aside className='event-wrapper'>
        <Events />
        <div>Nadchodzące</div>
      </aside>
    </main>
  );
}

export default Dashboard;
