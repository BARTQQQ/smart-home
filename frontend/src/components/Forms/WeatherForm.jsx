import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCity } from "../../features/city/citySlice";
import { getCity } from "../../features/city/citySlice";
import Error from "../../components/Error/Error";
// import { useNavigate } from "react-router-dom";

function WeatherForm() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCity());
  }, []);

  const { status } = useSelector((state) => state.weather);
  const { city } = useSelector((state) => state.city);

  const [displayError, setDisplayError] = useState(false);
  const [localCity, setLocalCity] = useState(city ? city.city : "");

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
    <section className='form-layout'>
      <div className='forms'>
        <h2>Ustawienia pogody</h2>

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
      </div>
    </section>
  );
}
export default WeatherForm;
