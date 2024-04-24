import { UseAuthContext } from "../../../helpers/AuthContext";
import { BACKGROUND_COLORS, CoverPic } from "../../../utils/user/login";
import { FaEllipsisH, GroupsIcon } from "react-icons/fa";
import { FaUsers, FaGroup } from "react-icons/fa";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import Button from "../Button";

import "./index.css";
import { getChannelID, gettingChannel } from "../../../utils/user/search";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { timeStampConversionToDateAndTime } from "../../../helpers/timeStampConversion";
import Topbar from '../Topbar';

export default function GroupProfile() {
  const { currentUser } = UseAuthContext();
  const { id } = useParams();
  const [channelid, setChannelID] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  const {darkmode} = UseAuthContext();

  useEffect(() => {
    GetChannelID();
  }, []);

  const [getGroup, setGetGroup] = useState([]);

  const getChannel = async () => {
   if(currentUser !== undefined){
    const result = await gettingChannel(currentUser.token);
     console.log(result);
   if(result.status ===   200){
      setGetGroup(result.data);
    

    }
   }
      
  } 
  

  useEffect(() => {
    getChannel();
  }, []);


  const GetChannelID = async () => {
    if (id !== undefined && currentUser !== undefined ) {
      const res = await getChannelID(id, currentUser.token);
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
    <div className="channel-info"style={{ backgroundColor: darkmode ? 'black' : '' }}>
    <Topbar/>
      <div className="channel" style={{ backgroundColor: darkmode ? 'black' : '' }}>
        <div className="side" >
          <div className="top" style={{ backgroundColor: darkmode ? 'black' : '',color: darkmode ? 'white': '',border: `1px solid ${darkmode ? 'white' : 'lightgrey'}` }}>
            <img
              src="https://www.geeklawblog.com/wp-content/uploads/sites/528/2018/12/liprofile-656x369.png"
              alt=""
              className="imgg"
            />

            {channelid?.owner?.profileImage ? (
              <Avatar src={channelid?.owner?.profileImage} className="avatar">
                {" "}
              </Avatar>
            ) : (
              <h2
                className="avatar"
                style={{
                  backgroundColor:
                    BACKGROUND_COLORS[
                      (channelid?.owner?.name
                        ? channelid?.owner?.name.charCodeAt(0)
                        : 0) % 20
                    ],
                }}
              >
                {channelid?.owner?.name
                  ? channelid?.owner?.name.charAt(0)
                  : ""}
              </h2>
            )}

            <h2 className="name ">{channelid?.owner?.name}</h2>
            <h4 className="email">{channelid?.owner?.email}</h4>
            <h4 className="email"> Joined At {timeStampConversionToDateAndTime(channelid.createdAt)}</h4>
            <Link to={'/group'}>
            <h4 className="group"> Groups </h4>
            </Link>
          </div>
        </div>
        <div className="card"  style={{ backgroundColor: darkmode ? 'black' : '',color: darkmode ? 'white': '' ,border: `1px solid ${darkmode ? 'white' : 'lightgrey'}`}}>
          <div className="info"  style={{ backgroundColor: darkmode ? 'black' : '',color: darkmode ? 'white': '' }}>
           <img src='https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="imggg"/>
          
                  
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

                    <h3 className="Name" style={{ color: darkmode ? 'white' : '' }}>{channelid?.name}</h3>
                    <p className="head" style={{ color: darkmode ? 'white' : '' }}>{channelid?.description}</p>
                    <p className=" public">
                      <FaUsers /> Public Group
                    </p>
                   
                
          </div>
        </div>
       <div  className="interestedgroups" style={{ backgroundColor: darkmode ? 'black' : '',color: darkmode ? 'white': '' ,border: `1px solid ${darkmode ? 'white' : 'lightgrey'}`}}>
        <h2 >Groups you might be interested in </h2>
        <div className="groupSide ">
          <ul>
            {getGroup?.data?.length > 5 &&  // Check if there are more than one item
              getGroup?.data?.slice(2,7).map((item, index) => (  // Slice the array to exclude the first item
                <div key={index} className="groupimage">
                  <h2 className='groupimageside' style={{ backgroundColor: BACKGROUND_COLORS[(item?.name ? item?.name.charCodeAt(0) : 0) % 20] }}>
                    {`${item.name.slice(0,1).toUpperCase()}`}
                  </h2>
                 
                    <li className="channelnameside">{item.name}</li>
                    <div><button className="groupsbtn"> Join</button></div>

                   <hr className="hrgroup"></hr>
                </div>
              ))}
          </ul>
        </div>
        </div>
       
        </div>
        <div className="grouppost" style={{ backgroundColor: darkmode ? 'black' : '', color: darkmode? 'white': ' ',border: `1px solid ${darkmode ? 'white' : 'lightgrey'}` }}>
      
          No posts Available
        </div>
     
     
    </div>
  );
}
