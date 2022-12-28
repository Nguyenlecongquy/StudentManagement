import Api from "./Api";

export default {
  addClass(data) {
    return Api.post("api/class/add", data);
  },
  deleteClass(data) {
    return Api.delete("api/class/remove", data);
  },
  editClass(data) {
    return Api.put("api/class/modify", data);
  },
  searchClass(data) {
    return Api.get("api/class/search", data);
  },
  reset() {
    return Api.get("api/class/reset");
  },
};
