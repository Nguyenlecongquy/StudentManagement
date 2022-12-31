import Api from "./Api";

export default {
  getRegulation(data) {
    return Api.post("api/role/search", data);
  },
 
};
