
import React, { useEffect, useState } from "react";
import { Card, Button } from 'antd';
import "./index.css";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import CreateGroup from "../CreateGroup"; 
import { gettingChannel} from "../../../utils/user/search";
import { BACKGROUND_COLORS } from "../../../utils/user/login";
import { Link } from "react-router-dom";
import { displayName } from "react-quill";
import Topbar from '../Topbar';
import { UseAuthContext } from "../../../helpers/AuthContext";



export default function Groups() {
  const [getGroup, setGetGroup] = useState([]);
  const {darkmode, currentUser} = UseAuthContext();

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

  return (
    <div className="group-page">
     <Topbar/>
    <div className="mainContainerGroup" style={{ backgroundColor: darkmode ? 'black' : '' }}>
     
      <Card
      className="cardStyle"
        style={{
          width: '53%',
          marginTop: '25px',
          borderRadius: '10px',
          boxShadow: '0px 0px 0px 0.2px grey',
          position: 'absolute',
          left: '195px',
           backgroundColor: darkmode ? 'black' : '' 
        }}
      >
        <div className="headerGroup " style={{ backgroundColor: darkmode ? 'black' : '' }}>
          <span style={{color: darkmode ? 'white': ''}}>Your groups</span>
          <span>
            <CreateGroup getChannel={getChannel} />
          </span>
        </div>
        <div className="groupList " style={{ backgroundColor: darkmode ? 'black' : '' }}>
          <ul>
   
            {getGroup?.data?.length>0  &&
              getGroup?.data?.map((item, index) => (
               
                  <div key={index} className="listItem">
                     {
                      item?.image? (
                        <img src={item?.image} className='groupProfileImage'/>
                   
                      ):( <h2 className='groupProfileImage'  style={{backgroundColor: BACKGROUND_COLORS[( item?.name ? item?.name.charCodeAt(0) : 0) % 20]}}> 
                      {`${item.name.slice(0,1).toUpperCase()}`}
                     </h2>)
                     }
                     <Link to={`/groupprofile/${item._id}`}>
                    <li className="channelname">{item.name}</li>
                    </Link>
                  </div>
            
                
              ))}
          </ul>
        </div>
      </Card>
    </div>
    </div>
  );
}
