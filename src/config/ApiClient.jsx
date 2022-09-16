import axios from "axios";

const apiClient = () => {
  // const apiUrl = "https://jsonplaceholder.typicode.com/";
  const apiUrl = "https://apikalla.binaries.id/";

  const axiosInstance = axios.create({
    // baseURL: apiUrl,
    responseType: "json",
  });

  return axiosInstance;
};

export default apiClient;
