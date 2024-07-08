

import React, { useEffect, useState } from "react";
import { UseAuthContext } from "../../../helpers/AuthContext"; 
import { useParams, useNavigate } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import { BACKGROUND_COLORS } from "../../../utils/user/login";
import Loader from "../Loader";
import Topbar from "../Topbar";
import { HiOutlinePencil } from "react-icons/hi";
import { gettingUserInfo } from "../../../utils/user/post";
import {userCoverPic} from "../../../assets/Icons";
import { skillslist } from '../../../assets/news';
import { formatTimestamp } from "../../../helpers/timeStampConversion";
import "./index.css";

export default function Profile() {
  const { currentUser, darkmode, setCurrentUser } = UseAuthContext(); 
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleProfile();
    setLoading(false);
  }, [currentUser]);

  const handleProfile = async () => {
    if (id !== undefined && currentUser !== undefined) {
      const res = await gettingUserInfo(id, currentUser.token);
      console.log(res);
      if (res.status === 200) {
        setUserData(res.data.data);
      }
    }
  };

  console.log(currentUser);

  return (
    <div style={{ marginBottom:-850,
      backgroundColor: darkmode ? "black" : "",
      color: darkmode ? "white" : "",
   
    }}>
    <div className="profile-container"  style={{
      backgroundColor: darkmode ? "black" : "",
      color: darkmode ? "white" : "",
      // border: `1px solid ${darkmode ? "white" : "lightgrey"}`,
    }}>
    <div style={{ backgroundColor: darkmode ? "black" : "" }} className="profile-container-left">
      <div className="topbar">
        <Topbar />
      </div>
      {loading ? (
        <Loader />
      ) : userData !== null ? (
        <div
          className="profile-card"
          style={{
            backgroundColor: darkmode ? "black" : "",
            color: darkmode ? "white" : "",
            border: `1px solid ${darkmode ? "white" : "lightgrey"}`,
          }}
        >
           
          <div className="">
          {/* <div className="headercover">{userCoverPic}</div> */}
            <div className="profile-side-1">
            <div className="backimage"></div> 
              {userData?.profileImage ? (
                <img
                  className="profile-image"
                  src={userData.profileImage}
                  alt="profile-image"
                />
              ) : (
                <h2
                className="profile-image"
                style={{
                  backgroundColor:
                    BACKGROUND_COLORS[
                      (userData?.name
                        ? userData?.name.charCodeAt(0)
                        : 0
                      ) % 20
                    ],
                }}
              >
                {userData?.name
                  ? userData?.name.charAt(0)
                  : ""}
              </h2>
              )}

              <h3
                className="userName"
                style={{ color: darkmode ? "white" : "" }}
              >
                {userData?.name}({userData?.email})

              </h3>
              <p
                className="userEmail"
                style={{ color: darkmode ? "white" : "" }}
              >
                {userData?.email}

              </p>
              <p className='userEmail'>{userData.workExperience ? userData.workExperience[0].designation : "Frontend  Developer"}</p>

              <p
                className="userEmail"
                style={{ color: darkmode ? "white" : "" }}
              >
                joined on {formatTimestamp(userData?.createdAt)}

              </p>

              <p
                className="userEmail"
                style={{ color: darkmode ? "white" : "" }}
              >
         
         {userData.address && userData.address.length > 0 && <p className="">{userData.address[0].city}, {userData.address[0].state? userData.address[0].state:"Andhra Pradhesh"}, {userData.address[0].country?userData.address[0].country:"India" }</p>}
              </p>

             
            </div>
          </div>
         
         
        
        </div>
        
      ) : (
        <></>
      )}
      
      <div
        className="profile-details"
        style={{
          backgroundColor: darkmode ? "black" : "",
          color: darkmode ? "white" : "",
          border: `1px solid ${darkmode ? "white" : "lightgrey"}`,
        }}
      >
        <div className="profile-details-top">
          <h3 className="profile-details-info">Experience</h3>
          <HiOutlinePencil className="pen" />
        </div>
        <div className='profile-exp'>

          <h6 className=' profile-exp-head'>{userData.workExperience ? userData.workExperience[0].designation : "Frontend Developer"}</h6>
          <span>{userData.workExperience && userData.workExperience[0].companyName ?userData.workExperience && userData.workExperience[0].companyName : "Google"}</span>

        
          <span >{userData.workExperience && userData.workExperience[0].location ? userData.workExperience && userData.workExperience[0].location:"Bangalore"}</span>

          <span >{userData.workExperience && userData.workExperience[0].description ? userData.workExperience && userData.workExperience[0].description: ""}</span>
          </div>
      </div>

      <div
        className="profile-details1"
        style={{
          backgroundColor: darkmode ? "black" : "",
          color: darkmode ? "white" : "",
          border: `1px solid ${darkmode ? "white" : "lightgrey"}`,
        }}
      >
        <div className="profile-details-top">
          <h3 className="profile-details-info">Education</h3>
          <HiOutlinePencil className="pen1" />
        </div>
        <div className='profile-exp1'>
          <h6 className='profile-exp-head'>{userData.education && userData.education.length > 0 ? userData.education[0].schoolName : "Govt High School, Polavaram"}</h6>
          <span>{userData.education && userData.education.length > 0 ? userData.education[0]?.degree : "Btech(Electronics and Communication) in , Bhimavaram"}</span>
           <span >{userData.education && userData.education.length > 0 ? userData.education[0]?.description : "Electronics and Communication"}</span>
        </div>    
       </div>                    
    

      <div
        className="profile-details2"
        style={{
          backgroundColor: darkmode ? "black" : "",
          color: darkmode ? "white" : "",
          border: `1px solid ${darkmode ? "white" : "lightgrey"}`,
        }}
      >
        <div className="profile-details-top">
          <h3 className="profile-details-info">Skills</h3>
          <HiOutlinePencil className="pen2" />
          </div>
          <div className='profile-exp'>
          <ul className="skills-ul">
            {userData.skills && userData.skills.length>0? userData.skills.map((skills, index) => (
                 <li  key={index}>{skills}</li>
                    )):
                    skillslist.map((skill, index) => (
                      <li  key={index}>{skill.skill}</li>
                         ))
                  }
           </ul>
        </div>                          
     </div>
     </div>
     <div className="side-profile"  style={{
          backgroundColor: darkmode ? "black" : "",
          color: darkmode ? "white" : "",
  
        }}>
  
            <div
              className="lang"
              style={{
                backgroundColor: darkmode ? "black" : "",
                border: `1px solid ${darkmode ? "white" : "lightgrey"}`,
              }}
            >
              <ul
                className="profile-side"
                style={{
                  color: darkmode ? "white" : "",
                 
                }}
              >
                <li>
                  <div className="lang-top ">
                  <h3 className="">Profile Language</h3>
                  <HiOutlinePencil  />
                  </div>
                 
                </li>
                <li>
                 
                  <p className="">English</p>
                </li>
                <hr className=""></hr>
                <li>
                  <div className="lang-top">
                  <h3
                    className=""
                    style={{ color: darkmode ? "white" : "" }}
                  >
                    Public profile & URL
                  </h3>
                  <HiOutlinePencil  />
                  </div>
                 
                </li>
                <li>
                  <p
                    className="url"
                    style={{ color: darkmode ? "white" : "" }}
                  >
                    www.linkedin.com/{userData?.email}
                  </p>
                </li>
              </ul>
            </div>
            <div       
             className=""
             >
            {currentUser && (
              <div
                className="sideprofile1"
                style={{
                  backgroundColor: darkmode ? "black" : "",
                  border: `1px solid ${darkmode ? "white" : "lightgrey"}`,
                }}
              >
                <p className="ad" style={{ color: darkmode ? "white" : "" }}>
                  Ad <FaEllipsisH style={{ color: darkmode ? "white" : "" }} />
                </p>
                <p style={{ color: darkmode ? "white" : "" ,color:'gray'}} className="">
                  {currentUser?.data?.user?.name}, boost your job search with
                  premium
                </p>
                <div className="" style={{ color: darkmode ? "white" : "" }}>
                 
                  <img
                    className="linklogo"
                    src={LinkedinLogo}
                    alt="linkedin-logo"
                    style={{ color: darkmode ? "white" : "" }}
                  />
                </div>
                <p style={{ color: darkmode ? "white" : "" ,color:'gray'}}>
                  See who's viewed your profile in the last 90 days
                </p>
        
                <button className='btn'> Try for free! </button> 
              </div>
            )}
          </div>
          </div>
       

     </div>
     </div>
    

     
   );
 }





