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
    const res = await ReusableAxios(url, "get", headers, item);
   
    return res;
   
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
    const res = await ReusableAxios(url, "get", headers);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const gettingChannel = async (token) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/channel/`;

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

export const getChannelID = async (id, token) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/channel/${id}`;

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
export const gettingpostsofagroup = async (id, token) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/channels/${id}/posts`;

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

export const creatingagroup = async (body, token) => {
  const url = `https://academics.newtonschool.co/api/v1/linkedin/channel/`;

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
