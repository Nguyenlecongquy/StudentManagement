import Api from "./Api";

export default {
  edit(data) {
    return Api.put("api/infor/modify", data);
  },
  search(data) {
    return Api.get("api/infor/search", data);
  },
};
