
<template>
  <div class="pageContent">
    <h2 class="pageContent__heading">Quản lý học sinh</h2>
    <div class="search">
      <ButtonVue title="Tìm kiếm" primary="true" @click="search()" />
      <input
        class="input"
        v-model="searchValue.id"
        type="text"
        placeholder="Mã số"
      />
      <input
        class="input"
        v-model="searchValue.fullName"
        type="text"
        placeholder="Họ tên"
      />
      <!--- --->
      
      <ButtonVue title="Reset" @click="reset()" />
    </div>
    <div class="content">
      <div class="search">
        <h4>Thêm học sinh</h4>
        <input
          class="input"
          v-model="addedStudent.id"
          type="text"
          placeholder="Mã HS"
        />
        <input
          class="input"
          v-model="addedStudent.fullName"
          type="text"
          placeholder="Họ tên"
        />
        <input
          class="input"
          v-model="addedStudent.birthday"
          type="text"
          placeholder="Ngày sinh (01/01/2000)"
        />
      
        <select class="input" v-model="addedStudent.classID">
          <option value="" disabled>Chọn lớp</option>
          <option v-for="classID in classes" v-bind:key="classID">
            {{ classID }}
          </option>
          
        </select>
        <input
          class="input"
          v-model="addedStudent.address"
          type="text"
          placeholder="Địa chỉ"
        />
        <ButtonVue title="Thêm" @click="add()" primary="true" />
        
      </div>
      <table>
        <caption>
          Danh sách học sinh
        </caption>
        <tr>
          <th width="5%">STT</th>
          <th width="10%">Mã HS</th>
          <th width="30%">Họ và tên</th>
          <th width="5%">Lớp</th>
          <th width="10%">Ngày sinh</th>
          <th width="30%">Địa chỉ</th>
          <th width="10%">
            <button class="btn-add">
              <font-awesome-icon icon="fa-solid fa-circle-plus" />
            </button>
          </th>
        </tr>
        <tr v-for="(item, index) in list" :key="item">
          <td>{{ index + 1 }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.fullName }}</td>
          <td>{{ item.classID }}</td>
          <td>{{ item.birthday }}</td>
          <td>{{ item.address }}</td>
          <td>
            <button class="edit-btn" @click="showModalAndEdit(item)">
              <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </button>
            <button class="remove-btn" >
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
      <span class="modal__title">Chỉnh sửa học sinh</span>
      <div class="modal__content">
        <input
          class="input"
          v-model="editStudent.id"
          type="text"
          placeholder="Mã HS"
          disabled
        />
        <input
          class="input"
          v-model="editStudent.fullName"
          type="text"
          placeholder="Họ tên"
        />
        <input
          class="input"
          v-model="editStudent.birthday"
          type="text"
          placeholder="Ngày sinh (01/01/2000)"
        />
        <select class="input" v-model="editStudent.classID">
          <option value="">Chọn lớp</option>
          <option
            v-for="(item, index) in classes"
            :key="index"
            :selected="item == editStudent.classID ? true : false"
          >
            {{ item }}
          </option>
        </select>
        <input
          class="input"
          v-model="editStudent.address"
          type="text"
          placeholder="Địa chỉ"
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
  fullName: "TeacherCom",
  components: { ButtonVue },
  data() {
    return {
      addedStudent: {
        id: "",
        fullName: "",
        birthday: "",
        classID: "",
        address:"",
      },
      editStudent: {
        id: "",
        fullName: "",
        birthday: "",
        classID: "",
        address:"",
      },
      showModal: false,
      list: [
        {
          id: "HS1",
          fullName: "VINH",
          birthday: "10/10/2000",
          classID: "11A",
          address:"HCM",
        },
        {
          id: "HS2",
          fullName: "A",
          birthday: "10/10/2000",
          classID: "12A",
          address:"HN",
        },
        {
          id: "HS3",
          fullName: "B",
          birthday: "10/10/2000",
          classID: "9A",
          address:"HCM",
        },
      ],
      searchValue: {
        id: "",
        fullName: "",
      },
      classes: [
        "9A",
        "10A",
        "11A",
        "12A",
      ],
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
    convertBirthday(birthday) {
      let tokens = birthday.split("-");
      return `${tokens[2]}/${tokens[1]}/${tokens[0]}`;
    },
    reset() {
      this.searchValue.id = "";
      this.searchValue.fullName = "";
      this.searchValue.classID = "";
      //Gọi API để reset lại list
      TeacherService.searchTeacher()
        .then(({ data }) => {
          this.list = this.convertData(data.teachers);
        })
        .catch((e) => console.log(e));
    },
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
    remove(item) {
      let result = confirm(`Bạn chắc chắn muốn xóa giáo viên ${item.id}`);
      if (result == true) {
        this.list = this.list.filter((e) => e != item);
        TeacherService.deleteTeacher({ data: { id: item.id } });
      }
    },
    
    validateBirthday(birthday) {
      const tokens = birthday.split("/");
      let daysOfMonth = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      function isLeapYear(year) {
        let result = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
        return result;
      }
      let year = parseInt(tokens[2]);
      let month = parseInt(tokens[1]);
      let day = parseInt(tokens[0]);
      if (isLeapYear(year)) {
        daysOfMonth[2] = 29;
      }
      if (year < 1900) {
        return false;
      }
      if (month < 1 || month > 12) {
        return false;
      }
      if (day < 1 || day > daysOfMonth[month]) {
        return false;
      }
      return true;
    },
   
    add() {
      if (
        this.addedStudent.fullName &&
        this.addedStudent.birthday &&
        this.addedStudent.classID
      ) {
        if (this.validateBirthday(this.addedStudent.birthday)) {
          const item = {
            id: this.addedStudent.id,
            fullName: this.addedStudent.fullName,
            birthday: this.addedStudent.birthday,
          };
          //Send API
          TeacherService.addTeacher({
            ...item,
            idFaculty: this.addedStudent.classID,
          })
            .then(({ data }) => {
              if (data.status) {
                //update result
                this.list.push({
                  ...item,
                  classID: this.addedStudent.classID,
                });
                this.addedStudent.id = "";
                this.addedStudent.fullName = "";
                this.addedStudent.birthday = "";
                this.addedStudent.classID = "";
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
    
    
    edit() {
      //Send API
      TeacherService.editStudent({
        id: this.editStudent.id,
        fullName: this.editStudent.fullName,
        idFaculty: this.editStudent.classID,
        birthday: this.editStudent.birthday,
      })
        .then(({ data }) => {
          if (data.status) {
            this.showModal = false;
            alert("Sửa thành công");
            this.list.forEach((e) => {
              if (e.id == this.editStudent.id) {
                e.fullName = this.editStudent.fullName;
                e.birthday = this.editStudent.birthday;
                e.classID = this.editStudent.classID;
              }
            });
          }
        })
        .catch((e) => console.log(e));
    },
    */
    showModalAndEdit(item) {
      this.showModal=true;
      this.editStudent = {...item};
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
  width: 140px;
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
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
