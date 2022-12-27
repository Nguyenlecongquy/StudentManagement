import Api from "./Api";

export default {
  addFaculty(data) {
    return Api.post("api/faculty/add", data);
  },
  deleteFaculty(data) {
    return Api.delete("api/faculty/remove", data);
  },
  editFaculty(data) {
    return Api.put("api/faculty/modify", data);
  },
  searchFaculty(data) {
    return Api.get("api/faculty/search", data);
  },
  reset() {
    return Api.get("api/faculty/reset");
  },
};