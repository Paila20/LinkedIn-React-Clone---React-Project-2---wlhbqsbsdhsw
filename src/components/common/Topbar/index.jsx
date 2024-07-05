

// import React, { useEffect, useState ,useRef} from "react";
// import LinkedinLogo from "../../../assets/linklogo.png";
// import {home, job, network,notification} from "../../../assets/Icons";
// import SearchUsers from "../SearchUsers";

// import { useNavigate,useLocation } from "react-router-dom";

// import ProfilePopup from "../ProfilePopup";
// import "./index.css";
// import { FaSearch } from "react-icons/fa"; 
// import { UseAuthContext } from "../../../helpers/AuthContext";
// import { BACKGROUND_COLORS } from '../../../utils/user/login';


// export default function Topbar() {


//   const [popupVisible, setPopupVisible] = useState(false);
//   const [isSearch, setIsSearch] = useState(false);
//   const {currentUser, darkmode} = UseAuthContext();
  
//   const location = useLocation();
  
//   const [activeRoute, setActiveRoute] = useState(location.pathname + location.search);
 

//   let navigate = useNavigate();

//   const dropdownRef = useRef(null);
//   const profileref = useRef(null); 
 


//   useEffect(() => {
//     if (location.pathname + location.search !== activeRoute) {
//       setActiveRoute(location.pathname + location.search);
//     }
//   }, [location.pathname, location.search, activeRoute]);

//   useEffect(()=>{
//     if(typeof (localStorage.getItem('token')) !==  'string' ){
//     goToLogin();
//     }
//   },[])
 
//   function goToLogin() {
//     navigate('/login')
//   } 

//   useEffect(() => {
  
//     document.addEventListener("mousedown", handleClickOutsideProfile);
   
//   }, []);

//   const handleClickOutsideProfile = (event) => {
//     if (profileref.current && !profileref.current.contains(event.target)) {
    
  
//       setPopupVisible(false);
//     }
//   };

//   useEffect(() => {
  
//     document.addEventListener("mousedown", handleClickOutside);
   
//   }, []);

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    
//       setIsSearch(false);
//     }
//   };
//   const handleInputClick = () => {
//     setIsSearch(true);
//   };


//   useEffect(()=>{

//   },[currentUser])

 
 

//   const goToRoute = (route, tab = '') => {
   

//     const fullRoute = tab ? `${route}?tab=${tab}` : route;
//     setActiveRoute(fullRoute);
//     navigate(fullRoute);
//   };

//   const displayPopup = () => {
//     setPopupVisible(!popupVisible);
//   };

  

//   return (
   
//     <div className="topbar-main"   style={{ backgroundColor: darkmode ? 'black' : '' }}>
//       {popupVisible ? (
//         <div className="popup-position" ref={profileref}>
//           <ProfilePopup currentUser={currentUser} />
//         </div>
//       ) : (
//         <></>
//       )} 
  
//       <img className="linkedin-logo" 
//       src={LinkedinLogo} 
//       alt="LinkedinLogo"
//       onClick={()=>goToRoute('/')} />
      
//       {isSearch ? (
//         <div ref={dropdownRef} >
//         <SearchUsers 
//           setIsSearch={setIsSearch} />
//           </div>
//       ) : (
       
//         <div className={darkmode ? "react-search-dark ":'react-search'}>
//         <FaSearch size={20}  onClick={handleInputClick} style={{ backgroundColor: darkmode ? '' : '',color :darkmode ? "white": ""}}/>
//         <input type='text'
//         placeholder="Search .."
//         onClick={handleInputClick} style={{ backgroundColor: darkmode ? 'black' : '',color :darkmode ? "white": "", border: 'none'}}/>
//         </div>
//       )}
      
      
//       <div className="react-icons"  style={{ backgroundColor: darkmode ? 'black' : '' }}>
//         <div className={`icon-container ${activeRoute === "/" ? "active" : ""}`} onClick={()=>goToRoute('/')} style={{color: darkmode ? 'white': ''}}>
         
//           {home}
//           <span className="icon-name" >Home</span>
//         </div>
//         <div className={`icon-container ${activeRoute === "/group" ? "active" : ""}`} style={{color: darkmode ? 'white': ''}}  onClick= {()=>goToRoute('/group')}  >

//           {network}
//           <span className="icon-name-network">My Network</span>
//         </div>
//         <div className={`icon-container ${activeRoute === '/maintenance?tab=jobs' ? 'active' : ''}`} onClick= {()=>goToRoute('/maintenance','jobs')} style={{color: darkmode ? 'white': ''}}>

//           {job}
//           <span className="icon-name">Jobs</span>
//         </div>
//         <div className={`icon-container ${activeRoute === '/maintenance?tab=notification' ? 'active' : ''}`} onClick= {()=>goToRoute('/maintenance','notification')} style={{color: darkmode ? 'white': ''}}>

       
//           {notification}
//           <span className="icon-name-notification"  >Notifications</span>
//         </div>
       
