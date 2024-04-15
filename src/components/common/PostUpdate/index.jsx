import React, { useState, useMemo, useEffect } from "react";

import ModalComponent from "../Modal";
import {
  MdImage,
  MdSubscriptions,
  MdEventNote,
  MdViewDay,
} from "react-icons/md";

import PostsCard from "../PostsCard";
import "./index.css";
import { fetchComments, fetchPost } from "../../../utils/user/post";
import Loader from "../Loader";
import InputOptions from "../InputOptions";
import { UseAuthContext } from "../../../helpers/AuthContext";
import { BACKGROUND_COLORS } from "../../../utils/user/login";
import { useNavigate } from "react-router-dom";


export default function PostUpdate({
  
  currentUser,
  profile,
  handleLocalStorageUpdate,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const [allPosts, setAllPosts] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const [singlePost, setSinglePost] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));

  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };

  useEffect(() => {
    fetchingPosts();
    setLoading(false)
  }, []);

  useEffect(() => {}, [isEdit, modalOpen, singlePost,allPosts]);

  useEffect(() => {}, [currentUser]);

  const fetchingPosts = async () => {
    const posts = await fetchPost();

    if (posts.status === 200) {
      let current = "";
      let finalPostData = [];
      if (profile === true) {
        console.log(currentUser)
        if (typeof currentUser !== "string") {
          localStorage.removeItem("searcheduser");
          current = currentUser?.data?._id;
          finalPostData = posts?.data?.data.filter(
            (item) => item?.author?._id === current
          );
        } else {
          current = currentUser;
          finalPostData = posts?.data?.data.filter(
            (item) => item?.author?._id === current
          );
          localStorage.setItem(
            "searcheduser",
            JSON.stringify(finalPostData[0]?.author)
          );
          handleLocalStorageUpdate();
        }
        setAllPosts(finalPostData);
      } else {
        setAllPosts(posts?.data?.data);
      }
    }
  };

  return loading? (
    <Loader/>
        
      ):(

    <div className='post-status-main'>
      {profile !== true ? (
        <>
          <div className='feed__inputcontainer'>
            <div className="post-status">
              {currentUser?.data?.profileImage ? (
                <img
                  className="post-image"
                  src={currentUser?.data?.profileImage}
                  alt="imageLink"
                />
              ) : (
                <h2
                  className="post-image"
                  style={{
                    backgroundColor:
                      BACKGROUND_COLORS[
                        (userData?.data?.name
                          ? userData?.data?.name.charCodeAt(0)
                          : 0) % 20
                      ],
                  }}
                >
                  {userData?.data?.name ? userData?.data?.name.charAt(0) : ""}
                </h2>
              )}
              <button
                className="open-post-modal"
                onClick={() => {
                  setModalOpen(true);
                  setSinglePost(null);
                  setIsEdit(false);
                }}
              >
                Start a Post
              </button>
            </div>
            <div className="feed__inputoptions">
              <InputOptions
                Icon={MdImage}
                title="Photo"
                color="#70B5F9"
                onClick={() => goToRoute("/maintenance")}
              />
              <InputOptions
                Icon={MdSubscriptions}
                title="Video"
                color="#E7A33E"
                onClick={() => goToRoute("/maintenance")}
              />
              <InputOptions
                Icon={MdEventNote}
                title="Event"
                color="#C0CBCD"
                onClick={() => goToRoute("/maintenance")}
              />
              <InputOptions
                Icon={MdViewDay}
                title="Write Article"
                color="#C7FC15E"
                onClick={() => goToRoute("/maintenance")}
              />
            </div>
          </div>

          {modalOpen ? (
            <ModalComponent
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              fetchingPosts={fetchingPosts}
              isEdit={isEdit}
              posts={singlePost}
            />
          ) : null}
        </>
      ) : null}

      <div>
        {allPosts.length > 0 ? (
          allPosts?.map((post) => {
            return (
              <div key={post._id}>
                <PostsCard
                  posts={post}
                  currentUser={currentUser}
                  fetchingPosts={fetchingPosts}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  setModalOpen={setModalOpen}
                  setSinglePost={setSinglePost}
                />
              </div>
            );
          })
        ) : (
           <div className="posts">You haven't posted anything yet</div>
          )} 
      </div>
    </div>
  
  )
}
