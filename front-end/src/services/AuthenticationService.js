import Api from "./Api";

export default {
  register(data) {
    return Api.post("user/register", data);
  },
  login(data) {
    return Api.post("user/login", data);
  },
};
