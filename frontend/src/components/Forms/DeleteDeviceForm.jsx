import React from "react";

function DeleteDeviceForm() {
  return (
    <section className='form-layout'>
      <div className='forms'>
        <h2>Usuń urządzenie</h2>
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
      </div>
    </section>
  );
}
export default DeleteDeviceForm;
