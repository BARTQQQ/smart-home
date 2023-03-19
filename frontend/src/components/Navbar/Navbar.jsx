import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GoHome, GoSettings, GoSignOut } from "react-icons/go";
import { logout } from "../../features/auth/authSlice";
import Clock from "../Clock/Clock";
import Weather from "../Weather/Weather";
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

  return (
    <nav>
      <section className='user'>
        <div className='container'>
          <p>Witaj</p>
          <p>{user && user.nickname}</p>
        </div>
      </section>
      <section className='date-weather'>
        <Clock />
        <Weather />
      </section>
      <section className='settings'>
        <div className='container'>
          <div className='btn panel'>
            <Link to='/'>
              <GoHome />
              <p>Panel</p>
            </Link>
          </div>
          <div className='btn app-setting'>
            <Link to='/opcje'>
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
