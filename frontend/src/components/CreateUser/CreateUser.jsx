import React from "react";
import { Link } from "react-router-dom";

function CreateUser() {
  return (
    <main className='user-create'>
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
        <button type='submit'>CreateUser</button>
      </form>
      <p className='link'>
        Have an accout? <Link to='/login'>login</Link>
      </p>
    </main>
  );
}

export default CreateUser;
