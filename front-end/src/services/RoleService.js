import Api from "./Api";

export default {
  getAllRole() {
    return Api.get("api/role/search");
  },
  getAmountOfGrade(data) {
    return Api.get("api/role/search/grade/numberClass", data);
  },
  updateAmountOfGrade(data) {
    return Api.put("api/role/modify/grade/numberClass", data);
  },
};
