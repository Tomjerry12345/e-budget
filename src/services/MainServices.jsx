import apiClient from "../config/ApiClient";

class MainServices {
  get = (endPoint) => apiClient().get(`/ebudget/${endPoint}`, {});
  post = (endPoint, req) => apiClient().post(`/ebudget/${endPoint}`, req);
  delete = (endPoint, req) =>
    apiClient().delete(`/ebudget/${endPoint}`, {
      data: req,
    });
  patch = (endPoint, req) => apiClient().patch(`/ebudget/${endPoint}`, req);
  download = (endPoint) =>
    apiClient().get(`/ebudget/${endPoint}`, {
      responseType: "blob",
    });
}

export default new MainServices();
