import React from "react";
import { GoInfo, GoX } from "react-icons/go";

function Error({ display, message, onClose }) {
  return (
    <>
      {display && (
        <div className='error'>
          <div className='error-info'>
            <GoInfo />
            {message}
          </div>
          <span className='close-error' onClick={onClose}>
            <GoX />
          </span>
        </div>
      )}
    </>
  );
}

export default Error;
