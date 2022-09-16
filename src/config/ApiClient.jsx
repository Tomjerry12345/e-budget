import axios from "axios";

const apiClient = () => {
  // const apiUrl = "https://jsonplaceholder.typicode.com/";
  //
  const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    responseType: "json",
  });

  return axiosInstance;
};

export default apiClient;
