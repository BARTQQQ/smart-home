import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate("/");
  };

  return (
    <section className='settings-layout'>
      <div className='forms'>form</div>
      <div className='buttons'>
        <button className='save'>Zapisz</button>
        <button className='goback' onClick={goBack}>
          Wróć
        </button>
      </div>
    </section>
  );
}

export default Settings;
