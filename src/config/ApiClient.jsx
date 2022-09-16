import axios from "axios";

const apiClient = () => {
  // const apiUrl = "https://jsonplaceholder.typicode.com/";
  const apiUrl = process.env.REACT_APP_BASE_URL;

  const axiosInstance = axios.create({
    // baseURL: apiUrl,
    responseType: "json",
  });

  return axiosInstance;
};

export default apiClient;
