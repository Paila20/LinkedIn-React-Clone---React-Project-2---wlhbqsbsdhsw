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
    const res = await ReusableAxios(url, "post", headers, body);
    return res;
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
    const res = await ReusableAxios(url, "patch", headers, data);
    return res;
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
    const res = await ReusableAxios(url, "delete", headers);
    return res;
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
    const res = await ReusableAxios(url, "get", headers);
    return res;
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
    const res = await ReusableAxios(url, "post", headers);
    return res;
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
    const res = await ReusableAxios(url, "delete", headers);
    return res;
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
    const res = await ReusableAxios(url, "get", headers);
    return res;
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
    const res = await ReusableAxios(url, "post", headers, body);
    return res;
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
    const res = await ReusableAxios(url, "delete", headers);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const gettingUserInfo = async (id, token) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/user/${id}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const res = await ReusableAxios(url, "get", headers);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
