import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { reset, verify } from "../../features/auth/authSlice";

function VerfiyEmail() {
  let { nickname } = useParams();
  let { token } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState(null);
  const { state, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (state === "succeeded") {
      setIsVerified(true);
    }
    if (state === "error") {
      setIsVerified(false);
    }
  }, [state]);

  useEffect(() => {
    const verifyData = {
      nickname,
      token,
    };
    dispatch(verify(verifyData));
  }, [dispatch, nickname, token]);

  const goBack = () => {
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className='email-verify'>
      <div className='email-content'>
        {isVerified ? (
          <div className='email-info success'>{success && success.message}</div>
        ) : isVerified === null ? (
          ""
        ) : (
          <div className='email-info error'>{error}</div>
        )}
        <div className='buttons'>
          <button onClick={goBack}>Wróć na stronę logowania</button>
        </div>
      </div>
    </div>
  );
}

export default VerfiyEmail;
