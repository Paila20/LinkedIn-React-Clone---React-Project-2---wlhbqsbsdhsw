import { useEffect, useState } from "react";
import { UseAuthContext } from "../../../helpers/AuthContext";
import Button from "../Button";
import { FaEllipsisH } from "react-icons/fa";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import { BACKGROUND_COLORS } from "../../../utils/user/login";
import { FaUserPlus } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { timeStampConversionToDateAndTime } from "../../../helpers/timeStampConversion";
import { useNavigate, useParams } from "react-router-dom";
import Loader from '../Loader';
import Topbar from "../Topbar";
import PostUpdate from "../PostUpdate";
import "./index.css";

export default function ProfileCard() {
  const [searchedUser, setSearchedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };

  useEffect(() => {
    const searcheduser =
      JSON.parse(localStorage.getItem("searcheduser")) || null;
    console.log("searchedUser", searcheduser);
    if (searchedUser !== null) {
      console.log("searchedUser", searcheduser);
      setSearchedUser(searcheduser);
    }
    setLoading(false);
  }, []);
  useEffect(() => {}, [searchedUser]);
  const { currentUser } = UseAuthContext();

  const handleLocalStorageUpdate = () => {
    const updatedSearchedUser =
      JSON.parse(localStorage.getItem("searcheduser")) || null;
    setSearchedUser(updatedSearchedUser);
  };

  return (
   
    <>
    <Topbar/>
    {loading?(
      <Loader/>
    ):(
    
      <div className="profile">
        <div className="profile-card">
          <div className="profile-info">
            <div>
              {console.log(searchedUser)}
              {searchedUser !== null ? (
                <>
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
                            (searchedUser?.name
                              ? searchedUser?.name.charCodeAt(0)
                              : 0) % 20
                          ],
                      }}
                    >
                      {searchedUser?.name ? searchedUser?.name.charAt(0) : ""}
                    </h2>
                  )}
                  <h3 className="userName">{searchedUser.name}</h3>
                  {console.log(searchedUser.name)}
                  <div className="butn">
                    <Button
                      title="Connect"
                      icon={FaUserPlus}
                      onClick={() => goToRoute("/maintenance")}
                    />
                    <Button
                      title="Message"
                      icon={FaPaperPlane}
                      onClick={() => goToRoute("/maintenance")}
                    />
                    <Button
                      title="More"
                      onClick={() => goToRoute("/maintenance")}
                    />
                  </div>
                </>
              ) : (
                <>
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
                            (currentUser?.data?.name
                              ? currentUser?.data?.name.charCodeAt(0)
                              : 0) % 20
                          ],
                      }}
                    >
                      {currentUser?.data?.name
                        ? currentUser?.data?.name.charAt(0)
                        : ""}
                    </h2>
                  )}
                  <h3 className="userName">
                    {currentUser?.data?._id !== id
                      ? id
                      : currentUser?.data?.name}
                  </h3>
                  <p className="heading">
                    {currentUser?.data?._id !== id
                      ? id
                      : currentUser?.data?.email}
                  </p>

                  <p className="heading">
                    joined At
                    {currentUser?.data?._id !== id
                      ? id
                      : timeStampConversionToDateAndTime(
                          currentUser?.data?.createdAt
                        )}
                  </p>
                  <div className="butn">
                    <Button
                      title="Connect"
                      icon={FaUserPlus}
                      onClick={() => goToRoute("/maintenance")}
                    />
                    <Button
                      title="Message"
                      icon={FaPaperPlane}
                      onClick={() => goToRoute("/maintenance")}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="advert">
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
                    (currentUser?.data?.name
                      ? currentUser?.data?.name.charCodeAt(0)
                      : 0) % 20
                  ],
              }}
            >
              {currentUser?.data?.name ? currentUser?.data?.name.charAt(0) : ""}
            </h2>
            <img className="linklogo" src={LinkedinLogo} />
          </div>
          <p>See who's viewed your profile in the last 90 days</p>
          <Button title="Try for free!" />
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
