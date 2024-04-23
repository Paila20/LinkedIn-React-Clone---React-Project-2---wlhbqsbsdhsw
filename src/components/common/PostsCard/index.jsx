import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import LikeButton from "../LikeButton";

import { timeStampConversionToDateAndTime } from "../../../helpers/timeStampConversion";
import "./index.css";
import { deletePost, fetchComments } from "../../../utils/user/post";
import ModalComponent from "../Modal";
import { toast } from "react-toastify";
import { BACKGROUND_COLORS } from "../../../utils/user/login";
import { UseAuthContext } from "../../../helpers/AuthContext";
import { FaEllipsisH } from "react-icons/fa";
import Loader from "../Loader";

export default function PostsCard({
  posts,
  fetchingPosts,
  currentUser,
  setIsEdit,
  setModalOpen,
  setSinglePost,
}) {
 
 const [showActions, setShowActions] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
   
    if (Object.keys(posts).length < 0) {
      setLoading(true);
    }

  }, []);

  useEffect(()=>{

  },[currentUser])
   



 
  const handleDeletePost = async () => {
    if(currentUser !== undefined ){
      const deletedPost = await deletePost(posts._id,  currentUser.token);
      if (deletedPost.status === 204) {
        toast.success("your post deleted successfully");
        fetchingPosts();
      } else {
        toast.error("Something went wrong");
      }
    }
   
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="posts-card" key={posts._id}>
      <div className="post-image-wrapper">
      
        {currentUser?.data?.user?._id === posts?.author?._id && (
          <div className="action-container">
            <FaEllipsisH onClick={() => setShowActions(!showActions)} />
            {showActions && (
              <div className="container">
                <p
                  className="btn"
                  onClick={() => {
                    setModalOpen(true), setIsEdit(true), setSinglePost(posts), setShowActions(!showActions)
                  }}
                >
                  <BsPencil size={20} className="action-icon" />
             
                </p>
                <p className="btn" onClick={handleDeletePost}>
                  <BsTrash size={20} className="action-icon" />

                </p>
              </div>
            )}
          </div>
        )}

        {posts.author.profileImage ? (
          <img
            className="profile-image"
            src={posts.author.profileImage}
            alt="imageLink"
          />
        ) : (
          <h2
            className="profile-image"
            style={{
              backgroundColor:
                BACKGROUND_COLORS[
                  (posts?.author?.name
                    ? posts?.author?.name.charCodeAt(0)
                    : 0) % 20
                ],
            }}
          >
            {posts?.author?.name ? posts?.author?.name.charAt(0) : ""}
          </h2>
        )}

        <div>
          <p className="name">{posts?.author?.name}</p>
          <p className="headline">Writer | Developer</p>
          <p className="timestamp">
            {timeStampConversionToDateAndTime(posts.createdAt)}
          </p>
        </div>
      </div>

      <p className="status">{posts.content}</p>
      {posts?.images && posts?.images?.length > 0 ? (
        <img src={posts?.images[0]} className="post-image" alt="post-image" />
      ) : (
        <></>
      )}

      <LikeButton
        posts={posts}
       fetchingPosts={fetchingPosts}
        currentUser={currentUser}
      />
    </div>
  );
}
