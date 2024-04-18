import React, { useEffect } from "react";
import "../css/HomeComponent.css";
import Sidebar from "./common/Sidebar";
import Widgets from "./common/Widgets";
import { UseAuthContext } from "../helpers/AuthContext";
import Topbar from "./common/Topbar";
import PostUpdate from "./common/PostUpdate";

export const HomeComponent = () => {
  const {currentUser} = UseAuthContext();
  useEffect(() => {
    localStorage.removeItem("searcheduser");
  });
  useEffect(() => {

  },[currentUser] )
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
