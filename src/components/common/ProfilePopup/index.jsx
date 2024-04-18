import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button";
import "./index.css";
import { UseAuthContext } from "../../../helpers/AuthContext";

export default function ProfilePopup({ toggleTheme ,theme}) {
  let navigate = useNavigate();
  const {currentUser, setLoginToken} = UseAuthContext();

  useEffect(()=>{
    if(typeof (localStorage.getItem('token')) !==  'string'){
    goToLogin();
    }
  },[])
 
  function goToLogin() {
    navigate('/login')
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    setLoginToken(null);
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
      <Button title="Log out" onClick={handleLogout} disabled={false} />
    </div>
  );
}
