import React, { useState } from 'react';
import { InfoCircleOutlined} from '@ant-design/icons';
import { UseAuthContext } from '../../../helpers/AuthContext';
import { FaEllipsisH } from 'react-icons/fa';
import linkedin from "../../../assets/Linkedin.png";
import { BACKGROUND_COLORS } from '../../../utils/user/login';
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { getNewsList } from '../../../assets/news';
import "./index.css";

function Widgets() {
    const{currentUser, darkmode} =UseAuthContext();

    const newsList = getNewsList();
    const splicedList = newsList.slice(0, 5);
    const [showLess, setShowLess] = useState(false);
    const [newsArray, setNewsArray] = useState(splicedList);
  

    const handleShowMore = () => {
        setShowLess(true);
        setNewsArray(newsList);
      };
    
      const handleShowLess = () => {
        setShowLess(false);
        setNewsArray(splicedList);
      };
    

    return (
        < div className='wid'  style={{ backgroundColor: darkmode ? 'black' : '' }}>
        <div className='widgets' style={{ backgroundColor: darkmode ? 'black' : '' }}>
            <div className="widgets__header" style={{ backgroundColor: darkmode ? 'black' : '' }}>
                <h2 style={{color: darkmode ? 'white': ''}}>LinkedIn News</h2>
                <InfoCircleOutlined style={{color: darkmode ? 'white': ''}}/>
            </div>
            
         
                <div className="widgets__article" style={{ backgroundColor: darkmode ? 'black' : '' }}>
                {newsArray.map((data, i) => {
                  return (
                    <ul key={i}>
                    <li style={{color: darkmode ? 'white': '',marginLeft : 15}}>
                      <p style={{color: darkmode ? 'white': ''}}> {data.headLine}</p>
                      <p style={{color: darkmode ? 'white': '',fontSize: 12}}>{data.telecastedAt} ago</p>
                    </li>
                    </ul>
                  );
                })}
                <button  className='lessbtn' onClick={showLess ? handleShowLess : handleShowMore}>
                  {showLess ? "Show less" : "Show more"} {showLess ? <IoChevronUp /> : <IoChevronDown />}
                </button>
        
             </div>
            
        </div> 
        
        <div className='advertcard' style={{ backgroundColor: darkmode ? 'black' : '', border: `1px solid ${darkmode ? 'white' : 'lightgrey'}`}}>
        <p className="adc" style={{color: darkmode ? 'white': ''}}>
            Ad <FaEllipsisH  style={{color: darkmode ? 'white': ''}}/>
          </p>
          <p className='logname' style={{color: darkmode ? 'white': ''}}>{currentUser?.data?.user?.name}, boost your job search with premium</p>
          <div className="img" style={{color: darkmode ? 'white': ''}}>
            <h2
              className="logoo"
              style={{
                backgroundColor:
                  BACKGROUND_COLORS[
                    (currentUser?.data?.user?.name
                      ? currentUser?.data?.user?.name.charCodeAt(0)
                      : 0) % 20
                  ],
              }}
            >
              {currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charAt(0) : ""}
            </h2>
            <img className="linklogo" src={LinkedinLogo} style={{color: darkmode ? 'white': ''}}/>
          </div>
          <p className='data'style={{color: darkmode ? 'white': ''}}>See who's viewed your profile in the last 90 days</p>
          <button className='bt'> Try for free! </button> 
         
        </div>
       <div >
        <img  className = "inlogo" src={linkedin}/>
        <div className='corp' style={{color: darkmode ? 'white': ''}}>LinkedIn Corporation © 2024</div>
       </div>
       
        </div>
    );

}

export default Widgets;