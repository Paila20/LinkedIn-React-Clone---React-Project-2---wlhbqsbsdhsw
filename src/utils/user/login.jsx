

import { ReusableAxios } from "../../components/CustomHook/ReusableAxios";

export const BACKGROUND_COLORS = ["#800080", "#a52a2a", "#ee82ee", "#008080", "#ff7f50", "#800020", "#b7410e", "#4b0082", "#fa8072", "#00ffff", "#dc143c","#31671d", "#43254f", "#ff00ff", "#f28500", "#733635", "#f4c430", "#de3163", "#50c878", "#0f52ba", "#65000b"]

export const SPACE_BACKGROUND_IMAGES=["bkpic1.jpeg","bkpic2.webp","bkpic3.jpeg","bkpic4.jpeg","bkpic5.jpeg","bkpic6.jpeg"]
export const getUsers = async (body) => {
  const url = "https://academics.newtonschool.co/api/v1/user/login";

  const headers = {
    "Content-Type": "application/json",
    projectID: "i1dieevrt9g1",
  };
  try {
    const getUsers = await ReusableAxios(url, "post", headers, body);
    return getUsers;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const registerAPI = async (body) => {
  const url = "https://academics.newtonschool.co/api/v1/user/signup";

  const headers = {
    "Content-Type": "application/json",
    projectID: "i1dieevrt9g1",
  };
  try {
    const registerAPI = await ReusableAxios(url, "post", headers, body);
    return registerAPI;
  } catch (error) {
    console.log(error);
    return error;
  }
};
