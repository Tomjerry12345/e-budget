import apiClient from "../config/ApiClient";

class MainServices {
  getCoa = (path) => apiClient().get(`/ebudget/${path}/list`);
  uploadCoa = (path, req) => apiClient().post(`/ebudget/${path}/import`, req);
}

export default new MainServices();