//       <div className="icon-container">
//         {currentUser?.data?.profileImage ? (
         
//           <img
//             className="user-logo"
//             src={currentUser?.data?.profileImage}
//             alt="imageLink"
//             onClick={displayPopup}
//           />
        
//         ) : (
        
        
//       <h2 className="user-logo"  onClick={displayPopup} style={{backgroundColor: BACKGROUND_COLORS[( currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charCodeAt(0) : 0) % 20]}}>
//         { currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charAt(0) : ''}
//       </h2>
//          )}
//        <span className="me" style={{ color : darkmode ? 'white': ''}}>Me</span> 
  
//         </div>
//       </div>
//       </div>
    
//   );
// }

import React, { useEffect, useState, useRef } from "react";
import LinkedinLogo from "../../../assets/linklogo.png";
import { home, job, network, notification } from "../../../assets/Icons";
import SearchUsers from "../SearchUsers";
import { useNavigate, useLocation } from "react-router-dom";
import ProfilePopup from "../ProfilePopup";
import "./index.css";
import { FaSearch } from "react-icons/fa";
import { UseAuthContext } from "../../../helpers/AuthContext";
import { BACKGROUND_COLORS } from '../../../utils/user/login';

export default function Topbar() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const { currentUser, darkmode } = UseAuthContext();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname + location.search);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const profileref = useRef(null);

  useEffect(() => {
    if (typeof localStorage.getItem('token') !== 'string') {
      goToLogin();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideProfile);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideProfile);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (location.pathname + location.search !== activeRoute) {
      setActiveRoute(location.pathname + location.search);
    }
  }, [location.pathname, location.search, activeRoute]);

  function goToLogin() {
    navigate('/login');
  }

  const handleClickOutsideProfile = (event) => {
    if (profileref.current && !profileref.current.contains(event.target)) {
      setPopupVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsSearch(false);
    }
  };

  const handleInputClick = () => {
    setIsSearch(true);
  };

  const goToRoute = (route, tab = '') => {
    const fullRoute = tab ? `${route}?tab=${tab}` : route;
    console.log(`Navigating to: ${fullRoute}`); // Debugging line
    setActiveRoute(fullRoute);
    navigate(fullRoute);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <div className="topbar-main" style={{ backgroundColor: darkmode ? 'black' : '' }}>
      {popupVisible && (
        <div className="popup-position" ref={profileref}>
          <ProfilePopup currentUser={currentUser} />
        </div>
      )}

      <img
        className="linkedin-logo"
        src={LinkedinLogo}
        alt="LinkedinLogo"
        onClick={() => goToRoute('/')}
      />

      {isSearch ? (
        <div ref={dropdownRef}>
          <SearchUsers setIsSearch={setIsSearch} />
        </div>
      ) : (
        <div className={darkmode ? "react-search-dark" : "react-search"}>
          <FaSearch
            size={20}
            onClick={handleInputClick}
            style={{ backgroundColor: darkmode ? '' : '', color: darkmode ? "white" : "" }}
          />
          <input
            type="text"
            placeholder="Search .."
            onClick={handleInputClick}
            style={{ backgroundColor: darkmode ? 'black' : '', color: darkmode ? "white" : "", border: 'none' }}
          />
        </div>
      )}

      <div className="react-icons" style={{ backgroundColor: darkmode ? 'black' : '' }}>
        <div className={`icon-container ${activeRoute === "/" ? "active" : ""}`} onClick={() => goToRoute('/')} style={{ color: darkmode ? 'white' : '' }}>
          {home}
          <span className="icon-name">Home</span>
        </div>
        <div className={`icon-container ${activeRoute === "/group" ? "active" : ""}`} onClick={() => goToRoute('/group')} style={{ color: darkmode ? 'white' : '' }}>
          {network}
          <span className="icon-name-network">My Network</span>
        </div>
        <div className={`icon-container ${activeRoute === '/maintenance?tab=jobs' ? 'active' : ''}`} onClick={() => goToRoute('/maintenance', 'jobs')} style={{ color: darkmode ? 'white' : '' }}>
          {job}
          <span className="icon-name">Jobs</span>
        </div>
        <div className={`icon-container ${activeRoute === '/maintenance?tab=notifications' ? 'active' : ''}`} onClick={() => goToRoute('/maintenance', 'notifications')} style={{ color: darkmode ? 'white' : '' }}>
          {notification}
          <span className="icon-name-notification">Notifications</span>
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
            <h2
              className="user-logo"
              onClick={displayPopup}
              style={{ backgroundColor: BACKGROUND_COLORS[(currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charCodeAt(0) : 0) % 20] }}
            >
              {currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charAt(0) : ''}
            </h2>
          )}
          <span className="me" style={{ color: darkmode ? 'white' : '' }}>Me</span>
        </div>
      </div>
    </div>
  );
}
