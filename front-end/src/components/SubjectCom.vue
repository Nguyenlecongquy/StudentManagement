
<template>
 
  <div class="pageContent">
     
    <h2 class="pageContent__heading">Quản lý môn học</h2>
    <div class="content">
      <div class="content__heading">
        <h4>Thêm môn học</h4>
        <input
          class="input"
          v-model="addedSubject.subjectId"
          type="text"
          placeholder="Mã môn học"
        />
        <input
          class="input"
          v-model="addedSubject.subjectName"
          type="text"
          placeholder="Tên môn học"
        />
        <select class="input" v-model="addedSubject.facultyId">
          <option value="" disabled>Chọn khoa</option>
          <option v-for="facultyId in facultiesList" v-bind:key="facultyId">
            {{ facultyId }}
          </option>
        </select>
        
        <ButtonVue title="Thêm" @click="add()" primary="true" />
      </div>
      <table>
        <caption>
          Danh sách môn học
        </caption>
        <tr>
          <th width="10%">STT</th>
          <th width="20%">Mã môn học
            <button @click="sortByGivenName('subjectId')" className="sort-btn">
              <font-awesome-icon
                v-if="sortBy.sortedByASCSubjectId == false"
                icon="fa-solid fa-arrow-down-a-z"
              />
              <font-awesome-icon
                v-else-if="sortBy.sortedByASCSubjectId == true"
                icon="fa-solid fa-arrow-down-z-a"
              />
              <font-awesome-icon v-else icon="fa-solid fa-arrows-up-down" />
            </button>
          </th>
          <th width="30%">Tên môn học
            <button @click="sortByGivenName('subjectName')" className="sort-btn">
              <font-awesome-icon
                v-if="sortBy.sortedByASCSubjectName == false"
                icon="fa-solid fa-arrow-down-a-z"
              />
              <font-awesome-icon
                v-else-if="sortBy.sortedByASCSubjectName == true"
                icon="fa-solid fa-arrow-down-z-a"
              />
              <font-awesome-icon v-else icon="fa-solid fa-arrows-up-down" />
            </button>
          </th>
          <th width="20%">Mã khoa
            <button @click="sortByGivenName('facultyId')" className="sort-btn">
              <font-awesome-icon
                v-if="sortBy.sortedByASCFacultyId == false"
                icon="fa-solid fa-arrow-down-a-z"
              />
              <font-awesome-icon
                v-else-if="sortBy.sortedByASCFacultyId == true"
                icon="fa-solid fa-arrow-down-z-a"
              />
              <font-awesome-icon v-else icon="fa-solid fa-arrows-up-down" />
            </button>
          </th>
          <th width="20%">
            <button class="btn-add">
              <font-awesome-icon icon="fa-solid fa-circle-plus" />
            </button>
          </th>
        </tr>
        <tr v-for="(item, index) in list" :key="item">
          <td>{{ index + 1 }}</td>
          <td>{{ item.subjectId }}</td>
          <td>{{ item.subjectName }}</td>
          <td>{{ item.facultyId }}</td>
          <td>
            <button class="edit-btn" @click="showModalAndEdit(item)">
              <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </button>
            <button class="remove-btn" @click="remove(item)">
              <font-awesome-icon icon="fa-solid fa-circle-minus" />
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
      <span class="modal__title">Chỉnh sửa môn</span>
      <div class="modal__content">
        <input
          class="input"
          v-model="editSubject.subjectId"
          disabled
          type="text"
          placeholder="Mã môn học"      
        />
        <input
          class="input"
          v-model="editSubject.subjectName"
          type="text"
          placeholder="Tên môn học"
        />
        <select class="input" v-model="editSubject.facultyId">
          <option value="" disabled>Chọn khoa</option>
          <option v-for="facultyId in facultiesList" v-bind:key="facultyId">
            {{ facultyId }}
          </option>
        </select>
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

