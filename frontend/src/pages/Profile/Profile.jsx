import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate("/");
  };

  return (
    <section className='settings-layout'>
      <div className='forms'>
        <h2>Zmień nazwę konta</h2>
        <form>
          <label htmlFor='nickname'>
            <input
              type='text'
              id='nickname'
              name='nickname'
              placeholder='Nazwa'
              // value={nickname}
              // onChange={onChange}
            />
            <p>Podaj nową nazwę</p>
          </label>
          {/* {displayError ? (
          <div className='error'>
            <div className='error-info'>
              <GoInfo />
              {message}
            </div>
            <span className='close-error' onClick={onClose}>
              <GoX />
            </span>
          </div>
        ) : (
          ""
        )} */}
          <button type='submit'>Zapisz</button>
        </form>
        <div className='buttons'>
          <button className='goback' onClick={goBack}>
            Wróć
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
