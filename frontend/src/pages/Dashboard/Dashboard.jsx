import React from "react";

import "./dashboard.css";

function Dashboard() {
  return (
    <main>
      <section className='things'></section>
      <aside className='things-details'>
        <h2>Details</h2>
      </aside>
      <aside className='list'>
        <h2>List</h2>
      </aside>
    </main>
  );
}

export default Dashboard;
