import Api from "./Api";

export default {
  
  searchSummary(data) {
    return Api.get("api/summary/search", data);
  },
  reset() {
    return Api.get("api/summary/reset");
  },
};