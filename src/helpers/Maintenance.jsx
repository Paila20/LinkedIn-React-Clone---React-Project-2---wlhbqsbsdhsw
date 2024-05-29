import React from 'react'
import Topbar from '../components/common/Topbar';
import '../css/Maintenance.css';
import { UseAuthContext } from './AuthContext';

function Maintenance() {
  const {darkmode} = UseAuthContext();

  return (
    <div style={{ backgroundColor: darkmode ? 'black' : '',color: darkmode ? 'white': '' }}>
     <Topbar/>
    <div  className='maintenancediv'  >
      <img src= 'https://img.freepik.com/premium-vector/flat-design-construction-concept_108061-440.jpg?w=740'/>
    </div>
    </div>
  )
}

export default Maintenance;
