import React, {  useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import { UseAuthContext } from "../../../helpers/AuthContext";
import { BACKGROUND_COLORS } from "../../../utils/user/login";
import "./index.css";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const dropdownRef = useRef(null);

  const {currentUser, setLoginToken, darkmode, toggleDarkMode} = UseAuthContext();
  useEffect(() => {
  
    document.addEventListener("mousedown", handleClickOutside);
   
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    
      setIsSearch(false);
    }
  };

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
         {currentUser?.data?.profileImage ? (
         
         <img
           className="user-popup-logo"
           src={currentUser?.data?.profileImage}
           alt="imageLink"
          
         />
       
       ) : (
       
       
     <h2 className="user-popup-logo"   style={{backgroundColor: BACKGROUND_COLORS[( currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charCodeAt(0) : 0) % 20]}}>
       { currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charAt(0) : ''}
     </h2>
        )}
      <p className="name"  style={{ color: darkmode ? 'white' : '' }}>{currentUser?.data?.user?.name}</p>

      <button
      className="popup-bt"
        onClick={() => navigate(`/profile/${currentUser?.data?.user?._id}`)}
      > View Profile</button>
      <p className="premium" onClick={() => navigate("/trypremium")}>Try Premium</p>

       <span style={{ color: darkmode ? 'gray' : '' }}>Dark Mode</span><Switch   className = 'togglethemebtn' style={{ color: darkmode ? 'black' : '' }} onClick={toggleDarkMode} />
      <button className="popup-bt"  onClick={handleLogout} disabled={false} >Log out</button>
    </div>
  );
}
