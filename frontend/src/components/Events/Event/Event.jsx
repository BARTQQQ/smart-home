import React from "react";
import { useDispatch } from "react-redux";
import { GoTrashcan } from "react-icons/go";
import { deleteEvent } from "../../../features/event/eventSlice";
import "./event.css";

function Event(props) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteEvent(props.data._id));
  };
  return (
    <div className='event'>
      <div className='event-content'>
        <span>{props.data && props.data.user}</span>
        <p>{props.data.contents}</p>
      </div>
      <button className='delete' onClick={onDelete}>
        <GoTrashcan />
      </button>
    </div>
  );
}

export default Event;
