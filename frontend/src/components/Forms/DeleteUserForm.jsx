import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUsers, reset } from "../../features/auth/authSlice";
import { GoCheck, GoX, GoTrashcan } from "react-icons/go";

function DeleteUserForm() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(reset());
    dispatch(getUsers());
  }, [dispatch]);

  const onDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className='list'>
      <table>
        <thead>
          <tr>
            <td className='name'>Imię</td>
            <td className='surrname'>Nazwisko</td>
            <td className='email'>Email</td>
            <td className='verify'>
              <span>
                <GoCheck />/<GoX />
              </span>
            </td>
            <td className='nickname'>Nazwa</td>
            <td className='created'>Utworzono</td>
            <td className='updated'>Zaktualizowano</td>
            <td className='option'>Opcja</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className='name'>{user.name ? user.name : <span>-</span>}</td>
              <td className='surrname'>
                {user.surname ? user.surname : <span>-</span>}
              </td>
              <td className='email'>{user.email}</td>
              <td className='verify'>
                {user.confirmedEmail ? (
                  <span className='yes'>
                    <GoCheck />
                  </span>
                ) : (
                  <span className='no'>
                    <GoX />
                  </span>
                )}
              </td>
              <td className='nickname'>{user.nickname}</td>
              <td className='created'>
                {new Date(user.createdAt).toLocaleString()}
              </td>
              <td className='updated'>
                {new Date(user.updatedAt).toLocaleString()}
              </td>
              <td className='option'>
                {user.nickname === "admin" ? (
                  ""
                ) : (
                  <button className='delete' onClick={() => onDelete(user._id)}>
                    <GoTrashcan />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeleteUserForm;
