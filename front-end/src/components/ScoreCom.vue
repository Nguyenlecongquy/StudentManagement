<template>
  <div class="pageContent">
    <h2 class="pageContent__heading">Quản lý điểm</h2>
    <div class="search">
      <ButtonVue title="Tìm kiếm" primary="true" @click="search()" />
      <select class="input" v-model="searchValue.classID">
        <option value="" disabled>Chọn lớp</option>
        <option v-for="classID in classesList" v-bind:key="classID">
          {{ classID }}
        </option>
      </select>

      <select class="input" v-model="searchValue.subjectName">
        <option value="" disabled>Môn học</option>
        <option v-for="subjectName in subjectsList" v-bind:key="subjectName">
          {{ subjectName }}
        </option>
      </select>
      <select class="input" v-model="searchValue.semester">
        <option value="" disabled>Học kỳ</option>
        <option v-for="semester in semesters" v-bind:key="semester">
          {{ semester }}
        </option>
      </select>

      <ButtonVue title="Reset" @click="reset()" />
    </div>
    <div class="search">
      <h4>Nhập điểm</h4>

      <input
        class="input ml-0"
        v-model="addedScore.id"
        type="text"
        placeholder="Mã HS"
      />
      <input
        class="input"
        v-model="addedScore.score_15"
        type="text"
        placeholder="15'"
      />
      <input
        class="input"
        v-model="addedScore.score_1t"
        type="text"
        placeholder="1 tiết"
      />
      <input
        class="input mt-12 ml-12"
        v-model="addedScore.score_gk"
        type="text"
        placeholder="Giữa kì"
      />
      <input
        class="input mt-12"
        v-model="addedScore.score_ck"
        type="text"
        placeholder="Cuối kỳ"
      />
      <input
        class="input mt-12"
        v-model="addedScore.score_tk"
        type="text"
        disabled
        placeholder="Tổng kết"
      />
      <ButtonVue
        title="Thêm"
        class="mt-12 ml-0"
        @click="add()"
        primary="true"
      />
      <ButtonVue
        class="mt-12"
        title="Điểm qua môn" 
        primary="true"
        @click="showEditRegulationModal()"
      />
      <p class="passScore" >: {{ passScore }}</p>
    </div>
    <div class="content">
      <table>
        <caption>
          Danh sách học sinh
        </caption>
        <tr>
          <th width="5%">STT</th>
          <th width="15%">Mã HS
            <button @click="sortByGivenName('id')" className="sort-btn">
              <font-awesome-icon
                v-if="sortBy.sortedByASCId == false"
                icon="fa-solid fa-arrow-down-a-z"
              />
              <font-awesome-icon
                v-else-if="sortBy.sortedByASCId == true"
                icon="fa-solid fa-arrow-down-z-a"
              />
              <font-awesome-icon v-else icon="fa-solid fa-arrows-up-down" />
            </button>
          </th>
          <th width="12%">15'(10%)</th>
          <th width="12%">1 tiết(20%)</th>
          <th width="12%">Giữa kỳ(30%)</th>
          <th width="12%">Cuối kỳ(40%)</th>
          <th width="15%">Tổng kết
            <button @click="sortByGivenName('score_tk')" className="sort-btn">
              <font-awesome-icon
                v-if="sortBy.sortedByASCFinalScore == false"
                icon="fa-solid fa-arrow-down-a-z"
              />
              <font-awesome-icon
                v-else-if="sortBy.sortedByASCFinalScore == true"
                icon="fa-solid fa-arrow-down-z-a"
              />
              <font-awesome-icon v-else icon="fa-solid fa-arrows-up-down" />
            </button>
          </th>
          <th width="12%">Kết quả</th>
          <th width="5%"></th>
        </tr>
        <tr v-for="(item, index) in list" :key="item">
          <td>{{ index + 1 }}</td>
          <td>{{ item.id }}</td>

          <td>{{ item.score_15 }}</td>
          <td>{{ item.score_1t }}</td>
          <td>{{ item.score_gk }}</td>
          <td>{{ item.score_ck }}</td>
          <td>{{ item.score_tk }}</td>
          <td> 
            <h3 v-if = "item.score_tk>= passScore" class="resultPassed"> Đạt </h3>
            <h3 v-else class="resultNotPassed">Không đạt</h3>
           </td>
          <td>
            <button class="edit-btn" @click="showModalAndEdit(item)">
              <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </button>
          </td>
        </tr>
      </table>
      <p v-if="list.length == 0" style="text-align: center; margin-top: 10px">
        Không tìm thấy dữ liệu
      </p>
    </div>
    <vue-final-modal
      v-model="showModalRegulation"
      classes="modal-container"
      content-class="modal-content"
    >
      <span class="modal__title">Điểm qua môn: </span>
      <div class="modal__content">
        <input
          class="input"
          v-model="editPassScore"
          type="number"
          placeholder="Điểm qua môn"
        />
      </div>
      <div class="modal__action">
        <ButtonVue title="Sửa" @click="editRegulation()" primary="true" />
        <ButtonVue title="Hủy" @click="cancelEditRegulation()" />
      </div>
    </vue-final-modal>
    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
    >
      <span class="modal__title">Nhập điểm</span>
      <div class="modal__content">
        <input
          class="input"
          v-model="editScore.subjectName"
          type="text"
          placeholder="Môn"
          disabled
        />
        <input
          class="input"
          v-model="editScore.semester"
          type="text"
          placeholder="Học kì"
          disabled
        />
      </div>

      <div class="modal__content">
        <input
          class="input"
          v-model="editScore.id"
          type="text"
          placeholder="Mã HS"
          disabled
        />
        <input
          class="input"
          v-model="editScore.score_15"
          type="text"
          placeholder="15'"
        />
        <input
          class="input"
          v-model="editScore.score_1t"
          type="text"
          placeholder="1 tiết"
        />
        <input
          class="input"
          v-model="editScore.score_gk"
          type="text"
          placeholder="Giữa kỳ"
        />
        <input
          class="input"
          v-model="editScore.score_ck"
          type="text"
          placeholder="Cuối kỳ"
        />
        <input
          class="input"
          v-model="editScore.score_tk"
          type="text"
          disabled
          placeholder="Tổng kết"
        />
      </div>
      <div class="modal__action">
        <ButtonVue title="Sửa" @click="edit()" primary="true" />
        <ButtonVue title="Hủy" @click="showModal = false" />
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import ButtonVue from "./Button.vue";
import ScoreService from "../services/ScoreService";
import ClassService from "../services/ClassService";
import SubjectService from "../services/SubjectService";
import RoleService from '../services/RoleService';

