
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



export default function Groups() {
  const [getGroup, setGetGroup] = useState([]);

  const getChannel = async () => {
   
      const result = await gettingChannel();
     console.log(result);
   if(result.status ===   200){
      setGetGroup(result.data);
      // console.log("he", result.data); 

    }
  } 
  

  useEffect(() => {
    getChannel();
  }, []);

  return (
    <>
     <Topbar/>
    <div className="mainContainerGroup">
     
      <Card
      className="cardStyle"
        style={{
          width: '53%',
          marginTop: '25px',
          borderRadius: '10px',
          boxShadow: '0px 0px 0px 0.2px grey',
          position: 'absolute',
          left: '195px',
        }}
      >
        <div className="headerGroup ">
          <span>Your groups</span>
          <span>
            <CreateGroup getChannel={getChannel} />
          </span>
        </div>
        <div className="groupList ">
          <ul>
            {console.log(getGroup)}
            {getGroup?.data?.length>0  &&
              getGroup?.data?.map((item, index) => (
               
                  <div key={index} className="listItem">
                    
                     
                        <h2 className='groupProfileImage'  style={{backgroundColor: BACKGROUND_COLORS[( item?.name ? item?.name.charCodeAt(0) : 0) % 20]}}> 
                        {`${item.name.slice(0,1).toUpperCase()}`}
                       </h2>
                
                    
                    <Link to={`/groupprofile/${item._id}`}>
                    <li className="channelname">{item.name}</li>
                    </Link>
                  </div>
            
                
              ))}
          </ul>
        </div>
      </Card>
    </div>
    </>
  );
}
