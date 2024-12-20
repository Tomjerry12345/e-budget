import apiClient from "../config/ApiClient";

class MainServices {
  get = (endPoint, params) =>
    apiClient().get(`/ebudget/${endPoint}`, {
      params,
    });
  post = (endPoint, req) => apiClient().post(`/ebudget/${endPoint}`, req);
  update = (endPoint, req) => apiClient().put(`/ebudget/${endPoint}`, req);
  delete = (endPoint, req) => apiClient().delete(`/ebudget/${endPoint}`, { data: req });
  patch = (endPoint, req) => apiClient().patch(`/ebudget/${endPoint}`, req);
  download = (endPoint, params) =>
    apiClient().get(`/ebudget/${endPoint}`, {
      responseType: "blob",
      params,
    });
  downloadPost = (endPoint, req) =>
    apiClient().post(`/ebudget/${endPoint}`, req, {
      responseType: "blob",
    });
}

export default new MainServices();
