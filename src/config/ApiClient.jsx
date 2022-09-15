import axios from "axios";

const apiClient = () => {
  // const apiUrl = "https://jsonplaceholder.typicode.com/";
  const apiUrl = "http://103.179.56.242:8081";

  const axiosInstance = axios.create({
    baseURL: apiUrl,
    responseType: "json",
  });

  return axiosInstance;
};

export default apiClient;
