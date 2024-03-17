import React, { useState, useMemo, useEffect } from "react";

import ModalComponent from "../Modal";

import { getUniqueID } from "../../../helpers/getUniqueId";
import PostsCard from "../PostsCard";
import "./index.scss";
import { fetchComments, fetchPost } from "../../../utils/user/post";

export default function PostStatus({ currentUser }) {
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
        <img
          className="post-image"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="imageLink"
        />
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
