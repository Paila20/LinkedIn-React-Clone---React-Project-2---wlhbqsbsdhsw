import { ReusableAxios } from "../../components/CustomHook/ReusableAxios";

const token = JSON.parse(localStorage.getItem("token"));
// var tokenn = JSON.parse(token);
// console.log(tokenn["token"])

export const createPost = async (body, token) => {
  const url = "https://academics.newtonschool.co/api/v1/linkedin/post/";

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const createPost = await ReusableAxios(url, "post", headers, body);
    return createPost;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updatePost = async (data, id, token) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/post/${id}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const updatePost = await ReusableAxios(url, "patch", headers, data);
    return updatePost;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const deletePost = async (id, token) => {
  const url = "https://academics.newtonschool.co/api/v1/linkedin/post/" + id;

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const deletePost = await ReusableAxios(url, "delete", headers);
    return deletePost;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchPost = async () => {
  const url = "https://academics.newtonschool.co/api/v1/linkedin/post?limit=80";

  const headers = {
    projectID: "i1dieevrt9g1",
  };
  try {
    const fetchPost = await ReusableAxios(url, "get", headers);
    return fetchPost;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const likeaPost = async (post_id,token) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/like/${post_id}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  console.log(token)
  try {
    const likeaPost = await ReusableAxios(url, "post", headers);
    return likeaPost;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const dislikeaPost = async (post_id) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/like/${post_id}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const dislikeaPost = await ReusableAxios(url, "delete", headers);
    return dislikeaPost;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchComments = async (post_id, token) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/post/${post_id}/comments`;

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const fetchComments = await ReusableAxios(url, "get", headers);
    return fetchComments;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const createComments = async (post_id, body, token) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/comment/${post_id}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const createComments = await ReusableAxios(url, "post", headers, body);
    return createComments;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const deleteComments = async (comment_id, token) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/comment/${comment_id}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const deleteComments = await ReusableAxios(url, "delete", headers);
    return deleteComments;
  } catch (error) {
    console.log(error);
    return error;
  }
};
