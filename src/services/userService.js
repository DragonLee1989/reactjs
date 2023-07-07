import axios from "../axios";

const handleLoginApi = (emailUser, passwordUser) => {
  return axios.post("/api/login", { email: emailUser, password: passwordUser });
};

const getAllUsers = (userId) => {
  // template string `/api/get-all-users?id=${userId}`
  return axios.get(`/api/get-all-users?id=${userId}`);
};

export { handleLoginApi, getAllUsers };
