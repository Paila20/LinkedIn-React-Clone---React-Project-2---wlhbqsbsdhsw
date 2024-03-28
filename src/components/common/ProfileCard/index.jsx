// import React, { useState, useMemo } from "react";

// import PostsCard from "../PostsCard";
// import { HiOutlinePencil } from "react-icons/hi";

// import "./index.scss";
// import PostStatus from "../PostUpdate";

// export default function ProfileCard({
//   // onEdit,
//   currentUser,
//   posts
// }) {
//   return (
//     <>
//       <div className="profile-card">
//         <div className="profile-info">
//           <div>
//           {currentUser?.data?._id === posts?.author._id?(
//             <>
//             {currentUser?.data?.profileImage ? (
//               <img
//                 className="profile-image"
//                 src={currentUser.data.profileImage}
//                 alt="profile-image"
//               />
//             ) : (
//               <img
//                 className="profile-image"
//                 src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
//                 alt="profile-image"
//               />
//             )}

//             <h3 className="userName">{currentUser?.data?.name}</h3>
//             <p className="heading">{currentUser?.data?.email}</p>
//             </>
//           ):(
//             <>
//             {posts?.author?.profileImage ? (
//               <img
//                 className="profile-image"
//                 src={posts?.author?.profileImage}
//                 alt="profile-image"
//               />
//             ) : (
//               <img
//                 className="profile-image"
//                 src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
//                 alt="profile-image"
//               />
//             )}

//             <h3 className="userName">{posts?.author?.name}</h3>
//             <p className="heading">{posts?.author?.email}</p>
//           )
//             }
//             </>
//           </div>
//         </div>
//       </div>

     
//       <div className="post-status-main">

//         <PostStatus currentUser={currentUser} postingCheck={false} />
//         {/* {allPosts?.map((posts) => {
//           return (
//             <div key={posts._id}>
//               <PostsCard posts={posts} />
//             </div>
//           );
//         })} */}
//       </div>
//     </>
//   );
// }
import React from "react";
import PostsCard from "../PostsCard";
import { HiOutlinePencil } from "react-icons/hi";
import "./index.scss";
import PostStatus from "../PostUpdate";

export default function ProfileCard({ currentUser, posts }) {
  return (
    <>
      <div className="profile-card">
        <div className="profile-info">
          <div>
            {currentUser?.data?._id === posts?.author._id ? (
              <>
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
              </>
            ) : (
              <>
                {posts?.author?.profileImage ? (
                  <img
                    className="profile-image"
                    src={posts?.author?.profileImage}
                    alt="profile-image"
                  />
                ) : (
                  <img
                    className="profile-image"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="profile-image"
                  />
                )}
                <h3 className="userName">{posts?.author?.name}</h3>
                <p className="heading">{posts?.author?.email}</p>
              </>
            )}
          </div>
        </div>
      </div>
     
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
