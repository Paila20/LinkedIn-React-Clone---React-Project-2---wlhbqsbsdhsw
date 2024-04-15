import { Avatar } from 'antd';
import React, { useEffect } from 'react';
import './index.css';
import { BACKGROUND_COLORS } from '../../../utils/user/login';
import { UseAuthContext } from '../../../helpers/AuthContext';

function Sidebar({theme}) {
const {currentUser , setCurrentUser} = UseAuthContext();

    const recentItem = (topic) => (
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">#</span>
            <p>{topic}</p>
        </div>
    )
    console.log(currentUser) 
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData")) || {};
        if (Object.keys(userData).length > 0) {
         
          setCurrentUser(userData);
        } 
    }, [])
    useEffect(()=>{
     currentUser
    },[])
    return (
        <div className={`sidebar ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
            <div className="sidebar__top">
                <img src="https://www.geeklawblog.com/wp-content/uploads/sites/528/2018/12/liprofile-656x369.png" alt="" />
               
                    { 
                currentUser?.data?.profileImage?(
               
                <Avatar src={currentUser?.data?.profileImage}  className='sidebar__avatar'> </Avatar> 
                ) 
                :
                (
                    <h2 className="sidebar__avatar" style={{backgroundColor: BACKGROUND_COLORS[(currentUser?.data?.name ? currentUser?.data?.name.charCodeAt(0) : 0) % 20]}}>
                    {currentUser?.data?.name ? currentUser?.data?.name.charAt(0) : ''}
                  </h2>

                )
                }
               
                <h2 className='name '>{currentUser?.data?.name}</h2>
                <h4 className='email'>{currentUser?.data?.email}</h4>
            </div>
            <div className="sidebar__stats">
                <div className="sidebar__stat">
                    <p>Who viewed you</p>
                    <p className="sidebar__statNumber">1000</p>
                </div>
                <div className="sidebar__stat">
                    <p>Views on post</p>
                    <p className="sidebar__statNumber">1448</p>
                </div>
            </div>
            <div className="sidebar__bottom">
                <p>Recent</p>
                {recentItem('Never')}
                {recentItem('Give')}
                {recentItem('UP')}
                {recentItem('Keep')}
                {recentItem('Learning')}
            </div>
        </div>
    )
}

export default Sidebar;