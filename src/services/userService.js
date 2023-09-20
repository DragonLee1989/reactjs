import axios from "../axios";

const handleLoginApi = (emailUser, passwordUser) => {
  return axios.post("/api/login", { email: emailUser, password: passwordUser });
};

const getAllUsers = (userId) => {
  // template string `/api/get-all-users?id=${userId}`
  return axios.get(`/api/get-all-users?id=${userId}`);
};

const createNewUserService = (data) => {
  console.log("Check data from userService React: ", data);
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService };
