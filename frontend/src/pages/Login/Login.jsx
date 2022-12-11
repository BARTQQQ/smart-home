import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import { GoInfo, GoX } from "react-icons/go";
// import ReactLoading from "react-loading";

function Login() {
  const [displayError, setDisplayError] = useState(false);
  const [formData, setFormData] = useState({
    nickname: "",
    password: "",
  });

  const { nickname, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, state, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (state === "error") {
      setDisplayError(true);
    }

    if (state === "suceeded" || user) {
      navigate("/");
    }

    // dispatch(reset());
  }, [user, error, state, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setDisplayError(false);
    const userData = {
      nickname,
      password,
    };

    dispatch(login(userData));
  };

  const onClose = () => {
    setDisplayError(false);
  };

  let message;

  if (state === "error") {
    message = <div>{error[0]}</div>;
  }

  return (
    <main className='user-login'>
      <form onSubmit={onSubmit}>
        <label htmlFor='nickname'>
          <input
            type='text'
            id='nickname'
            name='nickname'
            value={nickname}
            onChange={onChange}
          />
          <p>Nickname</p>
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
        {displayError ? (
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
        )}
        <button type='submit'>Login</button>
      </form>
    </main>
  );
}

export default Login;
