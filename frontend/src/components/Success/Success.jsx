import React from "react";
import { GoCheck, GoX } from "react-icons/go";

function Success({ display, message, onClose }) {
  return (
    <>
      {display && (
        <div className='success'>
          <div className='info'>
            <GoCheck />
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

export default Success;
