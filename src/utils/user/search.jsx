import { ReusableAxios } from "../../components/CustomHook/ReusableAxios";

const token = localStorage.getItem("token");
console.log(token);
// var tokenn = JSON.parse(token);

export const searchItem = async (item) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/post?search=`;

  const headers = {
    projectID: "i1dieevrt9g1",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  try {
    const searchItem = await ReusableAxios(url, "get", headers, item);
    return searchItem;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const searchFilter = async (item) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/post?filter=${item}`;

  const headers = {
    projectID: "i1dieevrt9g1",
  };

  try {
    const searchFilter = await ReusableAxios(url, "get", headers);
    return searchFilter;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const gettingChannel = async () => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/channel/`;

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const user = await ReusableAxios(url, "get", headers);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getChannelID = async (id) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/channel/${id}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const user = await ReusableAxios(url, "get", headers);
    console.log(user)
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const gettingpostsofagroup = async (id) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/channels/${id}/posts`;

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const gettingpostsofagroup = await ReusableAxios(url, "get", headers);
    return gettingpostsofagroup;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const creatingagroup = async (body) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/channel/`;

  const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDc5ZWMzN2E2ODMxNjQwNjhlOTYzZSIsImlhdCI6MTcxMjYzOTgzOCwiZXhwIjoxNzQ0MTc1ODM4fQ.7og9dCQow5_CeOPjxSUT-n_2KU06_y3PSLqa3hyUH3g`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const creatingagroup = await ReusableAxios(url, "post", headers, body);
// console.log(creatingagroup);
    return creatingagroup;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const follow = async (id) => {
  const url = `https://academics.newtonschool.co/api/v1/quora/follow/${id}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const follow = await ReusableAxios(url, "post", headers);
    return follow;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const unfollow = async (id) => {
  const url = `https://academics.newtonschool.co/api/v1/quora/follow/${id}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    projectID: "i1dieevrt9g1",
  };
  try {
    const unfollow = await ReusableAxios(url, "delete", headers);
    return unfollow;
  } catch (error) {
    console.log(error);
    return error;
  }
};
