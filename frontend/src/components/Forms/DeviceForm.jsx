import React from "react";

function DeviceForm() {
  return (
    <section className='form-layout'>
      <div className='forms'>
        <h2>Nowe urządzenie (włącz/wyłącz)</h2>
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
          <label htmlFor='nickname'>
            <input
              type='text'
              id='nickname'
              name='nickname'
              placeholder='Nazwa'
              // value={nickname}
              // onChange={onChange}
            />
            <p>Podaj nazwe urządzenia</p>
          </label>
          <label htmlFor='nickname'>
            <input
              type='text'
              id='nickname'
              name='nickname'
              placeholder='Nazwa pomieszczenie'
              // value={nickname}
              // onChange={onChange}
            />
            <p>Pomieszczenie urządzenia</p>
          </label>
          <button type='submit'>Dodaj</button>
        </form>
      </div>
    </section>
  );
}

export default DeviceForm;
