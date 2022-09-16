import apiClient from "../config/ApiClient";

class AuthServices {
  login = (req) => apiClient().post("ebudget/login", req);
}

export default new AuthServices();
