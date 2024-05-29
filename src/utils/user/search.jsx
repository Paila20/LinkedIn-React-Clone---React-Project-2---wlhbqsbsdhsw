import { ReusableAxios } from "../../components/CustomHook/ReusableAxios";

const token = localStorage.getItem("token");
console.log(token);
// var tokenn = JSON.parse(token);


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



