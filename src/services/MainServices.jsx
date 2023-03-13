import apiClient from "../config/ApiClient";

class MainServices {
  get = async (endPoint) => await apiClient().get(`/ebudget/${endPoint}`, {});
  post = (endPoint, req) => apiClient().post(`/ebudget/${endPoint}`, req);
  delete = (endPoint, req) =>
    apiClient().delete(`/ebudget/${endPoint}`, {
      data: req,
    });
  patch = (endPoint, req) => apiClient().patch(`/ebudget/${endPoint}`, req);
}

export default new MainServices();
