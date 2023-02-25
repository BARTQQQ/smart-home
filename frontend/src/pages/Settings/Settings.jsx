import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCity } from "../../features/city/citySlice";
import Error from "../../components/Error/Error";
import { getCity } from "../../features/city/citySlice";

function WeatherForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.weather);
  const { city } = useSelector((state) => state.city);

  const [displayError, setDisplayError] = useState(false);
  const [localCity, setLocalCity] = useState(city.city);

  const inputChange = (e) => {
    setLocalCity(e.target.value);
  };

  const setCity = (e) => {
    e.preventDefault();
    dispatch(updateCity({ city: localCity }));
    setDisplayError(false);
  };

  const onClose = () => {
    setDisplayError(false);
  };

  let message;

  if (status === "Rejected") {
    message = <div>Błędna nazwa miasta</div>;
  }

  return (
    <form onSubmit={setCity}>
      <label htmlFor='city'>
        <input
          type='text'
          id='city'
          name='city'
          placeholder='Miasto'
          value={localCity}
          onChange={inputChange}
        />
        <p>Podaj nazwę miasta</p>
      </label>
      <Error message={message} display={displayError} onClose={onClose} />
      <button type='submit'>Zapisz</button>
    </form>
  );
}

function DeviceForm() {
  return (
    <form>
      <label htmlFor='nickname'>
        <input
          type='text'
          id='nickname'
          name='nickname'
          placeholder='GPIO pin'
          // value={nickname}
          // onChange={onChange}
        />
        <p>Podaj numer pinu GPIO</p>
      </label>
      <label htmlFor='nickname'>
        <input
          type='text'
          id='nickname'
          name='nickname'
          placeholder='Nazwa'
          // value={nickname}
          // onChange={onChange}
        />
        <p>Podaj nazwe urządzenia</p>
      </label>
      <label htmlFor='nickname'>
        <input
          type='text'
          id='nickname'
          name='nickname'
          placeholder='Nazwa pomieszczenie'
          // value={nickname}
          // onChange={onChange}
        />
        <p>Pomieszczenie urządzenia</p>
      </label>
      <button type='submit'>Dodaj</button>
    </form>
  );
}

function DeleteDeviceForm() {
  return (
    <form>
      <label htmlFor='nickname'>
        <input
          type='text'
          id='nickname'
          name='nickname'
          placeholder='GPIO pin'
          // value={nickname}
          // onChange={onChange}
        />
        <p>Podaj numer pinu GPIO</p>
      </label>
      <button type='submit'>Usuń</button>
    </form>
  );
}

function Settings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate("/");
  };

  return (
    <section className='settings-layout'>
      <div className='forms'>
        <h2>Nowe urządzenie (włącz/wyłącz)</h2>
        <DeviceForm />
        <h2>Usuń urządzenie</h2>
        <DeleteDeviceForm />
        <h2>Ustawienia pogody</h2>
        <WeatherForm />
        <div className='buttons'>
          <button className='goback' onClick={goBack}>
            Wróć
          </button>
        </div>
      </div>
    </section>
  );
}

export default Settings;
