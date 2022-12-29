import Api from "./Api";

export default {
  
  searchValidAge() {
    return Api.get("api/summary/search", data);
  },
  editValidAge(data) {
    return Api.get("api/summary/search", data);
  },
  searchPassScore(data) {
    return Api.get("api/summary/search", data);
  },
  editPassScore(data) {
    return Api.get("api/summary/search", data);
  },
  reset() {
    return Api.get("api/subject/reset");
  },
};