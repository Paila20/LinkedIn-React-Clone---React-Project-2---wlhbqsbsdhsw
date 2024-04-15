import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button";
import "./index.css";
import { UseAuthContext } from "../../../helpers/AuthContext";

export default function ProfilePopup({ toggleTheme ,theme}) {
  let navigate = useNavigate();
  const {currentUser} = UseAuthContext();
 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    navigate("/login");
  };


  return (
    <div className={`popup-card ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>

      <p className="name">{currentUser?.data?.name}</p>

      <Button
        title="View Profile"
        onClick={() => navigate(`/profile/${currentUser?.data?._id}`)}
      />
      <p className="premium" onClick={() => navigate("/trypremium")}>Try Premium</p>
          <Button title="dark/light" onClick={toggleTheme} />
      <Button title="Sign out" onClick={handleLogout} disabled={false} />
    </div>
  );
}