import SubjectService from "../services/SubjectService";
import FacultyService from "../services/FacultyService";
export default {
  fullName: "SubjectCom",
  components: { ButtonVue },
  data() {
    return {
      editSubject: {
        subjectId: "",
        subjectName: "",
        facultyId: "",
      },
      addedSubject: {
        subjectId: "",
        subjectName: "",
        facultyId: "",
      },
      showModal: false,
      list: [],     
      facultiesList: [],
      sortBy: {
        sortedByASCSubjectId: true,
        sortedByASCSubjectName: undefined,
        sortedByASCFacultyId: undefined,
      },
    };
  },
  
  mounted() {
    
    //API for list subjects
    SubjectService.searchSubject()
      .then(({ data }) => {  
        if (data.status) {
          this.list = this.convertData(data.subjects);
        }
      })
      .catch((e) => console.log(e));
    FacultyService.searchFaculty({
      params: {
        id: "",
        facultyName: "",
        shortFacultyName: "",
      },
    })
      .then(({ data }) => {
        this.facultiesList = data.faculties.map((e) => {
          return e.ma_khoa.trim();
        });
      })
      .catch((e) => console.log(e));

  },
  
  methods: {
    sortByGivenName(item) {
      let ASC;
      if (item == "subjectId") {
        this.sortBy.sortedByASCSubjectId = !this.sortBy.sortedByASCSubjectId;
        ASC = this.sortBy.sortedByASCSubjectId;
      } else if (item == "subjectName") {
        if (this.sortBy.sortedByASCSubjectName == undefined) {
          this.sortBy.sortedByASCSubjectName = false;
        }    
        this.sortBy.sortedByASCSubjectName = !this.sortBy.sortedByASCSubjectName;
        ASC = this.sortBy.sortedByASCSubjectName;
      } else if (item == "facultyId") {
        if (this.sortBy.sortedByASCFacultyId == undefined) {
          this.sortBy.sortedByASCFacultyId = false;
        }
        this.sortBy.sortedByASCFacultyId = !this.sortBy.sortedByASCFacultyId;
        ASC = this.sortBy.sortedByASCFacultyId;
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
          subjectId: e.ma_mh,
          subjectName: e.ten_mh,
          facultyId: e.ma_khoa,
        };
      });
    },
    remove(item) {
      let result = confirm(`Bạn chắc chắn muốn xóa môn ${item.subjectId}`);
      if (result == true) {
        this.list = this.list.filter((e) => e != item);
        SubjectService.deleteSubject({ data: { id: item.subjectId } });
      }
    },
    add() {
      if (
        this.addedSubject.subjectId &&
        this.addedSubject.subjectName &&
        this.addedSubject.facultyId
      ) {
        if (true) {
          const item = {
            id: this.addedSubject.subjectId,
            subjectName: this.addedSubject.subjectName,
            idFaculty: this.addedSubject.facultyId,
          };
          //Send API
          SubjectService.addSubject({
            ...item,
            
          })
            .then(({ data }) => {
              if (data.status) {
                //update result
                this.list.push({
                  subjectId: this.addedSubject.subjectId,
                  subjectName: this.addedSubject.subjectName,
                  facultyId: this.addedSubject.facultyId,
                });
                this.addedSubject.subjectId = "";
                this.addedSubject.subjectName = "";
                this.addedSubject.facultyId = "";
              } else {
                alert(
                  "Thêm thất bại! Vui lòng kiểm tra xem dữ liệu bạn đã bị trùng hay chưa"
                );
              }
            })
            .catch((e) => console.log(e));
        } else {
          alert("Ngày sinh không hợp lệ! Vui lòng nhập lại");
        }
      } else {
        alert("Vui lòng điền đẩy đủ các thông tin");
      }
    },
    reset() {
      this.addedSubject.subjectId = "";
      this.addedSubject.subjectName = "";
      this.addedSubject.facultyId = "";
  
    },
    showModalAndEdit(item) {
      this.showModal = true;
      this.editSubject = { ...item };
    },
    
    edit() {
      //Send API
      SubjectService.editSubject({
        id: this.editSubject.subjectId,
        subjectName: this.editSubject.subjectName,    
        idFaculty: this.editSubject.facultyId,    
      })
        .then(({ data }) => {
          if (data.status) {
            this.showModal = false;
            alert("Sửa thành công");
            this.list.forEach((e) => {
              if (e.subjectId == this.editSubject.subjectId) {
                e.subjectName = this.editSubject.subjectName;
                e.facultyId = this.editSubject.facultyId;
              }
            });
          }
        })
        .catch((e) => console.log(e));
    },
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
.sort-btn svg {
  color: green;
  font-size: 16px;
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
