import { Avatar } from 'antd';
import React from 'react';
import './index.css';
import { BACKGROUND_COLORS } from '../../../utils/user/login';

function Sidebar({currentUser, posts}) {
   console.log(posts);
   console.log(currentUser)


    const recentItem = (topic) => (
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">#</span>
            <p>{topic}</p>
        </div>
    )

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="https://www.geeklawblog.com/wp-content/uploads/sites/528/2018/12/liprofile-656x369.png" alt="" />
                {/* <Avatar className="sidebar__avatar" src={currentUser.photoUrl}> {currentUser.email[0].toUpperCase()} </Avatar>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" > {currentUser.name}</Avatar> */}
                    { 
                currentUser?.data?.profileImage?(
               
                <Avatar src={currentUser?.data?.profileImage} > </Avatar> 
                ) 
                :
                (
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar> 
                )
                }
                <h2>{currentUser?.data?.name}</h2>
                <h4>{currentUser?.data?.email}</h4>
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