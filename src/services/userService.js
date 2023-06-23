import axios from "../axios";

const handleLoginApi = (emailUser, passwordUser) => {
  return axios.post("/api/login", { email: emailUser, password: passwordUser });
};

export { handleLoginApi };
