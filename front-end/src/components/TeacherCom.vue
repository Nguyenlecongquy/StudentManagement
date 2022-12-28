<template>
  <div class="pageContent">
    <h2 class="pageContent__heading">Quản lý giáo viên</h2>
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

      <ButtonVue title="Reset" @click="reset()" />
    </div>
    <div class="content">
      <div class="content__heading">
        <h4>Thêm giáo viên</h4>
        <input
          class="input"
          v-model="addedTeacher.id"
          type="text"
          placeholder="Mã GV"
        />
        <input
          class="input"
          v-model="addedTeacher.fullName"
          type="text"
          placeholder="Họ tên"
        />
        <input
          class="input"
          v-model="addedTeacher.birthday"
          type="date"
          data-date
          placeholder="Ngày sinh (01/01/2000)"
        />
        <select class="input" v-model="addedTeacher.facultyId">
          <option value="" disabled>Chọn mã khối</option>
          <option v-for="facultyId in faculties" v-bind:key="facultyId">
            {{ facultyId }}
          </option>
        </select>
        <ButtonVue title="Thêm" @click="add()" primary="true" />
      </div>
      <table>
        <caption>
          Danh sách giáo viên
        </caption>
        <tr>
          <th width="10%">STT</th>
          <th width="20%">
            Mã GV
            <button @click="sortByGivenName('id')" className="sort-btn">
              <font-awesome-icon
                v-if="sortBy.sortByASCId == false"
                icon="fa-solid fa-arrow-down-a-z"
              />
              <font-awesome-icon
                v-else-if="sortBy.sortByASCId == true"
                icon="fa-solid fa-arrow-down-z-a"
              />
              <font-awesome-icon v-else icon="fa-solid fa-arrows-up-down" />
            </button>
          </th>
          <th width="30%">
            Họ và tên
            <button @click="sortByGivenName('fullName')" className="sort-btn">
              <font-awesome-icon
                v-if="sortBy.sortByASCFullName == false"
                icon="fa-solid fa-arrow-down-a-z"
              />
              <font-awesome-icon
                v-else-if="sortBy.sortByASCFullName == true"
                icon="fa-solid fa-arrow-down-z-a"
              />
              <font-awesome-icon v-else icon="fa-solid fa-arrows-up-down" />
            </button>
          </th>
          <th width="15%">
            Mã khoa
            <button @click="sortByGivenName('facultyId')" className="sort-btn">
              <font-awesome-icon
                v-if="sortBy.sortByASCFacultyId == false"
                icon="fa-solid fa-arrow-down-a-z"
              />
              <font-awesome-icon
                v-else-if="sortBy.sortByASCFacultyId == true"
                icon="fa-solid fa-arrow-down-z-a"
              />
              <font-awesome-icon v-else icon="fa-solid fa-arrows-up-down" />
            </button>
          </th>
          <th width="12%">Ngày sinh</th>
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
          <td>{{ item.facultyId }}</td>
          <td>{{ item.birthday }}</td>
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
      <span class="modal__title">Chỉnh sửa giáo viên</span>
      <div class="modal__content">
        <input
          class="input"
          v-model="editTeacher.id"
          type="text"
          placeholder="Mã GV"
          disabled
        />
        <input
          class="input"
          v-model="editTeacher.fullName"
          type="text"
          placeholder="Họ tên"
        />
        <input
          class="input"
          v-model="editTeacher.birthday"
          type="date"
          placeholder="Ngày sinh (01/01/2000)"
        />
        <select class="input" v-model="editTeacher.facultyId">
          <option value="">Chọn mã khối</option>
          <option
            v-for="(item, index) in faculties"
            :key="index"
            :selected="item == editTeacher.facultyId ? true : false"
          >
            {{ item }}
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
import TeacherService from "../services/TeacherService";
import FacultyService from "../services/FacultyService";

