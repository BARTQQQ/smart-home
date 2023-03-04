import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import Success from "../Success/Success";
import Error from "../Error/Error";

function CreateUserForm() {
  const dispatch = useDispatch();
  const { state, error, success } = useSelector((state) => state.auth);
  console.log(error, success);

  const [displayError, setDisplayError] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
  });

  const { nickname, email, password } = formData;

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

    if (!nickname || !email || !password) {
      setDisplaySuccess(false);
      setMessage(<div>Wypełnij wszystkie pola</div>);
      setDisplayError(true);
    } else {
      const userData = {
        nickname,
        email,
        password,
      };
      dispatch(register(userData));
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
        <h2>Nowy urzytkownik</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor='nickname'>
            <input
              type='text'
              id='nickname'
              name='nickname'
              placeholder='Nazwa konta'
              value={nickname}
              onChange={onChange}
            />
            <p>Nazwa konta</p>
          </label>
          <label htmlFor='email'>
            <input
              type='text'
              id='email'
              name='email'
              placeholder='Email'
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
              placeholder='Hasło'
              value={password}
              onChange={onChange}
            />
            <p>Hasło</p>
          </label>
          <Error message={message} display={displayError} onClose={onError} />
          <Success
            message={message}
            display={displaySuccess}
            onClose={onSuccess}
          />
          <button type='submit'>Utwórz</button>
        </form>
      </div>
    </section>
  );
}

export default CreateUserForm;
