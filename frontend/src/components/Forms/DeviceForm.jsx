import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createDevice, reset } from "../../features/device/deviceSlice";
import Success from "../Success/Success";
import Error from "../Error/Error";

function DeviceForm() {
  const dispatch = useDispatch();
  const { state, error, success } = useSelector((state) => state.device);
  console.log(state, error, success);

  const [displayError, setDisplayError] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    gpio: "",
    name: "",
    type: "",
  });

  const { gpio, name, type } = formData;

  useEffect(() => {
    dispatch(reset());
    if (state === "error" && error !== null) {
      setDisplaySuccess(false);
      setDisplayError(true);

      setMessage(<div>{error}</div>);
    }
    if (state === "succeeded" && success !== null) {
      setDisplayError(false);
      setDisplaySuccess(true);

      setMessage(<div>{success && success.message}</div>);
    }
  }, [dispatch, error, state, success]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (!gpio || !name || !type) {
      setDisplaySuccess(false);
      setMessage(<div>Wypełnij wszystkie pola</div>);
      setDisplayError(true);
    } else {
      const deviceData = {
        gpio,
        name,
        type,
      };
      dispatch(createDevice(deviceData));
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onError = () => {
    setDisplayError(false);
  };

  const onSuccess = () => {
    setDisplaySuccess(false);
  };

  return (
    <section className='form-layout'>
      <div className='forms'>
        <h2>Nowe urządzenie</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor='gpio'>
            <input
              type='number'
              id='gpio'
              name='gpio'
              placeholder='GPIO pin'
              value={gpio}
              onChange={onChange}
            />
            <p>Podaj numer pinu GPIO</p>
          </label>
          <label htmlFor='name'>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Nazwa'
              value={name}
              onChange={onChange}
            />
            <p>Podaj nazwe urządzenia</p>
          </label>
          <label htmlFor='type'>
            <select value={type} name='type' onChange={onChange}>
              <option value='' disabled hidden>
                Wybierz typ
              </option>
              <option value='led'>Led</option>
              <option value='dusk'>Led z reakcją na światło</option>
              <option value='servo'>Serwo</option>
            </select>
            <p>Typ</p>
          </label>
          <Error message={message} display={displayError} onClose={onError} />
          <Success
            message={message}
            display={displaySuccess}
            onClose={onSuccess}
          />
          <button type='submit'>Dodaj</button>
        </form>
      </div>
    </section>
  );
}

export default DeviceForm;