export default {
  fullName: "TeacherCom",
  components: { ButtonVue },
  data() {
    return {
      addedTeacher: {
        id: "",
        fullName: "",
        birthday: "",
        facultyId: "",
      },
      editTeacher: {
        id: "",
        fullName: "",
        birthday: "",
        facultyId: "",
      },
      showModal: false,
      list: [],
      searchValue: {
        id: "",
        fullName: "",
      },
      faculties: [],
      sortBy: {
        sortByASCId: true,
        sortByASCFullName: undefined,
        sortByASCFacultyId: undefined,
      },
    };
  },
  mounted() {
    //API for list teachers
    TeacherService.searchTeacher({
      params: {
        id: "",
        fullName: "",
      },
    })
      .then(({ data }) => {
        if (data.status) {
          this.list = this.convertData(data.teachers);
          this.list = this.list.sort(function (a, b) {
            if (a["id"] < b["id"]) return -1;
            if (a["id"] > b["id"]) return 1;
            return 0;
          });
        }
      })
      .catch((e) => console.log(e));

    //API for list faculties
    FacultyService.searchFaculty({
      params: {
        id: "",
        facultyName: "",
        shortFacultyName: "",
      },
    })
      .then(({ data }) => {
        if (data.status) {
          this.faculties = Array.from(data.faculties).map((e) => {
            return e.ma_khoa.trim();
          });
        }
      })
      .catch((e) => console.log(e));
  },
  methods: {
    sortByGivenName(item) {
      let ASC;
      if (item == "id") {
        this.sortBy.sortByASCId = !this.sortBy.sortByASCId;
        ASC = this.sortBy.sortByASCId;
      } else if (item == "fullName") {
        if (this.sortBy.sortByASCFullName == undefined) {
          this.sortBy.sortByASCFullName = false;
        }
        this.sortBy.sortByASCFullName = !this.sortBy.sortByASCFullName;
        ASC = this.sortBy.sortByASCFullName;
      } else if (item == "facultyId") {
        if (this.sortBy.sortByASCFacultyId == undefined) {
          this.sortBy.sortByASCFacultyId = false;
        }
        this.sortBy.sortByASCFacultyId = !this.sortBy.sortByASCFacultyId;
        ASC = this.sortBy.sortByASCFacultyId;
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
        let birthdayDate;
        let birthday;
        if (e.ngay_sinh_gv != null) {
          birthdayDate = new Date(e.ngay_sinh_gv);
          let date =
            birthdayDate.getDate() > 9
              ? birthdayDate.getDate()
              : `0${birthdayDate.getDate()}`;
          let month =
            birthdayDate.getMonth() + 1 > 9
              ? birthdayDate.getMonth() + 1
              : `0${birthdayDate.getMonth() + 1}`;
          let year = birthdayDate.getFullYear();
          birthday = `${date}/${month}/${year}`;
        } else {
          birthday = "";
        }
        return {
          id: e.ma_gv,
          fullName: e.ten_gv,
          facultyId: e.ma_khoa.trim(),
          birthday,
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
      this.searchValue.facultyId = "";
      //Gọi API để reset lại list
      TeacherService.searchTeacher({
        params: {
          id: "",
          fullName: "",
        },
      })
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
    add() {
      if (
        this.addedTeacher.fullName &&
        this.addedTeacher.birthday &&
        this.addedTeacher.facultyId
      ) {
        const item = {
          id: this.addedTeacher.id,
          fullName: this.addedTeacher.fullName,
          birthday: this.addedTeacher.birthday,
        };

        //Send API
        TeacherService.addTeacher({
          ...item,
          idFaculty: this.addedTeacher.facultyId,
        })
          .then(({ data }) => {
            if (data.status) {
              //update result
              this.list = [...this.list, ...this.convertData(data.teachers)];
              this.addedTeacher.id = "";
              this.addedTeacher.fullName = "";
              this.addedTeacher.birthday = "";
              this.addedTeacher.facultyId = "";
            } else {
              alert(
                "Thêm thất bại! Vui lòng kiểm tra xem dữ liệu bạn đã bị trùng hay chưa"
              );
            }
          })
          .catch((e) => console.log(e));
      } else {
        alert("Vui lòng điền đẩy đủ các thông tin");
      }
    },
    showModalAndEdit(item) {
      this.showModal = true;
      this.editTeacher = { ...item };
    },
    edit() {
      //Send API
      TeacherService.editTeacher({
        id: this.editTeacher.id,
        fullName: this.editTeacher.fullName,
        idFaculty: this.editTeacher.facultyId,
        birthday: this.editTeacher.birthday,
      })
        .then(({ data }) => {
          if (data.status) {
            this.showModal = false;
            alert("Sửa thành công");
            this.list.forEach((e) => {
              if (e.id == this.editTeacher.id) {
                e.fullName = this.editTeacher.fullName;
                e.birthday = this.convertBirthday(this.editTeacher.birthday);
                e.facultyId = this.editTeacher.facultyId;
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

.btn-add svg,
.sort-btn svg {
  color: green;
  font-size: 16px;
}
.remove-btn svg {
  color: red;
  font-size: 16px;
}

::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
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
