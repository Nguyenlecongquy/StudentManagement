import Api from "./Api";

export default {
  addTeacher(data) {
    return Api.post("api/teacher/add", data);
  },
  deleteTeacher(data) {
    return Api.delete("api/teacher/remove", data);
  },
  editTeacher(data) {
    return Api.put("api/teacher/modify", data);
  },
  searchTeacher(data) {
    return Api.get("api/teacher/search", data);
  },
  reset() {
    return Api.get("api/teacher/reset");
  },
};
