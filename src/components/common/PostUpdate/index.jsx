import React, { useState, useMemo, useEffect } from "react";

import ModalComponent from "../Modal";
import { MdImage, MdSubscriptions, MdEventNote, MdViewDay } from 'react-icons/md';

import PostsCard from "../PostsCard";
import "./index.scss";
import { fetchComments, fetchPost } from "../../../utils/user/post";

import InputOptions from "../InputOptions";

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
     <div className="feed__inputcontainer">
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
          <img
          className="post-image"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="imageLink"
        />
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
      <div className="feed__inputoptions">
          <InputOptions Icon={MdImage} title="Photo" color="#70B5F9" />
          <InputOptions
            Icon={MdSubscriptions}
            title="Video"
            color="#E7A33E"
          />
          <InputOptions Icon={MdEventNote} title="Event" color="#C0CBCD" />
          <InputOptions
            Icon={MdViewDay}
            title="Write Article"
            color="#C7FC15E"
          />
        </div>
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
