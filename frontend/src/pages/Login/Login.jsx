import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import Error from "../../components/Error/Error";
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
  console.log(state, displayError);
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
          <p>Nazwa konta</p>
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
        <Error message={message} display={displayError} onClose={onClose} />
        <button type='submit'>Zaloguj</button>
      </form>
    </main>
  );
}

export default Login;
