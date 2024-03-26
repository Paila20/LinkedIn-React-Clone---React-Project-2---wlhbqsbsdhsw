import React, { useState, useMemo } from "react";

import PostsCard from "../PostsCard";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../FileUploadModal";
// import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import "./index.scss";

export default function ProfileCard({ onEdit, currentUser,posts }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
 console.log(currentUser)
 
 

  return (
    <>
     
      <div className="profile-card">
        
        <div className="profile-info">
          <div>
            <img
              className="profile-image"
          
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
            />
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
           
           
          </div>

         
        </div>
       

       
      </div>

      <div className="post-status-main">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
}
