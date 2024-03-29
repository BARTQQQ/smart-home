import React from "react";
import { GoAlert, GoX } from "react-icons/go";

function Error({ display, message, onClose }) {
  return (
    <>
      {display && (
        <div className='error'>
          <div className='info'>
            <GoAlert />
            {message}
          </div>
          <span className='close' onClick={onClose}>
            <GoX />
          </span>
        </div>
      )}
    </>
  );
}

export default Error;
