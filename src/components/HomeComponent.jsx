import React, { useEffect } from "react";
import "../css/HomeComponent.css";
import Sidebar from "./common/Sidebar";
import Widgets from "./common/Widgets";
import { UseAuthContext } from "../helpers/AuthContext";
import Topbar from "./common/Topbar";
import PostUpdate from "./common/PostUpdate";
import { useNavigate } from "react-router-dom";

export const HomeComponent = () => {
  let navigate = useNavigate();
  const {currentUser} = UseAuthContext();

  useEffect(() => {
    localStorage.removeItem("searcheduser");
  });

  useEffect(() => {

  },[currentUser] )
  
  useEffect(()=>{
    if(typeof (localStorage.getItem('token')) !==  'string'){
    goToLogin();
    }
  },[])
 
  function goToLogin() {
    navigate('/login')
  } 

  return (
    <>
    <Topbar/>
    <div className="home-component">
      <Sidebar  />
      <PostUpdate profile={false} currentUser={currentUser}/>
      <Widgets />
    </div>
    </>
  );
};
