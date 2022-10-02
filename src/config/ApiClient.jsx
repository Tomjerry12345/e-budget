import axios from "axios";
import { getToken } from "../values/Utilitas";

const apiClient = () => {
  console.log(`getToken => ${getToken()}`);
  const headers = {
    // "Content-Type": "application/x-www-form-urlencoded",
    // "Content-Type": "application/json",
    "EBUDGET-TOKEN": getToken(),
    // mode: "no-cors",
  };

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    responseType: "json",
    headers: headers,
    // withCredentials: false,
  });

  return axiosInstance;
};

export default apiClient;
