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
  userId,
  currentUser,
  profile,
  handleLocalStorageUpdate,
}) {
  console.log(currentUser)
  const [modalOpen, setModalOpen] = useState(false);

  const [allPosts, setAllPosts] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const [singlePost, setSinglePost] = useState(null);
  const {darkmode} = UseAuthContext();
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
  
  useEffect(()=>{
    fetchingPosts();
  },[userId])

  const fetchingPosts = async () => {
  
    const posts = await fetchPost();
     console.log(posts)
    if (posts.status === 200) {
   
      let finalPostData = [];
      if (profile === true) {
      
        if (userId !== "undefined") {
          finalPostData = posts?.data?.data.filter(
            (item) => item?.author?._id === userId
          );
        
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

    <div className='post-status-main' style={{ backgroundColor: darkmode ? 'black' : '' }}>
      {profile !== true ? (
        <>
          <div className='feed__inputcontainer' style={{ backgroundColor: darkmode ? 'black' : '' }}>
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
                        (userData.data?.user?.name
                          ? userData?.data?.user?.name.charCodeAt(0)
                          : 0) % 20
                      ],
                  }}
                >
                  {userData?.data?.user?.name ? userData?.data?.user?.name.charAt(0) : ""}
                </h2>
              )}
              <button
                className="open-post-modal"
                style={{ backgroundColor: darkmode ? 'black' : '' }}
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
                title="Media"
                color="#70B5F9"
                size={30}
                onClick={() => goToRoute("/maintenance")}
              />
             
              <InputOptions
                Icon={MdEventNote}
                title="Event"
                color="#FFA500"
                size={30}
                onClick={() => goToRoute("/maintenance")}
              />
              <InputOptions
                Icon={MdViewDay}
                title="Write Article"
                color="#FFA500"
                size={30}
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
              currentUser={currentUser}
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
           <div className="posts">
            <Loader/>
           </div>
          )} 
      </div>
    </div>
  
  )
}
