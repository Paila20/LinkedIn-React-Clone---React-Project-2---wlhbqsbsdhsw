import React from 'react';
import "./index.css";
import Button from "../Button";
import { InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { UseAuthContext } from '../../../helpers/AuthContext';
import { FaEllipsisH } from 'react-icons/fa';

import { BACKGROUND_COLORS } from '../../../utils/user/login';
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import { MdMargin } from 'react-icons/md';


function Widgets() {
    const{currentUser} =UseAuthContext();

    return (
        <>
        <div className='widgets'>
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <InfoCircleOutlined/>
            </div>
            
            <div className="widgets__article">
                <div className="separate">
                    <div className="widgets__articleLeft">
                        <ExclamationCircleOutlined />
                    </div>
                    <div className="widgets__articleRight">
                        <h4>Dogecoin</h4>
                        <p>Finally reaches $1</p>
                    </div>
                </div>
                <br/>
                <div className="separate">
                    <div className="widgets__articleLeft">
                        <ExclamationCircleOutlined />
                    </div>
                    <div className="widgets__articleRight">
                        <h4>Tesla</h4>
                        <p>Launches internet in India</p>
                    </div>
                </div>
                <br />
                <div className="separate">
                    <div className="widgets__articleLeft">
                        <ExclamationCircleOutlined/>
                        
                    </div>
                    <div className="widgets__articleRight">
                        <h4>SpaceX SN15</h4>
                        <p>Launching soon!</p>
                    </div>
                </div>
                <br/>
            </div>
        </div>
        <div className='advertcard'>
        <p className="adc">
            Ad <FaEllipsisH />
          </p>
          <p className='logname'>{currentUser?.data?.name}, boost your job search with premium</p>
          <div className="img">
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
          <p className='data'>See who's viewed your profile in the last 90 days</p>
          <button className='bt'> Try for free! </button>
        </div>
        </>
    );

}

export default Widgets;