import axios from "../axios";

const handleLoginApi = (emailUser, passwordUser) => {
  return axios.post("/api/login", { email: emailUser, password: passwordUser });
};

const getAllUsers = (userId) => {
  // template string `/api/get-all-users?id=${userId}`
  return axios.get(`/api/get-all-users?id=${userId}`);
};

const createNewUserService = (user) => {
  console.log("Check data from userService React: ", user);
  return axios.post("/api/create-new-user", user);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

const updateEditUserService = (user) => {
  return axios.put("/api/edit-user", user);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  updateEditUserService,
};
