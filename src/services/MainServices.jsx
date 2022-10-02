import apiClient from "../config/ApiClient";
import { getToken } from "../values/Utilitas";

class MainServices {
  get = (endPoint) =>
    apiClient().get(`/ebudget/${endPoint}`, {
      // headers: {
      //   "EBUDGET-TOKEN": getToken(),
      // },
    });
  post = (endPoint, req) => apiClient().post(`/ebudget/${endPoint}`, req);
  delete = (endPoint, req) => apiClient().delete(`/ebudget/${endPoint}`, req);
}

export default new MainServices();
