import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import Button from "../Button";
import "./index.css";
import { UseAuthContext } from "../../../helpers/AuthContext";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const {currentUser, setLoginToken, darkmode, toggleDarkMode} = UseAuthContext();

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
    <div className='popup-card ' style={{ backgroundColor: darkmode ? 'black' : 'white' }}>

      <p className="name">{currentUser?.data?.user?.name}</p>

      <Button
        title="View Profile"
        onClick={() => navigate(`/profile/${currentUser?.data?.user?._id}`)}
      />
      <p className="premium" onClick={() => navigate("/trypremium")}>Try Premium</p>
          {/* <Button title="dark/light" onClick={toggleDarkMode} /> */}
       <Switch   className = 'togglethemebtn' style={{ color: darkmode ? 'black' : '' }} onClick={toggleDarkMode} />
      <Button title="Log out"  onClick={handleLogout} disabled={false} />
    </div>
  );
}
