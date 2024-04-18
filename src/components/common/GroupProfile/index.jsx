import { UseAuthContext } from "../../../helpers/AuthContext";
import { BACKGROUND_COLORS, CoverPic } from "../../../utils/user/login";
import { FaEllipsisH, GroupsIcon } from "react-icons/fa";
import { FaUsers, FaGroup } from "react-icons/fa";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import Button from "../Button";

import "./index.css";
import { getChannelID } from "../../../utils/user/search";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { timeStampConversionToDateAndTime } from "../../../helpers/timeStampConversion";
import Topbar from '../Topbar';

export default function GroupProfile() {
  const { currentUser } = UseAuthContext();
  const { id } = useParams();
  const [channelid, setChannelID] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    GetChannelID();
  }, []);

  const GetChannelID = async () => {
    if (id !== undefined) {
      const res = await getChannelID(id);
      console.log(res);
      if (res.status === 200) {
        setChannelID(res.data.data);
      }
    }
  };
  function ToggleFollow(){
    setIsFollowed( !isFollowed );
  }

  return (
    <>
    <Topbar/>
      <div className="channel">
        <div className="side">
          <div className="top">
            <img
              src="https://www.geeklawblog.com/wp-content/uploads/sites/528/2018/12/liprofile-656x369.png"
              alt=""
              className="imgg"
            />

            {currentUser?.data?.profileImage ? (
              <Avatar src={currentUser?.data?.profileImage} className="avatar">
                {" "}
              </Avatar>
            ) : (
              <h2
                className="avatar"
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

            <h2 className="name ">{currentUser?.data?.name}</h2>
            <h4 className="email">{currentUser?.data?.email}</h4>
            <h4 className="email"> Joined At {timeStampConversionToDateAndTime(channelid.createdAt)}</h4>
            <Link to={'/group'}>
            <h4 className="group"> Groups </h4>
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="info">
           
                   
                  
                    <h2
                      className="profile"
                      style={{
                        backgroundColor:
                          BACKGROUND_COLORS[
                            (channelid?.name ? channelid?.name.charCodeAt(0) : 0) % 20
                          ],
                      }}
                    >
                       <button  className="followbtn" onClick={ToggleFollow}>
                        {isFollowed ? 'Unfollow' : 'Follow'}
                    </button>
                      {channelid?.name ? channelid?.name.charAt(0) : ""}
                    </h2>

                    <h3 className="Name">{channelid?.name}</h3>
                    <p className="head">{channelid?.description}</p>
                    <p className=" public">
                      <FaUsers /> Public Group
                    </p>
                   
                
          </div>
        </div>
        <div className="vert">
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
      <div className="grouppost">
      <h1 className="data"> 
      
      About this Group
      </h1>
      <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus fugit quod cumque ex doloribus magnam facere animi tenetur, voluptatibus quam assumenda recusandae totam ratione non. Iure molestias iste blanditiis nihil?
      </p>
       
      </div>
    </>
  );
}
