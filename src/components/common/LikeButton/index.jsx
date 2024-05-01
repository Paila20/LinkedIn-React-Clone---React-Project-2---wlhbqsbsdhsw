import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import {
  BsFillHandThumbsUpFill,
  BsHandThumbsUp,
  BsTrash,
} from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { TiThumbsUp } from 'react-icons/ti';
import { Button, Col, Form, Input, Row } from "antd";
import {
  createComments,
  deleteComments,
  dislikeaPost,
  fetchComments,
  likeaPost,
  updatePost,
} from "../../../utils/user/post";
import "./index.css";
import { toast } from "react-toastify";
import { timeStampConversionToDateAndTime } from "../../../helpers/timeStampConversion";
import { UseAuthContext } from "../../../helpers/AuthContext";
import { BACKGROUND_COLORS } from "../../../utils/user/login";
import { FaEllipsisH } from "react-icons/fa";

export default function LikeButton({
  posts,
  fetchingPosts,
}) {
  const [commentForm] = Form.useForm();
  const [showCommentBox, setShowCommentBox] = useState(false);

  const [like, setLike] = useState(posts.likeCount);
  const [toggle, setToggle] = useState(false);
  const { currentUser } = UseAuthContext();
  const [comments, setComments] = useState([]);
  const [activeCommentActions, setActiveCommentActions] = useState(null);
 const {darkmode} = UseAuthContext();

  const handleFetchPostComments = async () => {
    if(currentUser !== undefined){
      const comments = await fetchComments(posts._id, currentUser.token);
      if (comments.status === 200) {
        setComments(comments.data.data);
      }
    }
   
  };

  function Toggle() {
    setToggle(!toggle);
    setLike(like + 1)
    
  }

  const handleLike = async () => {

    if(currentUser !== undefined){
      const liked = await likeaPost(posts._id, currentUser.token);

    if (liked.status === 201) {
      setLike(liked.data);
      fetchingPosts();
    }
    }
    
  };

  const createComment = (values) => {
    commentForm.validateFields().then(async (formValues) => {
      const data = {
        content: formValues.content,
      };

      if(currentUser !== undefined){
        const postComment = await createComments(posts._id, data, currentUser.token);
        if (postComment.status === 200) {
         
          
          handleFetchPostComments();
          fetchingPosts();
          commentForm.resetFields();
        }
      }
     
    });
  };

  const deleteComment = async (comment_id) => {
    if(currentUser !== undefined){
      const deletedComment = await deleteComments(comment_id, currentUser.token);
      if (deletedComment.status === 204) {
        handleFetchPostComments();
        fetchingPosts();
      }
    }
  
  };
  const toggleCommentActions = (commentId) => {
   
    setActiveCommentActions(activeCommentActions === commentId ? null : commentId);
  };

  return (
    <div className="like-container"  style={{ backgroundColor: darkmode ? 'black' : '' }}>
      <p style={{color: darkmode ? 'white': ''}}>
        <span>
          {posts.likeCount}    Likes
       
        </span>{" "}
        & <span>{posts.commentCount} Comments</span>
      </p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div
          className="likes-comment-inner"
          onClick={() => {
            handleLike(), Toggle();
          }}
        >
         

          < BsHandThumbsUp   size={20} className={toggle ? "blue" : "black"}   style={{color: darkmode ? 'white': '',marginTop:20,transform: 'scaleX(-1)'}}/>
          <p className={toggle ? "blue" : "black"}  style={{color: darkmode ? 'white': ''}}>Like</p>
        </div>
        <div
          className="likes-comment-inner"
          onClick={() => {
            setShowCommentBox(!showCommentBox), handleFetchPostComments();
          }}
        >
          {
            <FaRegCommentDots
            style={{color: darkmode ? 'white': '',marginTop:20, transform: 'scaleX(-1)'}}
              size={20}
              color={showCommentBox ? "#0a66c2" : "#212121"}
            />
          }

          <p className={showCommentBox ? "blue" : "black"} style={{color: darkmode ? 'white':''}}>Comments</p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <Form form={commentForm} onFinish={createComment}>
            <Row gutter={24}>
    
              <Col span={24}>
                <Form.Item
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: "Please write something to submit comment!",
                    },
                  ]}
                >
                   <div className="comment-box">
                  <h2
                        className="comment-image"
                        style={{
                          backgroundColor:
                            BACKGROUND_COLORS[
                              (currentUser?.data?.user?.name
                                ? currentUser?.data?.user?.name.charCodeAt(0)
                                : 0) % 20
                            ],
                        }}
                      >
                        {currentUser?.data?.user?.name
                          ? currentUser?.data?.user?.name.charAt(0)
                          : ""}
                      </h2>
                  <Input
                    placeholder="Add a Comment"
                  
                    className={darkmode ? "input-dark-mode " : "comment-input"}
         
                  />
                  </div>
                </Form.Item>
                <Col span={5}>
                <button type="" htmlType="submit" className="add-comment-btn">
                  Post
                </button>
                </Col>
              </Col>
             
            </Row> 
            
  

          </Form>
          {comments.length > 0
            ? comments.map((comment) => {
                return (
                  <div className="all-comments" key={comment._id}
                   style={{ backgroundColor: darkmode ? 'black' : '', border: `1px solid ${darkmode ? 'white' : 'lightgrey'}`}}>
                    <div className="user">
                      <h2
                        className="image"
                        style={{
                          backgroundColor:
                            BACKGROUND_COLORS[
                              (comment?.author_details?.name
                                ? comment?.author_details?.name.charCodeAt(0)
                                : 0) % 20
                            ],
                        }}
                      >
                        {comment?.author_details?.name
                          ? comment?.author_details?.name.charAt(0)
                          : ""}
                      </h2>
                      <p className="namecom"
                      style= {{color : darkmode ? 'white' : ''}}>
                        {" "}
                        {comment?.author_details?.name}
                      </p>

                      <p className="stamp"
                           style= {{color : darkmode ? 'white' : ''}}>
                        {timeStampConversionToDateAndTime(comment.createdAt)}
                      </p>
                      {currentUser?.data?.user?.name ===
                        comment?.author_details?.name && (
                        <div className="ellipsis-container">
                          <FaEllipsisH
                            className="action-icon"
                            onClick={() => toggleCommentActions(comment._id)}
                
                          />
                          { activeCommentActions === comment._id &&  (
                            <BsTrash
                              size={20}
                              className="icon"
                              onClick={() => deleteComment(comment._id)}
                            />
                          )}
                        </div>
                      )}
                    </div>
                    <p className="comment"
                         style= {{color : darkmode ? 'white' : ''}}
                    >{comment.content}</p>
                  </div>
                );
              })
            : null}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
