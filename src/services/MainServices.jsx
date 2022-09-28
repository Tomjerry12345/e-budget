import apiClient from "../config/ApiClient";

class MainServices {
  get = (endPoint) => apiClient().get(`/ebudget/${endPoint}`);
  post = (endPoint, req) => apiClient().post(`/ebudget/${endPoint}`, req);
  delete = (endPoint, req) => apiClient().delete(`/ebudget/${endPoint}`, req);
}

export default new MainServices();
