import axios from "axios";

export const ReusableAxios = async (
  url,
  method,
  headers = null,
  data = null
) => {
  const config = {
    url: url,
    method: method,
    headers: headers,
    data: data,
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      return axiosError;
    } else {
      console.error("Non-Axios error:", error.message);
      return error.message;
    }
  }
};




