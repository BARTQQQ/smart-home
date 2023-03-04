import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };
  return (
    <div className='not-found'>
      <div>
        <span>404.</span>
        <p>Zabłądziłeś ;)</p>
      </div>
      <div className='buttons'>
        <button onClick={goBack}>Wróć</button>
      </div>
    </div>
  );
}
