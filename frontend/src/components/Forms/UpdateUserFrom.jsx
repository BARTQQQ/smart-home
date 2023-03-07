import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";
import Success from "../Success/Success";
import Error from "../Error/Error";

function UpdateUserFrom() {
  const dispatch = useDispatch();
  const { state, error, success, user } = useSelector((state) => state.auth);
  console.log(error, success, user);

  const [displayError, setDisplayError] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    nickname: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, surname, nickname, email, password, password2 } = formData;

  useEffect(() => {
    if (state === "error" && error !== null) {
      setDisplaySuccess(false);
      setDisplayError(true);

      setMessage(<div>{error}</div>);
    }
    if (state === "succeeded" && success !== null) {
      setDisplayError(false);
      setDisplaySuccess(true);

      setMessage(<div>{success && success}</div>);
    }
  }, [dispatch, error, state, success]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setDisplaySuccess(false);
      setMessage(<div>Hasła nie pasują do siebie</div>);
      setDisplayError(true);
    } else {
      const userData = {
        id: user.id,
        name,
        surname,
        nickname,
        email,
        password,
      };
      console.log(userData);
      dispatch(updateUser(userData));
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
        <h2>Aktualizacja konta</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor='name'>
            <input
              type='text'
              id='name'
              name='name'
              placeholder={user.name}
              value={name}
              onChange={onChange}
            />
            <p>Imię</p>
          </label>
          <label htmlFor='surname'>
            <input
              type='text'
              id='surname'
              name='surname'
              placeholder={user.surname}
              value={surname}
              onChange={onChange}
            />
            <p>Nazwisko</p>
          </label>
          <label htmlFor='nickname'>
            <input
              type='nickname'
              id='nickname'
              name='nickname'
              placeholder={user.nickname}
              value={nickname}
              onChange={onChange}
            />
            <p>Nazwa konta</p>
          </label>
          <label htmlFor='email'>
            <input
              type='email'
              id='email'
              name='email'
              placeholder={user.email}
              value={email}
              onChange={onChange}
            />
            <p>Email</p>
          </label>
          <label htmlFor='password'>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
            />
            <p>Hasło</p>
          </label>
          <label htmlFor='password2'>
            <input
              type='password'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
            />
            <p>Powtórz hasło</p>
          </label>
          <Error message={message} display={displayError} onClose={onError} />
          <Success
            message={message}
            display={displaySuccess}
            onClose={onSuccess}
          />
          <button type='submit'>Zapisz</button>
        </form>
      </div>
    </section>
  );
}

export default UpdateUserFrom;
