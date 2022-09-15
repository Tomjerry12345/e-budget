import apiClient from "../config/ApiClient";

class UsersService {
  getAllUsers = () => apiClient().get("users");
}

export default new UsersService();
