import { Avatar } from 'antd';
import React, { useEffect } from 'react';
import './index.css';
import { BACKGROUND_COLORS } from '../../../utils/user/login';
import { UseAuthContext } from '../../../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';

function Sidebar({theme}) {
const {currentUser , setCurrentUser ,darkmode} = UseAuthContext();
const navigate = useNavigate();

const goToRoute = (route) => {
    navigate(route);
  };

  
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData")) || {};
        if (Object.keys(userData).length > 0) {
         
          setCurrentUser(userData);
        } 
    }, [])
    useEffect(()=>{
     
    },[currentUser])
    return (
        <div className= 'sidebar'  style={{ backgroundColor: darkmode ? 'black' : '' }} >
            <div className="sidebar__top" style={{ backgroundColor: darkmode ? 'black' : '',border: `1px solid ${darkmode ? 'white' : 'lightgrey'}` }}>
                <img src="https://www.geeklawblog.com/wp-content/uploads/sites/528/2018/12/liprofile-656x369.png" alt="" />
               
                    { 
                currentUser?.data?.profileImage?(
               
                <Avatar src={currentUser?.data?.profileImage}  className='sidebar__avatar'> </Avatar> 
                ) 
                :
                (
                    <h2 className="sidebar__avatar" style={{backgroundColor: BACKGROUND_COLORS[(currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charCodeAt(0) : 0) % 20]}}>
                    {currentUser?.data?.user?.name ? currentUser?.data?.user?.name.charAt(0) : ''}
                  </h2>

                )
                }
               
                <h2 className='name ' style={{color: darkmode ? 'white': ''}} >{currentUser?.data?.user?.name}</h2>
                <h4 className='email' style={{color: darkmode ? 'white': ''}}>{currentUser?.data?.user?.email}</h4>
            </div>
            <div className="sidebar__stats" style={{ backgroundColor: darkmode ? 'black' : '' }}>
                <div className="sidebar__stat">
                    <p>Who viewed you</p>
                    <p className="sidebar__statNumber">1000</p>
                </div>
                <div className="sidebar__stat">
                    <p>Views on post</p>
                    <p className="sidebar__statNumber">1448</p>
                </div>
            </div>
            <div className="sidebar__bottom" style={{ backgroundColor: darkmode ? 'black' : '' }}>
                <ul className='sidebar__list'>
                    <li onClick ={()=>goToRoute('/group')} >
                        Groups
                    </li>
                    <li className='side__li'>
                        Events
                    </li>
                    <li>
                        Followed Hashtags
                    </li>
                </ul>
                 <hr className='side__hr'></hr>
                 <p className='side__more' style={{color : darkmode ? "white" : ""}}>Discover More</p>
            </div>
        </div>
    )
}

export default Sidebar;