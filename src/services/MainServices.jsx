import apiClient from "../config/ApiClient";

class MainServices {
  get = (endPoint) => apiClient().get(`/ebudget/${endPoint}`);
  post = (endPoint, req) => apiClient().post(`/ebudget/${endPoint}`, req);
}

export default new MainServices();
