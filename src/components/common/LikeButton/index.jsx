import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import {
  BsFillHandThumbsUpFill,
  BsHandThumbsUp,
  BsTrash,
} from "react-icons/bs";
import { Button, Col, Form, Input, Row } from "antd";
import {
  createComments,
  deleteComments,
  fetchComments,
  likeaPost,
  updatePost,
} from "../../../utils/user/post";
import "./index.scss";
import { toast } from "react-toastify";
import { timeStampConversionToDateAndTime } from "../../../helpers/timeStampConversion";

export default function LikeButton({
  posts,
  handleFetchPostComments,
  comments,
  fetchingPosts,
}) {
  const [commentForm] = Form.useForm();
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    const liked = await likeaPost(posts._id);

    if (liked.status === 201) {
      console.log(liked);
      setLiked(!liked);
    }
  };

  const createComment = (values) => {
    commentForm.validateFields().then(async (formValues) => {
      const data = {
        content: values.content,
      };
      const postComment = await createComments(posts._id, data);
      if (postComment.status === 200) {
        fetchingPosts();
        handleFetchPostComments();
        commentForm.resetFields();
      }
    });
  };

  const deleteComment = async (comment_id) => {
    const deletedComment = await deleteComments(comment_id);
    if (deletedComment.status === 204) {
      handleFetchPostComments();
    }
  };

  return (
    <div className="like-container">
      <p>
        <span>{posts.likeCount} People Like this Post</span> &{" "}
        <span>{posts.commentCount} People commented this Post</span>
      </p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div className="likes-comment-inner">
          {/* {posts.isLiked === true ? (
            <BsFillHandThumbsUpFill size={30} color="#0a66c2" />
          ) : (
            <Button type="" onClick={handleLike}>
              <span style={{ fontSize: "25px" }}>
                <BsHandThumbsUp />
                Like
              </span>
            </Button>
          )} */}
      
        {liked ? (
            <BsFillHandThumbsUpFill size={30} color="#0a66c2" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}

          <p className={liked ? "blue" : "black"}>Like</p>
        
        </div>
        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          {
            <AiOutlineComment
              size={30}
              color={showCommentBox ? "#0a66c2" : "#212121"}
            />
          }

          <p className={showCommentBox ? "blue" : "black"}>Comments</p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <Form form={commentForm} onFinish={createComment}>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={12} xl={12} lg={12} xxl={12}>
                <Form.Item
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: "Please write something to submit comment!",
                    },
                  ]}
                >
                  <Input placeholder="Add a Comment" className="comment-input"/>
                </Form.Item>
                <Button type="" htmlType="submit" className="add-comment-btn">
                  Add Comment
                </Button>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12} lg={12} xxl={12}></Col>
            </Row>
          </Form>

          {comments.length > 0
            ? comments.map((comment) => {
                return (
                  <div className="all-comments">
                    {/* <p className="name">{comment.}</p> */}
                    <p className="comment">{comment.content}</p>

                    <p className="timestamp">{timeStampConversionToDateAndTime(comment.createdAt)}</p>
                    <BsTrash
                      size={20}
                      className="action-icon"
                      onClick={() => deleteComment(comment._id)}
                    />
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
