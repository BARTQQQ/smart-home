import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDevices, deleteDevice } from "../../features/device/deviceSlice";
import { GoCheck, GoX, GoTrashcan } from "react-icons/go";

function DeleteDeviceForm() {
  const dispatch = useDispatch();
  const { devices } = useSelector((state) => state.device);

  useEffect(() => {
    dispatch(getDevices());
  }, [dispatch]);

  const onDelete = (id) => {
    dispatch(deleteDevice(id));
  };

  return (
    <div className='list'>
      <table>
        <thead>
          <tr>
            <td className='pin'>Pin GPIO</td>
            <td className='room'>Pomieszczenie</td>
            <td className='type'>Typ</td>
            <td className='state'>Stan</td>
            <td className='option'>Opcja</td>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device._id}>
              <td className='pin'>{device.gpio}</td>
              <td className='room'>{device.name}</td>

              <td className='type'>
                {device.type === "dusk"
                  ? "Reakcja na światło"
                  : device.type === "led"
                  ? "Led"
                  : device.type === "servo"
                  ? "Serwo"
                  : ""}
              </td>
              <td className='state'>
                {device.state ? (
                  <span className='yes'>
                    <GoCheck />
                  </span>
                ) : (
                  <span className='no'>
                    <GoX />
                  </span>
                )}
              </td>
              <td className='option' onClick={() => onDelete(device._id)}>
                <button className='delete'>
                  <GoTrashcan />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default DeleteDeviceForm;
