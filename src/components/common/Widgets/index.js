import React from 'react';
import "./index.css";

import { InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';


function Widgets() {

    return (
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
    );

}

export default Widgets;