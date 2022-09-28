import axios from "axios";

const apiClient = () => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",

    // "Access-Control-Allow-Origin": "*",
    // "Content-Type": "multipart/form-data",
  };

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    responseType: "json",
    headers: headers,
  });

  return axiosInstance;
};

export default apiClient;
