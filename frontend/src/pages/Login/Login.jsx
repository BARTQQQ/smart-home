import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <main className='user-login'>
      <form>
        <label htmlFor='email'>
          <input type='email' id='email' name='email' required />
          <p>Email</p>
        </label>
        <label htmlFor='password'>
          <input type='password' id='password' name='password' required />
          <p>Password</p>
        </label>
        <button type='submit'>Login</button>
      </form>
      <p className='link'>
        Have an accout? <Link to='/register'>register</Link>
      </p>
    </main>
  );
}

export default Login;
