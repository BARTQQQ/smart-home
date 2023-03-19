import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GoTrashcan } from "react-icons/go";
import { deleteEvent, updateEvent } from "../../../features/event/eventSlice";
import { socket } from "../../../App";
import "./event.css";

function Event(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBroadcastDeleteEvent = (eventData) => {
      console.log(eventData);
      dispatch(updateEvent(eventData));
    };

    socket.on("broadcastDeleteEvent", handleBroadcastDeleteEvent);

    return () => {
      socket.off("broadcastDeleteEvent", handleBroadcastDeleteEvent);
    };
  }, [dispatch]);

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
