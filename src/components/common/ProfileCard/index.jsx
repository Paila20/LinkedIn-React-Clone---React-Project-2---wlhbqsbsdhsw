
import React, { useEffect, useState } from "react";
import { UseAuthContext } from "../../../helpers/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Button";
import { FaEllipsisH, FaUserPlus, FaPaperPlane } from "react-icons/fa";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import { BACKGROUND_COLORS } from "../../../utils/user/login";
import { timeStampConversionToDateAndTime } from "../../../helpers/timeStampConversion";
import Loader from '../Loader';
import Topbar from "../Topbar";
import PostUpdate from "../PostUpdate";
import "./index.css";

export default function ProfileCard() {
  const { currentUser } = UseAuthContext();
  const [searchedUser, setSearchedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  

  useEffect(() => {
    
    const searcheduser = JSON.parse(localStorage.getItem("searcheduser")) || null;
    if (searchedUser !== null) {
      setSearchedUser(searcheduser);
    }
    setLoading(false);
  }, [searchedUser]);
  

  const goToRoute = (route) => {
    navigate(route);
  };

  const handleLocalStorageUpdate = () => {
    const updatedSearchedUser = JSON.parse(localStorage.getItem("searcheduser")) || null;
    console.log(updatedSearchedUser)
    setSearchedUser(updatedSearchedUser);
  };

 

  return (
    <>
      <div className="topbar">
        <Topbar/>
      </div>
      {loading ? (
        <Loader/>
      ) : (
        <div className="profile">
       
            <div className="profile-info">
              {searchedUser !== null ? (
                <div className="profile-card">
                  <div>
                 
                  {searchedUser?.profileImage ? (
                    <img
                      className="profile-image"
                      src={searchedUser?.profileImage}
                      alt="profile-image"
                    />
                  ) : (
                    <h2
                      className="profile-image"
                      style={{
                        backgroundColor:
                          BACKGROUND_COLORS[
                            (searchedUser?.name ? searchedUser?.name.charCodeAt(0) : 0) % 20
                          ],
                      }}
                    >
                      {searchedUser?.name ? searchedUser?.name.charAt(0) : ""}
                    </h2>
                  )}
                  <h3 className="userName">{searchedUser.name}</h3>
                  </div>
                  <div className="advert">
                    <p className="adc">
                      Ad <FaEllipsisH />
                    </p>
                    <p>{currentUser?.data?.name}, boost your job search with premium</p>
                    <div className="images">
                      <h2
                        className="logoo"
                        style={{
                          backgroundColor:
                            BACKGROUND_COLORS[
                              (currentUser?.data?.name ? currentUser?.data?.name.charCodeAt(0) : 0) % 20
                            ],
                        }}
                      >
                        {currentUser?.data?.name ? currentUser?.data?.name.charAt(0) : ""}
                      </h2>
                      <img className="linklogo" src={LinkedinLogo} alt="linkedin-logo" />
                    </div>
                    <p>See who's viewed your profile in the last 90 days</p>
                    <Button title="Try for free!" />
                  </div>
                </div>
              ) : (
                <div className="profile-card">
                  <div>
                    {currentUser?.data?.profileImage ? (
                      <img
                        className="profile-image"
                        src={currentUser.data.profileImage}
                        alt="profile-image"
                      />
                    ) : (
                      <h2
                        className="profile-image"
                        style={{
                          backgroundColor:
                            BACKGROUND_COLORS[
                              (currentUser?.data?.name ? currentUser?.data?.name.charCodeAt(0) : 0) % 20
                            ],
                        }}
                      >
                        {currentUser?.data?.name ? currentUser?.data?.name.charAt(0) : ""}
                      </h2>
                    )}
                    <h3 className="userName">
                      {currentUser?.data?._id !== id ? id : currentUser?.data?.name}
                    </h3>
                    {/* <p className="heading">
                      {currentUser?.data?._id !== id ? id : currentUser?.data?.email}
                    </p> */}
                    <p className="heading">
                      joined At
                      {currentUser?.data?._id !== id ? id : timeStampConversionToDateAndTime(currentUser?.data?.createdAt)}
                    </p>
                   
                  </div>
                  <div className="">
                  <div className="lang">
                    <div className="">
                      <h1>Profile Language</h1>
                      <p>English</p>
                    </div>
                    <div className="hr-line">
                      <hr />
                    </div>
                    <div className="">
                      <h1>Public profile & URL </h1>
                      <p>www.linkedin.com/{currentUser?.data?.email}</p>
                    </div>
                  </div>
                  <div className="sideprofile">
                    <p className="ad">
                      Ad <FaEllipsisH />
                    </p>
                    <p>{currentUser?.data?.name}, boost your job search with premium</p>
                    <div className="images">
                      <h2
                        className="logoo"
                        style={{
                          backgroundColor:
                            BACKGROUND_COLORS[
                              (currentUser?.data?.name ? currentUser?.data?.name.charCodeAt(0) : 0) % 20
                            ],
                        }}
                      >
                        {currentUser?.data?.name ? currentUser?.data?.name.charAt(0) : ""}
                      </h2>
                      <img className="linklogo" src={LinkedinLogo} alt="linkedin-logo" />
                    </div>
                    <p>See who's viewed your profile in the last 90 days</p>
                    <Button title="Try for free!" />
                  </div>
                  </div>
                </div>
              )}
            </div>
        
        </div>
      )}
      <div className="cards">
        <PostUpdate
          className="card"
          currentUser={currentUser?.data?._id !== id ? id : currentUser}
          profile={true}
          handleLocalStorageUpdate={handleLocalStorageUpdate}
        />
      </div>
    </>
  );
}
 