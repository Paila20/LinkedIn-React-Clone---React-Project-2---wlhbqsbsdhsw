import React, { useEffect } from "react";
import "../Sass/HomeComponent.scss";
import PostStatus from "./common/PostUpdate";
import Sidebar from "./common/Sidebar";
import Widgets from "./common/Widgets";

export const HomeComponent = ({ currentUser }) => {
  useEffect(() => {}, [currentUser]);
  return (
    <div className="home-component">
      <Sidebar currentUser={currentUser} />
      <PostStatus currentUser={currentUser} postingCheck={true} />
      <Widgets />
    </div>
  );
};
