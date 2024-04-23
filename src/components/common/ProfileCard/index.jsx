
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

  
console.log(currentUser)
  useEffect(() => {
    
    const searcheduser = JSON.parse(localStorage.getItem("searcheduser")) || null;
    if (searchedUser !== null) {
      setSearchedUser(searcheduser);
    }
    setLoading(false);
  }, []);
  

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
       
       
            <div className="">
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
                    <p>{currentUser?.data?.user?.name}, boost your job search with premium</p>
                    <div className="images">
                      <h2
                        className="logoo"
                        style={{
                          backgroundColor:
                            BACKGROUND_COLORS[
                              (currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charCodeAt(0) : 0) % 20
                            ],
                        }}
                      >
                        {currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charAt(0) : ""}
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
                              (currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charCodeAt(0) : 0) % 20
                            ],
                        }}
                      >
                        {currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charAt(0) : ""}
                      </h2>
                    )}
                    <h3 className="userName">
                      {currentUser?.data?.user?._id !== id ? id : currentUser?.data?.user?.name}
                    </h3>
                  
                    
                   
                  </div>
                  <div >
                  <div className="lang">
                    <div>
                      <h1>Profile Language</h1>
                      <p>English</p>
                    </div>
                   <hr></hr>
                    <div className="">
                      <h1>Public profile & URL </h1>
                      <p>www.linkedin.com/{currentUser?.data?.user?.email}</p>
                    </div>
                  </div>
                  <div className="sideprofile">
                    <p className="ad">
                      Ad <FaEllipsisH />
                    </p>
                    <p>{currentUser?.data?.user?.name}, boost your job search with premium</p>
                    <div className="images">
                      <h2
                        className="logoo"
                        style={{
                          backgroundColor:
                            BACKGROUND_COLORS[
                              (currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charCodeAt(0) : 0) % 20
                            ],
                        }}
                      >
                        {currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charAt(0) : ""}
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
        
      
      )}
      <div className="cards">
        <PostUpdate
          
          currentUser={currentUser?.data?.user?._id !== id ? id : currentUser}
          profile={true}
          handleLocalStorageUpdate={handleLocalStorageUpdate}
        />
      </div>
    </>
  );
}
 