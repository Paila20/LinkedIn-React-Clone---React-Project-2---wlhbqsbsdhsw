import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import LikeButton from "../LikeButton";

import { timeStampConversionToDateAndTime } from "../../../helpers/timeStampConversion";
import "./index.scss";
import { deletePost, fetchComments } from "../../../utils/user/post";
import ModalComponent from "../Modal";
import { toast } from "react-toastify";
import { BACKGROUND_COLORS } from "../../../utils/user/login";

export default function PostsCard({ posts, currentUser, fetchingPosts }) {
  // console.log(posts)
  let navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [openEditPost, setOpenEditPost] = useState(false);

  useEffect(() => {
    handleFetchPostComments();
  }, []);

  const handleFetchPostComments = () => {
    if (posts.commentCount > 0) {
      setTimeout(async () => {
        const comments = await fetchComments(posts._id);
        if (comments.status === 200) {
          setComments(comments.data.data);
        }
      }, 500);
    }
  };

  const handleDeletePost = async () => {
    const deletedPost = await deletePost(posts._id);
    if (deletedPost.status === 204) {
      toast.success("your post deleted successfully");
      fetchingPosts();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="posts-card" key={posts._id}>
      <div className="post-image-wrapper">
        {currentUser?.data?._id === posts?.author?._id ? (
          <div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => setOpenEditPost(true)}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={handleDeletePost}
            />
          </div>
        ) : (
          <></>
        )}
           { 
        posts.author.profileImage?(
        <img
          className="profile-image"
          src={posts.author.profileImage}
          alt="imageLink"
        />
        )
        :
        (
          <img
          className="profile-image"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="imageLink"
        />

        )  
      }
       
        <div>
          <p
            className="name"
          
          >
            {posts?.author?.name}
          </p>
          <p className="headline">Writer | Developer</p>
          <p className="timestamp">
            {timeStampConversionToDateAndTime(posts.createdAt)}
          </p>
             
        </div>
      </div>
          
          <p className="status">{posts.content}</p>
         {posts?.images && posts?.images?.length > 0 ? (
             <img
          src={posts?.images[0]}
          className="post-image"
          alt="post-image"
              />
           
          ) :(
            <></>
           )
           }
       
 
      <LikeButton
        posts={posts}
        handleFetchPostComments={handleFetchPostComments}
        comments={comments}
        fetchingPosts={fetchingPosts}
      />

      {/* <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          onClick={() => setImageModal(true)}
          src={posts?.postImage}
          className="post-image modal"
          alt="post-image"
        />
      </Modal> */}
      {/* {openEditPost === true ? (
        <ModalComponent
          modalOpen={openEditPost}
          setModalOpen={setOpenEditPost}
          fetchingPosts={fetchingPosts}
          isEdit={true}
          posts={posts}
        />
      ) : null} */}
    </div>
  );
  // : (
  //   <></>
  // );
}
