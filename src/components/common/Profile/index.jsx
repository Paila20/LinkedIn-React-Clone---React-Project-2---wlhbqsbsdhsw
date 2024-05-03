

import React, { useEffect, useState } from "react";
import { UseAuthContext } from "../../../helpers/AuthContext"; 
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Button";
import { FaEllipsisH } from "react-icons/fa";
import LinkedinLogo from "../../../assets/linkedinLogo.png";

import { BACKGROUND_COLORS } from "../../../utils/user/login";
import Loader from "../Loader";
import Topbar from "../Topbar";
import { HiOutlinePencil } from "react-icons/hi";
import "./index.css";
import { gettingUserInfo } from "../../../utils/user/post";

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
    <div style={{ backgroundColor: darkmode ? "black" : "" }}>
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
          <div className="profile-header">
      
            <div className="profile-side-1">
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
                {userData?.name}

              </h3>
              <h3
                className="userEmail"
                style={{ color: darkmode ? "white" : "" }}
              >
                {userData?.email}

              </h3>
              {userData.address && userData.address.length > 0 && <p className="user-country">{userData.address[0].city}, {userData.address[0].state}, {userData.address[0].country}</p>}
             
            </div>
          </div>
          <div>
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
                  marginTop: 30,
                  marginLeft: 30,
                }}
              >
                <li>
                  <h2 className="profilelang">Profile Language</h2>
                </li>
                <li>
                  <p className="english">English</p>
                </li>
                <hr className="hrgroup"></hr>
                <li>
                  <h2
                    className="profile-url"
                    style={{ color: darkmode ? "white" : "" }}
                  >
                    Public profile & URL
                  </h2>
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
            {currentUser && (
              <div
                className="sideprofile"
                style={{
                  backgroundColor: darkmode ? "black" : "",
                  border: `1px solid ${darkmode ? "white" : "lightgrey"}`,
                }}
              >
                <p className="ad" style={{ color: darkmode ? "white" : "" }}>
                  Ad <FaEllipsisH style={{ color: darkmode ? "white" : "" }} />
                </p>
                <p style={{ color: darkmode ? "white" : "" }}>
                  {currentUser?.data?.user?.name}, boost your job search with
                  premium
                </p>
                <div className="images" style={{ color: darkmode ? "white" : "" }}>
                  <h2
                    className="logoo"
                    style={{
                      backgroundColor:
                        BACKGROUND_COLORS[(
                          currentUser?.data?.user?.name
                            ? currentUser?.data?.user?.name.charCodeAt(0)
                            : 0
                        ) %20]
                    }}
                  >
                    {currentUser?.data?.user?.name
                      ? currentUser?.data?.user?.name.charAt(0)
                      : ""}
                  </h2>
                  <img
                    className="linklogo"
                    src={LinkedinLogo}
                    alt="linkedin-logo"
                    style={{ color: darkmode ? "white" : "" }}
                  />
                </div>
                <p style={{ color: darkmode ? "white" : "" }}>
                  See who's viewed your profile in the last 90 days
                </p>
                <Button title="Try for free!" />
              </div>
            )}
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

          <h6 className=' profile-exp-head'>{userData.workExperience ? userData.workExperience[0].designation : ""}</h6>
          <span>{userData.workExperience && userData.workExperience[0].companyName}</span>
        
          <span >{userData.workExperience && userData.workExperience[0].location}</span>
          <span >{userData.workExperience && userData.workExperience[0].description}</span>
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
        <div className='profile-exp'>
          <h6 className='profile-exp-head'>{userData.education && userData.education.length > 0 ? userData.education[0].schoolName : ""}</h6>
          <span>{userData.education ? userData.education[0]?.degree : ""}</span>
           <span >{userData.education ? userData.education[0]?.description : ""}</span>
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
               {userData.skills && userData.skills.map((skills, index) => (
                 <li  key={index}>{skills}</li>
                    ))}
           </ul>
        </div>                          
     </div>
     </div>
   );
 }
