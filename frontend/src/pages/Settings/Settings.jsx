import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TbLamp, TbLampOff } from "react-icons/tb";
import { BsCloudSunFill } from "react-icons/bs";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdPersonAdd, MdPersonRemove } from "react-icons/md";

function Settings() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const goBack = () => {
    navigate("/");
  };

  return (
    <section className='settings-layout'>
      <div className='forms'>
        {user && user.nickname === "admin" ? (
          <>
            <h2>Panel administratora</h2>
            <div className='form-links'>
              <span className='link-to-form'>
                <Link to='/opcje/ustawienia/dodaj-uzytkownika'>
                  Nowy użytkownik
                  <MdPersonAdd />
                </Link>
              </span>
              <span className='link-to-form'>
                <Link to='/opcje/ustawienia/usun-uzytkownika'>
                  Usuń użytkownika
                  <MdPersonRemove />
                </Link>
              </span>
              <span className='link-to-form'>
                <Link to='/opcje/ustawienia/dodaj'>
                  Dodaj
                  <TbLamp />
                </Link>
              </span>
              <span className='link-to-form'>
                <Link to='/opcje/ustawienia/usun'>
                  Usuń
                  <TbLampOff />
                </Link>
              </span>
              <span className='link-to-form'>
                <Link to='/opcje/ustawienia/pogoda'>
                  Pogoda
                  <BsCloudSunFill />
                </Link>
              </span>
            </div>
          </>
        ) : (
          ""
        )}
        <h2>Profil</h2>
        <div className='form-links'>
          <span className='link-to-form'>
            <Link to='/opcje/profil/nazwa'>
              Edycja konta
              <MdDriveFileRenameOutline />
            </Link>
          </span>
          {/* <span className='link-to-form'>
            <Link to='/opcje/usun'>Profilowe</Link>
          </span> */}
        </div>
        <div className='buttons'>
          <button onClick={goBack}>Wróć</button>
        </div>
      </div>
    </section>
  );
}

export default Settings;
