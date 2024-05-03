
import React, { useEffect, useState } from "react";
import { UseAuthContext } from "../../../helpers/AuthContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "../Button";
import { FaEllipsisH } from "react-icons/fa";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import { BACKGROUND_COLORS } from "../../../utils/user/login";

import Loader from '../Loader';
import Topbar from "../Topbar";
import PostUpdate from "../PostUpdate";
import "./index.css";
import { gettingUserInfo } from "../../../utils/user/post";

export default function SearchedUser() {
  const { currentUser, darkmode } = UseAuthContext();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);

  const { id } = useParams();
 

  console.log(currentUser);

  useEffect(()=>{
 handleProfile();
 setLoading(false);
  },[id,currentUser])

  const handleProfile = async () => {
    if (id !== undefined && currentUser !== undefined) {
      const res = await gettingUserInfo(id, currentUser.token);
      console.log(res);
      if (res.status === 200) {
        setUserData(res.data.data);
      }
    }
  };

  function ToggleFollow() {
    setIsFollowed(!isFollowed);
  }

  return (
    <div style={{ backgroundColor: darkmode ? 'black' : '' }}>
      <div className="topbar">
        <Topbar />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ backgroundColor: darkmode ? 'black' : '' }}>
          <div className="sidepost" style={{ backgroundColor: darkmode ? 'black' : '', color: darkmode ? 'white' : '', border: `1px solid ${darkmode ? 'white' : 'lightgrey'}` }}>
            <ul>
              <h2>On this page </h2>
              <li>Profile by {userData?.name ? userData.name : ''}</li>
              <li>Posts by {userData?.name ? userData.name : ''}</li>
            </ul>
          </div>
          <div className="searcheduser-card" style={{ backgroundColor: darkmode ? 'black' : '', color: darkmode ? 'white' : '', border: `1px solid ${darkmode ? 'white' : 'lightgrey'}` }}>
            <div className="searcheduser-side">
              <div className="search-side">

              {userData?.profileImage ? (
                <img
                  className="searcheduser-image"
                  src={userData.profileImage}
                  alt="profile-image"
                />
              ) : (
                <h2
                  className="searcheduser-image"
                  style={{
                    backgroundColor:
                      BACKGROUND_COLORS[
                      (userData?.name ? userData.name.charCodeAt(0) : 0) % 20
                      ],
                  }}
                >
                  {userData?.name ? userData.name.charAt(0) : ""}
                </h2>
              )}

              <h3 className="searcheduserName" style={{ color: darkmode ? 'white' : '' }}>{userData.name}</h3>
              </div>
              <Link to={`/profile/${userData._id}`}>
                <button className="profile-btn">
                  View Profile
                </button>
              </Link>

              <button className="followingbtn" onClick={ToggleFollow}>
                {isFollowed ? 'Unfollow' : 'Follow'}
              </button>

            </div>
            <div className="advert" style={{ backgroundColor: darkmode ? 'black' : '', border: `1px solid ${darkmode ? 'white' : 'lightgrey'}` }}>
              <p className="adc" style={{ color: darkmode ? 'white' : '' }}>
                Ad <FaEllipsisH style={{ color: darkmode ? 'white' : '' }} />
              </p>
              <p style={{ color: darkmode ? 'white' : '' }}>{currentUser?.data?.user?.name}, boost your job search with premium</p>
              <div className="images" style={{ color: darkmode ? 'white' : '' }}>
                <h2
                  className="logoo"
                  style={{
                    backgroundColor:
                      BACKGROUND_COLORS[
                      (currentUser?.data?.user?.name ? currentUser.data.user.name.charCodeAt(0) : 0) % 20
                      ],
                  }}
                >
                  {currentUser?.data?.user?.name ? currentUser.data.user.name.charAt(0) : ""}
                </h2>
                <img className="linklogo" src={LinkedinLogo} alt="linkedin-logo" style={{ color: darkmode ? 'white' : '' }} />
              </div>
              <p style={{ color: darkmode ? 'white' : '' }}>See who's viewed your profile in the last 90 days</p>
              <Button title="Try for free!" />
            </div>
          </div>
        </div>
      )}
      <div className="cards" style={{ backgroundColor: darkmode ? 'black' : '' }}>
        <PostUpdate
          userId={id}
          profile={true}
        />
      </div>
    </div>
  );
}
