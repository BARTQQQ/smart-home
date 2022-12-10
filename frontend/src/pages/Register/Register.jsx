import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <main className='user-register'>
      <form>
        <label htmlFor='name' data-type='name'>
          <input type='text' id='name' name='name' required />
          <p>Name</p>
        </label>
        <label htmlFor='surrname' data-type='surrname'>
          <input type='text' id='surrname' name='surrname' required />
          <p>Surrname</p>
        </label>
        <label htmlFor='email'>
          <input type='email' id='email' name='email' required />
          <p>Email</p>
        </label>
        <label htmlFor='password'>
          <input type='password' id='password' name='password' required />
          <p>Password</p>
        </label>
        <label htmlFor='password2'>
          <input type='password' id='password2' name='password2' required />
          <p>Confirm password</p>
        </label>
        <button type='submit'>Register</button>
      </form>
      <p className='link'>
        Have an accout? <Link to='/login'>login</Link>
      </p>
    </main>
  );
}

export default Register;
