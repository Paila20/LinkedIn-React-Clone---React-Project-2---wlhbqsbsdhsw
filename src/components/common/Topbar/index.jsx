

import React, { useEffect, useState ,useRef} from "react";
import LinkedinLogo from "../../../assets/linklogo.png";
import SearchUsers from "../SearchUsers";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineBell,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import ProfilePopup from "../ProfilePopup";
import "./index.css";
import { FaSearch } from "react-icons/fa"; 
import { UseAuthContext } from "../../../helpers/AuthContext";
import { BACKGROUND_COLORS } from '../../../utils/user/login';

export default function Topbar() {


  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const {currentUser, darkmode} = UseAuthContext();
  let navigate = useNavigate();

  const dropdownRef = useRef(null);

  useEffect(()=>{
    if(typeof (localStorage.getItem('token')) !==  'string' ){
    goToLogin();
    }
  },[])
 
  function goToLogin() {
    navigate('/login')
  } 

  useEffect(() => {
  
    document.addEventListener("mousedown", handleClickOutside);
   
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    
      setIsSearch(false);
    }
  };
  const handleInputClick = () => {
    setIsSearch(true);
  };


  useEffect(()=>{

  },[currentUser])

 

  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  

  return (
   
    <div className="topbar-main"   style={{ backgroundColor: darkmode ? 'black' : '' }}>
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup currentUser={currentUser} />
        </div>
      ) : (
        <></>
      )} 
  
      <img className="linkedin-logo" 
      src={LinkedinLogo} 
      alt="LinkedinLogo"
      onClick={()=>goToRoute('/')} />
      
      {isSearch ? (
        <div ref={dropdownRef}>
        <SearchUsers 
          setIsSearch={setIsSearch}/>
          </div>
      ) : (
       
        <div className='react-search'>
        <FaSearch size={20} />
        <input type='text'
        placeholder="Search Users.."
        onClick={handleInputClick}/>
        </div>
      )}
      
      
      <div className="react-icons"  style={{ backgroundColor: darkmode ? 'black' : '' }}>
        <div className="icon-container">
          <AiOutlineHome
            size={30}
            className="react-icon"
            onClick={()=>goToRoute('/')}
            style={{color: darkmode ? 'white': ''}}
          />
          <span className="icon-name" style={{color: darkmode ? 'white': ''}}>Home</span>
        </div>
        <div className="icon-container" style={{color: darkmode ? 'white': ''}}>
          <AiOutlineUserSwitch size={30} className="react-icon"  onClick= {()=>goToRoute('/group')} style={{color: darkmode ? 'white': ''}}/>
          <span className="icon-name">Network</span>
        </div>
        <div className="icon-container" onClick= {()=>goToRoute('/maintenance ')} style={{color: darkmode ? 'white': ''}}>
          <BsBriefcase size={30} className="react-icon" style={{color: darkmode ? 'white': ''}}/>
          <span className="icon-name">Jobs</span>
        </div>
        <div className="icon-container" onClick= {()=>goToRoute('/maintenance ')}>
          <AiOutlineBell size={30} className="react-icon" style={{color: darkmode ? 'white': ''}}/>
          <span className="icon-name" style={{color: darkmode ? 'white': ''}} >Notifications</span>
        </div>
       
      <div className="icon-container">
        {currentUser?.data?.profileImage ? (
         
          <img
            className="user-logo"
            src={currentUser?.data?.profileImage}
            alt="imageLink"
            onClick={displayPopup}
          />
        
        ) : (
        
        
      <h2 className="user-logo"  onClick={displayPopup} style={{backgroundColor: BACKGROUND_COLORS[( currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charCodeAt(0) : 0) % 20]}}>
        { currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charAt(0) : ''}
      </h2>
         )}
       <span style={{marginTop:50,marginRight:-5, marginBottom:5, fontSize: 10, color : darkmode ? 'white': ''}}>Me</span> 
  
        </div>
      </div>
      </div>
    
  );
}


