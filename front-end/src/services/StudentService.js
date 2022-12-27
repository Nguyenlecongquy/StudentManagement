import Api from "./Api";

export default {
  addStudent(data) {
    return Api.post("api/student/add", data);
  },
  deleteStudent(data) {
    return Api.delete("api/student/remove", data);
  },
  editStudent(data) {
    return Api.put("api/student/modify", data);
  },
  searchStudent(data) {
    return Api.get("api/student/search", data);
  },
  reset() {
    return Api.get("api/student/reset");
  },
};