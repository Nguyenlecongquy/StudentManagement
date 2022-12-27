import Api from "./Api";

export default {
  addSubject(data) {
    return Api.post("api/subject/add", data);
  },
  deleteSubject(data) {
    return Api.delete("api/subject/remove", data);
  },
  editSubject(data) {
    return Api.put("api/subject/modify", data);
  },
  searchSubject(data) {
    return Api.get("api/subject/search", data);
  },
  reset() {
    return Api.get("api/subject/reset");
  },
};