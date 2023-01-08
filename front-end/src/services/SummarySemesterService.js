import Api from "./Api";

export default {
  
  searchSummarySemester(data) {
    return Api.get("api/summarySemester/search", data);
  },
  reset() {
    return Api.get("api/summarySemester/reset");
  },
};