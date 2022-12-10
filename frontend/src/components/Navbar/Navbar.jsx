import React from "react";
import { Link } from "react-router-dom";
import Clock from "../Clock/Clock";
import { GoPerson, GoSettings, GoSignOut } from "react-icons/go";
import "./nav.css";

function Navbar() {
  const now = new Date();
  const todayDate = now.toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <nav>
      <section className='user'>
        <div className='container'>
          <p>Witaj</p>
          <p>Bartosz</p>
        </div>
      </section>
      <section className='date'>
        <div className='container'>
          <Clock />
          <div className='today-date'>{todayDate}</div>
        </div>
      </section>
      <section className='settings'>
        <div className='container'>
          <div className='btn user-setting'>
            <Link to='/profile'>
              <GoPerson />
              <p>Profil</p>
            </Link>
          </div>
          <div className='btn app-setting'>
            <Link to='/settings'>
              <GoSettings />
              <p>Opcje</p>
            </Link>
          </div>
        </div>
      </section>
      <section className='logout'>
        <div className='container'>
          <div className='btn user-logout'>
            <GoSignOut />
            <p>Wyjdź</p>
          </div>
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
