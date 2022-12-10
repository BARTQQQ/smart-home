import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GoPerson, GoSettings, GoSignOut } from "react-icons/go";
import { logout } from "../../features/auth/authSlice";
import Clock from "../Clock/Clock";
import "./nav.css";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
          <p>{user && user.nickname}</p>
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
          <div className='btn user-logout' onClick={onLogout}>
            <GoSignOut />
            <p>Wyjdź</p>
          </div>
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