export default {
  fullName: "ScoreCom",
  components: { ButtonVue },
  data() {
    return {
  
      passScore: "",
      editPassScore: "",
      editScore: {
        id: "",

        subjectName: "",
        semester: "",
        score_15: "",
        score_1t: "",
        score_gk: "",
        score_ck: "",
        score_tk: "",
      },
      addedScore: {
        id: "",
        score_15: "",
        score_1t: "",
        score_gk: "",
        score_ck: "",
        score_tk: "",
     
      },
      showModalRegulation: false,
      showModal: false,
      list: [],
      searchValue: {
        classID: "10A1",
        subjectName: "MH00001111",
        semester: "HK1",
      },
      classesList: [],
      subjectsList: [],
      semesters: ["HK1", "HK2"],
      sortBy: {
        sortedByASCId: true,
        sortedByASCFinalScore: undefined,
      },
    };
  },

  mounted() {
    //API for list teachers
    RoleService.getAllRole()
      .then(({ data }) => {
        if (data.status) {
          this.passScore = data.roles.diem_chuan_dat_mon;
          this.editPassScore = this.passScore ;
        }
      })
      .catch((e) => console.log(e));
    ScoreService.searchScore({
      params: {
        classId: "10A1",
        subjectId: "MH00001111",
        semester: "HK1",
      },
    })
      .then(({ data }) => {
        if (data.status) {
          this.list = this.convertData(data.scores);
        }
      })
      .catch((e) => console.log(e));
    //API for list classes
    SubjectService.searchSubject()
      .then(({ data }) => {
        if (data.status) {
          this.subjectsList = Array.from(data.subjects).map((e) => {
            return e.ma_mh.trim();
          });
        }
      })
      .catch((e) => console.log(e));
    ClassService.searchClass({
      params: {
        id: "",
        grade: "",
      },
    })
      .then(({ data }) => {
        if (data.status) {
          this.classesList = Array.from(data.classes).map((e) => {
            return e.ma_lop.trim();
          });
        }
      })
      .catch((e) => console.log(e));
  },

  methods: {
    sortByGivenName(item) {
      let ASC;
      if (item == "id") {
        ASC = !this.sortBy.sortedByASCId;
        this.sortBy.sortedByASCId = !this.sortBy.sortedByASCId;
      }  else if (item == "score_tk") {
        if (this.sortBy.sortedByASCFinalScore == undefined) {
          this.sortBy.sortedByASCFinalScore = false;
        }
        this.sortBy.sortedByASCFinalScore = !this.sortBy.sortedByASCFinalScore;
        ASC = this.sortBy.sortedByASCFinalScore;
      }
      if (ASC) {
        this.list = this.list.sort(function (a, b) {
          if (a[item] < b[item]) return -1;
          if (a[item] > b[item]) return 1;
          return 0;
        });
      } else {
        this.list = this.list.sort(function (a, b) {
          if (a[item] < b[item]) return 1;
          if (a[item] > b[item]) return -1;
          return 0;
        });
      }
    },
    convertData(rawData) {
      
      return rawData.map((e) => {

        return {
          id: e.id,
          subjectName: e.subjectId,
          score_15: e.mark_15,
          score_1t: e.mark_1t,
          score_gk: e.mark_gk,
          score_ck: e.mark_ck,
          score_tk: e.mark_tk,      
        };
      });
    },

    reset() {
      this.searchValue.classID = "10A1";
      this.searchValue.subjectName = "MH00001111";
      this.searchValue.semester = "HK1";
      //Gọi API để reset lại list

      ScoreService.searchScore()
        .then(({ data }) => {
          this.list = this.convertData(data.scores);
        })
        .catch((e) => console.log(e));
    },

    search() {
      //Send API and get result
      const data = {
        params: {
          classId: this.searchValue.classID,
          subjectId: this.searchValue.subjectName,
          semester: this.searchValue.semester,
        },
      };
      ScoreService.searchScore(data)
        .then(({ data }) => {
          this.list = this.convertData(data.scores);
        })
        .catch((e) => console.log(e));
    },

    validateScore(score) {
      if (score < 0 || score > 10) {
        return false;
      }
      return true;
    },
    checkScore(item){
      if (item.score_15>=0 && item.score_15 <=10 && 
      item.score_15>=0 && item.score_15 <=10 && 
      item.score_1t>=0 && item.score_1t <=10 && 
      item.score_gk>=0 && item.score_gk <=10 &&
      item.score_ck>=0 && item.score_ck <=10 ) return true;
      else return false;
    },
    add() {
      if (
        this.addedScore.id &&
        this.searchValue.subjectName &&
        this.searchValue.semester &&
        this.addedScore.score_15 &&
        this.addedScore.score_1t &&
        this.addedScore.score_gk &&
        this.addedScore.score_ck 
      
      ) {
        if (this.checkScore(this.addedScore)) {

          this.addedScore.score_15=Math.floor(this.addedScore.score_15*100)/100;
          this.addedScore.score_1t=Math.floor(this.addedScore.score_1t*100)/100;
          this.addedScore.score_gk=Math.floor(this.addedScore.score_gk*100)/100;
          this.addedScore.score_ck=Math.floor(this.addedScore.score_ck*100)/100;
          this.addedScore.score_tk=this.addedScore.score_15*0.1+this.addedScore.score_1t*0.2+this.addedScore.score_gk*0.3+this.addedScore.score_ck*0.4;
          this.addedScore.score_tk = Math.floor(this.addedScore.score_tk*100)/100;
        

          const item = {
            idStudent: this.addedScore.id,
            idSubject: this.searchValue.subjectName,
            semester: this.searchValue.semester,
            mark_15: this.addedScore.score_15,
            mark_1t: this.addedScore.score_1t,
            mark_gk: this.addedScore.score_gk,
            mark_ck: this.addedScore.score_ck,
            mark_tk: this.addedScore.score_tk,
          };
          //Send API
          ScoreService.addScore({
            ...item,
          })
            .then(({ data }) => {
              if (data.status) {
                //update result
                this.list.push({
                  id: this.addedScore.id,
                  subjectName: this.addedScore.subjectName,
                  semester: this.addedScore.semester,
                  score_15: this.addedScore.score_15,
                  score_1t: this.addedScore.score_1t,
                  score_gk: this.addedScore.score_gk,
                  score_ck: this.addedScore.score_ck,
                  score_tk: this.addedScore.score_tk,     
                });
                this.addedScore.id = "";
                this.addedScore.subjectName = "";
                this.addedScore.semester = "";
                this.addedScore.score_15 = "";
                this.addedScore.score_1t = "";
                this.addedScore.score_gk = "";
                this.addedScore.score_ck = "";
                this.addedScore.score_tk = "";
              } else {
                alert(
                  "Thêm thất bại! Vui lòng kiểm tra xem dữ liệu bạn đã bị trùng hay chưa"
                );
              }
            })
            .catch((e) => console.log(e));
        } else {
          alert("Điểm không hợp lệ! Vui lòng nhập lại");
        }
      } else {
        alert("Vui lòng điền đẩy đủ các thông tin");
      }
    },
    showModalAndEdit(item) {
      this.showModal = true;
      this.editScore = { ...item };
      this.editScore.semester = this.searchValue.semester;
      this.editScore.subjectName = this.searchValue.subjectName;
    },

    edit() {
      //Send API
      if (this.checkScore(this.editScore)) {
        this.editScore.score_15=Math.floor(this.editScore.score_15*100)/100;
          this.editScore.score_1t=Math.floor(this.editScore.score_1t*100)/100;
          this.editScore.score_gk=Math.floor(this.editScore.score_gk*100)/100;
          this.editScore.score_ck=Math.floor(this.editScore.score_ck*100)/100;
          this.editScore.score_tk=this.editScore.score_15*0.1+this.editScore.score_1t*0.2+this.editScore.score_gk*0.3+this.editScore.score_ck*0.4;
          this.editScore.score_tk = Math.floor(this.editScore.score_tk*100)/100;
        ScoreService.editScore({
          idStudent: this.editScore.id,
          idSubject: this.editScore.subjectName,
          semester: this.editScore.semester,
          mark_15: this.editScore.score_15,
          mark_1t: this.editScore.score_1t,
          mark_gk: this.editScore.score_gk,
          mark_ck: this.editScore.score_ck,
          mark_tk: this.editScore.score_tk,
        })
          .then(({ data }) => {
            if (true) {
              this.showModal = false;
              alert("Sửa thành công");
              this.list.forEach((e) => {
                if (e.id == this.editScore.id) {
                  e.score_15 = this.editScore.score_15;
                  e.score_1t = this.editScore.score_1t;
                  e.score_gk = this.editScore.score_gk;
                  e.score_ck = this.editScore.score_ck;
                  e.score_tk = this.editScore.score_tk;
                }
              });
            }
          })
          .catch((e) => console.log(e));
      }
    },
    showEditRegulationModal() {
      this.showModalRegulation = true;
      this.editPassScore = this.passScore;
    },
    editRegulation() {
      //Send API
      RoleService.updatePassScore({
        score: this.editPassScore,
      })
        .then(({ data }) => {
          if (data.status) {
            alert("Cập nhật qui định thành công");
            this.passScore = this.editPassScore;
          }
        });

        this.showModalRegulation = false;
      }
    },
  cancelEditRegulation() {
      //Reset regulation
      this.editPassScore = this.passScore;
      //close modal
      this.showModalRegulation = false;
  },
};
</script>

