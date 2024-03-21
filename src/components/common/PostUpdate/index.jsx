import React, { useState, useMemo, useEffect } from "react";

import ModalComponent from "../Modal";

import { getUniqueID } from "../../../helpers/getUniqueId";
import PostsCard from "../PostsCard";
import "./index.scss";
import { fetchComments, fetchPost } from "../../../utils/user/post";
import { BACKGROUND_COLORS } from "../../../utils/user/login";

export default function PostStatus({ currentUser,posts}) {
  console.log(currentUser);
  const [modalOpen, setModalOpen] = useState(false);

  const [allPosts, setAllPosts] = useState([]);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchingPosts();
  }, []);

  useEffect(() => {}, [currentUser]);

  const fetchingPosts = async () => {
    const posts = await fetchPost();

    if (posts.status === 200) {
      setAllPosts(posts.data.data);
    }
  };

  return (
    <div className="post-status-main">
      {/* <div className="user-details">
        <img
          src={
            currentUser?.data?.profileImage
              ? currentUser?.data?.profileImage
              : null
          }
          alt="imageLink"
        />
        <p className="name">
          {console.log(currentUser)}
          {currentUser?.data?.name ? currentUser?.data?.name : "Default User"}
        </p>
        <p className="headline">{currentUser?.data.headline}</p>
       </div>  */}
      <div className="post-status">
        { 
        currentUser?.data?.profileImage?(
        <img
          className="post-image"
          src={currentUser.data.profileImage}
          alt="imageLink"
        />
        )
        :
        (
        <h2 className= "post-image" style={{backgroundColor: BACKGROUND_COLORS[(currentUser.data.name.charCodeAt(0))%20]}}>{currentUser.data.name.charAt(0)}</h2>
        )
      }
        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Start a Post
        </button>
      </div>

      {modalOpen ? (
        <ModalComponent
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          fetchingPosts={fetchingPosts}
          isEdit={false}
          posts={null}
        />
      ) : null}

      <div>
        {allPosts.map((posts) => {
          return (
            <div key={posts._id}>
              <PostsCard
                posts={posts}
                currentUser={currentUser}
                // getEditData={getEditData}
                fetchingPosts={fetchingPosts}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
