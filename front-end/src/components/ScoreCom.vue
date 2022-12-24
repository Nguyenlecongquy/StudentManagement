<template>
  <div class="pageContent">
    <h2 class="pageContent__heading">Quản lý điểm</h2>
    <div class="search">
      <ButtonVue title="Tìm kiếm" primary="true" @click="search()" />
      <select class="input" v-model="searchValue.classID">
        <option value="" disabled> Chọn lớp </option>
        <option v-for="classID in classes" v-bind:key="classID">
          {{ classID }}
        </option>
      </select>
    
      <select class="input" v-model="searchValue.subjectName">
        <option value="" disabled>Môn học</option>
        <option v-for="subjectName in subjects" v-bind:key="subjectName">
          {{ subjectName }}
        </option>
      </select>
      <select class="input" v-model="searchValue.semester">
          <option value="" disabled>Học kỳ</option>
          <option v-for="semester in semesters" v-bind:key="semester">
            {{ semester }}
          </option>
      </select>
      <!--- --->
      <ButtonVue title="Reset" @click="reset()" />
    </div>
    <div class="content">
      <table>
        <caption>
          Danh sách học sinh
        </caption>
        <tr>
          <th width="10%">STT</th>
          <th width="20%">Mã HS</th>
          <th width="30%">Họ và tên</th>
          <th width="10%">15'</th>
          <th width="10%">1 tiết</th>
          <th width="10%">Học kỳ</th>
          <th width="10%"></th>
        </tr>
        <tr v-for="(item, index) in list" :key="item">
          <td>{{ index + 1 }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.fullName }}</td>
          <td>{{ item.score1 }}</td>
          <td>{{ item.score2 }}</td>
          <td>{{ item.score3 }}</td>
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
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
    >
      <span class="modal__title">Nhập điểm</span>
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
          v-model="editScore.fullName"
          type="text"
          placeholder="Họ tên"
          disabled
        />
        <input
          class="input"
          v-model="editScore.score1"
          type="text"
          placeholder="15'"
        />
        <input
          class="input"
          v-model="editScore.score2"
          type="text"
          placeholder="1 tiết"
        />
        <input
          class="input"
          v-model="editScore.score3"
          type="text"
          placeholder="Học kỳ"
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
/*
import TeacherService from "../services/TeacherService";
import FacultyService from "../services/FacultyService";
*/
export default {
  fullName: "ScoreCom",
  components: { ButtonVue },
  data() {
    return {
      
      editScore: {
        id: "",
        fullName: "",
        score1: "",
        score2: "",
        score3: "",
      },
      showModal: false,
      list: [
        {
          id: "HS2",
          fullName: "A",
          score1: 5,
          score2: 7,
          score3: 0,
        },
        {
          id: "HS3",
          fullName: "O",
          score1: 0,
          score2: 6,
          score3: 5,
        },
        {
          id: "HS4",
          fullName: "C",
          score1: 6,
          score2: 7,
          score3: 8,
        },
      ],
      searchValue: {
        classID: "",
        subjectName: "",
        semester:"",
      },
      classes: [
        "9A",
        "10A",
        "11A",
        "12A",
      ],
      subjects: [
        "Toán",
        "Văn",
        "Thể dục",
        "Hóa học",
      ],
      semesters:[
        "Học kỳ 1",
        "Học kỳ 2",
      ]
    };
  },
  /*
  mounted() {
    
    //API for list teachers
    TeacherService.searchTeacher()
      .then(({ data }) => {
        console.log(data);
        if (data.status) {
          this.list = this.convertData(data.teachers);
        }
      })
      .catch((e) => console.log(e));
    //API for list classes
    FacultyService.searchFaculty()
      .then(({ data }) => {
        if (data.status) {
          this.classes = Array.from(data.classes).map((e) => {
            return e.ma_khoa.trim();
          });
        }
      })
      .catch((e) => console.log(e));
  },
  */
  methods: {
    /*
    convertData(rawData) {
      return rawData.map((e) => {
        return {
          id: e.ma_gv,
          fullName: e.ten_gv,
          classID: e.ma_khoa.trim(),
          birthday:
            e.ngay_sinh_gv != null
              ? this.convertBirthday(e.ngay_sinh_gv.slice(0, 10))
              : "",
        };
      });
    },
    */
    reset() {
      this.searchValue.classID = "";
      this.searchValue.subjectName = "";
      this.searchValue.semester = "";
      //Gọi API để reset lại list
      /*
      TeacherService.searchTeacher()
        .then(({ data }) => {
          this.list = this.convertData(data.teachers);
        })
        .catch((e) => console.log(e));
        */
    },
    /*
    search() {
      //Send API and get result
      const data = {
        params: {
          id: this.searchValue.id,
          fullName: this.searchValue.fullName,
        },
      };
      TeacherService.searchTeacher(data)
        .then(({ data }) => {
          this.list = this.convertData(data.teachers);
        })
        .catch((e) => console.log(e));
    },
    */
    validateScore(score) {
      
      if (score < 0 || score > 10) {
        return false;
      }
      return true;
    },
    showModalAndEdit(item) {
      this.showModal = true;
      this.editScore = { ...item };
    },
    /*
    edit() {
      //Send API
      
      TeacherService.editScore({
        id: this.editScore.id,
        fullName: this.editScore.fullName,
        idFaculty: this.editScore.classID,
        birthday: this.editScore.birthday,
      })
        .then(({ data }) => {
          if (data.status) {
            this.showModal = false;
            alert("Sửa thành công");
            this.list.forEach((e) => {
              if (e.id == this.editScore.id) {
                e.fullName = this.editScore.fullName;
                e.birthday = this.editScore.birthday;
                e.classID = this.editScore.classID;
              }
            });
          }
        })
        .catch((e) => console.log(e));
    },
    */
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
  width: 150px;
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
.remove-btn svg {
  color: red;
  font-size: 16px;
}
:deep(.modal-container)  {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.modal-content)  {
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
</style>
