import React, { useState } from 'react';
import "./index.css";
import Button from "../Button";
import { InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { UseAuthContext } from '../../../helpers/AuthContext';
import { FaEllipsisH } from 'react-icons/fa';

import { BACKGROUND_COLORS } from '../../../utils/user/login';
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import { FaCircleDot } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { MdMargin } from 'react-icons/md';
import { getNewsList } from '../../../assets/news';


function Widgets() {
    const{currentUser} =UseAuthContext();

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
        < div className='wid'>
        <div className='widgets'>
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <InfoCircleOutlined/>
            </div>
            
         
                <div className="widgets__article">
                {newsArray.map((data, i) => {
                  return (
                    <div key={i}>
                      <div className=''>
                        <p className=''><FaCircleDot style={{scale: "0.5"}}/> {data.headLine}</p>
                        <p className=''>{data.telecastedAt} ago</p>
                      </div>
                    </div>
                  );
                })}
                <button  className='lessbtn' onClick={showLess ? handleShowLess : handleShowMore}>
                  {showLess ? "Show less" : "Show more"} {showLess ? <IoChevronUp /> : <IoChevronDown />}
                </button>
        
             </div>
            
        </div> 
        
        <div className='advertcard'>
        <p className="adc">
            Ad <FaEllipsisH />
          </p>
          <p className='logname'>{currentUser?.data?.user?.name}, boost your job search with premium</p>
          <div className="img">
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
            <img className="linklogo" src={LinkedinLogo} />
          </div>
          <p className='data'>See who's viewed your profile in the last 90 days</p>
          <button className='bt'> Try for free! </button>
        </div>
       
       
        </div>
    );

}

export default Widgets;