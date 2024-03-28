import React, { useState, useMemo } from "react";

import PostsCard from "../PostsCard";
import { HiOutlinePencil } from "react-icons/hi";

import "./index.scss";
import PostStatus from "../PostUpdate";

export default function ProfileCard({
  // onEdit,
  currentUser,
  // posts
}) {
  return (
    <>
      <div className="profile-card">
        <div className="profile-info">
          <div>
            {currentUser?.data?.profileImage ? (
              <img
                className="profile-image"
                src={currentUser.data.profileImage}
                alt="profile-image"
              />
            ) : (
              <img
                className="profile-image"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="profile-image"
              />
            )}

            <h3 className="userName">{currentUser?.data?.name}</h3>
            <p className="heading">{currentUser?.data?.email}</p>
          </div>
        </div>
      </div>

      {/* <div className="profile-card">
        
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
       

       
      </div> */}

      <div className="post-status-main">
        <PostStatus currentUser={currentUser} postingCheck={false} />
        {/* {allPosts?.map((posts) => {
          return (
            <div key={posts._id}>
              <PostsCard posts={posts} />
            </div>
          );
        })} */}
      </div>
    </>
  );
}
