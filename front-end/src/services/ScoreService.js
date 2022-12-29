import Api from "./Api";

export default {
  addScore(data) {
    return Api.post("api/score/add", data);
  },
  deleteScore(data) {
    return Api.delete("api/score/remove", data);
  },
  editScore(data) {
    return Api.put("api/score/modify", data);
  },
  searchScore(data) {
    return Api.get("api/score/search", data);
  },
  reset() {
    return Api.get("api/score/reset");
  },
};