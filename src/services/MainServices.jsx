import apiClient from "../config/ApiClient";

class MainServices {
  get = (endPoint) =>
    apiClient().get(`/ebudget/${endPoint}`, {
      // headers: {
      //   "EBUDGET-TOKEN": getToken(),
      // },
    });
  post = (endPoint, req) => apiClient().post(`/ebudget/${endPoint}`, req);
  delete = (endPoint, req) =>
    apiClient().delete(`/ebudget/${endPoint}`, {
      data: req,
    });
}

export default new MainServices();
