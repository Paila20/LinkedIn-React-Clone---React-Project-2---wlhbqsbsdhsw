
import React, { useEffect, useState } from "react";
import { UseAuthContext } from "../../../helpers/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Button";
import { FaEllipsisH } from "react-icons/fa";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import { BACKGROUND_COLORS } from "../../../utils/user/login";

import Loader from '../Loader';
import Topbar from "../Topbar";
import PostUpdate from "../PostUpdate";
import "./index.css";

export default function SearchedUser() {
  const { currentUser, darkmode } = UseAuthContext();
  const [searchedUser, setSearchedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  console.log(currentUser);

  useEffect(() => {
    const searcheduser = JSON.parse(localStorage.getItem("searcheduser")) || null;
    if (searcheduser !== null) {
      setSearchedUser(searcheduser);
    }
    setLoading(false);
  }, []);

  const goToRoute = (route) => {
    navigate(route);
  };
  function ToggleFollow(){
    setIsFollowed( !isFollowed );
  }



  const handleLocalStorageUpdate = () => {
    const updatedSearchedUser = JSON.parse(localStorage.getItem("searcheduser")) || null;
    console.log(updatedSearchedUser);
    setSearchedUser(updatedSearchedUser);
  };

  return (
    <div style={{ backgroundColor: darkmode ? 'black' : '' }}>
      <div className="topbar">
        <Topbar />
      </div>
      {loading ? (
        <Loader />
      ) : searchedUser ? (
        <div style={{ backgroundColor: darkmode ? 'black' : '' }}>
          <div className="sidepost" style={{ backgroundColor: darkmode ? 'black' : '' ,
           color : darkmode ? 'white' : '',
           border: `1px solid ${darkmode ? 'white' : 'lightgrey'}`}}>
            <ul>
              <h2>On this page </h2>
              <li>Profile by {searchedUser?.name ? searchedUser?.name : ''}</li>
              <li>Posts by {searchedUser?.name ? searchedUser?.name : ''}</li>
            </ul>
          </div>
          <div className="searcheduser-card" style={
            { backgroundColor: darkmode ? 'black' : '' , 
          color : darkmode ? 'white' : '',
          border: `1px solid ${darkmode ? 'white' : 'lightgrey'}`}
          }>
            <div className="searcheduser-side">
                 
              {searchedUser?.profileImage ? (
                <img
                  className="searcheduser-image"
                  src={searchedUser?.profileImage}
                  alt="profile-image"
                />
              ) : (
                <h2
                  className="searcheduser-image"
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
              
              <h3 className="searcheduserName" style={{ color: darkmode ? 'white' : '' }}>{searchedUser.name}</h3>
                < button  className="followingbtn" onClick={ToggleFollow}>
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
                        (currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charCodeAt(0) : 0) % 20
                      ],
                  }}
                >
                  {currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charAt(0) : ""}
                </h2>
                <img className="linklogo" src={LinkedinLogo} alt="linkedin-logo" style={{ color: darkmode ? 'white' : '' }} />
              </div>
              <p style={{ color: darkmode ? 'white' : '' }}>See who's viewed your profile in the last 90 days</p>
              <Button title="Try for free!" />
            </div>
          </div>
        </div>
      ) : null}
      <div className="cards" style={{ backgroundColor: darkmode ? 'black' : '' }}>
        <PostUpdate
          userId= {id}
          profile={true}
          handleLocalStorageUpdate={handleLocalStorageUpdate}
        />
      </div>
    </div>
  );
}
