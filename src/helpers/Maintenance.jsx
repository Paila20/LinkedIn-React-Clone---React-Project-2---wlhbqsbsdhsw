import React from 'react'
import Topbar from '../components/common/Topbar';
import '../css/Maintenance.css';
import { UseAuthContext } from './AuthContext';
import construction from "../assets/construction.png";
import { useNavigate } from "react-router-dom";

function Maintenance() {
  const {darkmode} = UseAuthContext();
  let navigate = useNavigate();
  const goToRoute= (route) =>{
    navigate(route);
  }

  return (
    <>

     <Topbar/>
     <div style={{ backgroundColor: darkmode ? 'black' : '',color: darkmode ? 'white': '' }} className='container'>

    <div  className='maintenance-container'  >
      <h1>Website is Under Construction</h1>
      <img src= {construction} className='maintenance'/>
      <button className='back-to-home-btn' onClick={()=>{goToRoute('/')}}>Back to home</button>
    </div>
    </div>
    </>
  )
}

export default Maintenance;