<style scoped>
.pageContent {
  flex: 1;
  background-color: white;
  width: calc(100% - 10px);
  padding: 24px;
  margin: 6px 8px;
  border-radius: 8px;
  box-shadow: 1px 1px 20px rgb(204, 199, 199);
}
.pageContent__heading {
  font-size: 26px;
}
.search {
  margin-top: 10px;
}
.content {
  margin-top: 10px;
}
.content__heading {
  margin-left: -14px;
  margin-bottom: 8px;
}
.content__heading h4 {
  margin-left: 14px;
  margin-bottom: 8px;
}
.input {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 8px 12px;
  margin-left: 12px;
  border-radius: 3px;
  font-size: 14px;
  outline: none;
  width: 130px;
}
.passScore{
  display:inline-block;
  color: green;
  font-size: 18px;
}
.input:nth-last-child(2) {
  margin-right: 12px;
}
table {
  width: 100%;
}
caption {
  font-weight: 500;
  margin: 4px 0;
  text-align: left;
}

table th {
  font-weight: 500;
  text-align: left;
}
h4 {
  font-weight: 500;
}
table,
th,
td {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
}
th,
td {
  padding: 4px;
}
tr:nth-child(even) {
  background-color: #fff;
}
tr:nth-child(odd) {
  background-color: rgb(241, 240, 240);
}
td:last-child,
th:last-child {
  text-align: center;
  line-height: 10px;
}
.btn-add,
.remove-btn,
.edit-btn {
  background-color: transparent;
}
.btn-add:hover,
.remove-btn:hover,
.edit-btn:hover {
  cursor: pointer;
}
.btn-add svg {
  color: green;
  font-size: 16px;
}
.sort-btn svg {
  color: green;
  font-size: 16px;
}
.remove-btn svg {
  color: red;
  font-size: 16px;
}
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 10px;
}
.modal__content .input:first-child {
  margin-left: 0;
  margin-bottom: 5px;
  margin-right: 5px;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.resultPassed{
  color: green;
}
.resultNotPassed{
  color: red;
}
</style>
