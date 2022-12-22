<template>
  <div class="pageContent">
    <h2>Lớp học</h2>
    <div class="search">
      <ButtonVue title="Tìm kiếm" primary="true" @click="search()" />
      <input
        class="input"
        v-model="searchValue.className"
        type="text"
        placeholder="Lớp"
      />
      <select class="input" v-model="searchValue.grade">
        <option value="" disabled>Chọn khối</option>
        <option v-for="e in listGrade" v-bind:key="e">
          {{ e }}
        </option>
      </select>
      <ButtonVue title="Reset" @click="reset()" />
    </div>

    <div class="content">
      <h4 class="content__heading">Thêm giáo viên</h4>
      <div class="content__adding">
        <input
          class="input"
          v-model="editClass.className"
          type="text"
          placeholder="Lớp"
        />
        <input
          class="input"
          v-model="editClass.amount"
          type="text"
          placeholder="Sĩ số"
        />
        <select class="input" v-model="editClass.grade">
          <option value="" disabled>Chọn khối</option>
          <option v-for="e in listGrade" v-bind:key="e">
            {{ e }}
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
          <th width="20%">Lớp</th>
          <th width="40%">Sĩ số</th>
          <th width="20%">Khối</th>
          <th width="10%">
            <button class="btn-add">
              <font-awesome-icon icon="fa-solid fa-circle-plus" />
            </button>
          </th>
        </tr>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.className }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.grade }}</td>
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
          v-model="addedClass.className"
          type="text"
          placeholder="Lớp"
        />
        <input
          class="input"
          v-model="addedClass.amount"
          type="text"
          placeholder="Sĩ số"
        />
        <select class="input" v-model="addedClass.grade">
          <option value="" disabled>Chọn khối</option>
          <option v-for="e in listGrade" v-bind:key="e">
            {{ e }}
          </option>
        </select>
      </div>
      <div class="modal__action">
        <ButtonVue title="Thêm" @click="edit()" primary="true" />
        <ButtonVue title="Hủy" @click="showModal = false" />
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import ButtonVue from "./Button.vue";
import ClassService from "../services/ClassService";

export default {
  name: "ClassCom",
  components: { ButtonVue },
  data() {
    return {
      showModal: false,
      searchValue: {
        grade: "",
        className: "",
      },
      listGrade: [10, 11, 12],
      list: [],
      addedClass: {
        className: "",
        faculty: "",
        amount: 0,
        grade: 0,
      },
      editClass: {
        className: "",
        faculty: "",
        amount: 0,
        grade: 0,
      },
    };
  },
  mounted() {
    ClassService.searchClass()
      .then(({ data }) => {
        if (data.status) {
          this.list = this.convertData(data.classes);
          console.log(this.list);
        }
      })
      .catch((e) => console.log(e));
  },
  methods: {
    convertData(rawData) {
      return rawData.map((e) => {
        return {
          className: e.ma_lop.trim(),
          amount: e.si_so_lop,
          grade: e.khoi,
          faculty: e.ma_khoa.trim(),
        };
      });
    },
    reset() {
      this.searchValue.faculty = "";
      this.searchValue.className = "";

      //Gọi API để reset lại list
      ClassService.searchClass()
        .then(({ data }) => {
          this.list = this.convertData(data.classes);
        })
        .catch((e) => console.log(e));
    },
    getData() {
      //Call API
      this.backupList = this.list.filter(() => true);
    },
    search() {
      const data = {
        params: {
          id: this.searchValue.className,
          grade: this.searchValue.grade,
        },
      };
      ClassService.searchClass(data)
        .then(({ data }) => {
          this.list = this.convertData(data.classes);
        })
        .catch((e) => console.log(e));
    },
    add() {
      if (
        this.addedClass.className.length > 0 &&
        this.addedClass.faculty.length > 0 &&
        this.addedClass.amount > 0
      ) {
        let isExistClass = this.backupList.some(
          (e) =>
            e.className.toLowerCase() == this.addedClass.className.toLowerCase()
        );
        if (!isExistClass) {
          this.backupList.push({
            stt: this.backupList[this.backupList.length - 1].stt + 1,
            ...this.addedClass,
          });
          this.addedClass.faculty = "";
          this.addedClass.className = "";
          this.addedClass.amount = 0;
          this.list = this.backupList;
        } else {
          alert("Lớp đã tồn tại");
        }
      } else {
        alert("Vui lòng điền đẩy đủ các trường");
      }
    },
    remove(item) {
      let result = confirm(`Bạn chắc chắn muốn xóa lớp ${item.className}`);
      if (result == true) {
        this.list = this.list.filter((e) => e != item);
        ClassService.deleteClass({ data: { id: item.className } });
      }
    },
    showModalAndEdit(item) {
      this.showModal = true;
      this.editClass = { ...item };
    },
    edit() {
      //Send API
      ClassService.editClass({
        id: this.editTeacher.id,
        fullName: this.editTeacher.fullName,
        idFaculty: this.editTeacher.facultyId,
        birthday: this.editTeacher.birthday,
      })
        .then(({ data }) => {
          if (data.status) {
            alert("Sửa thành công");
            this.showModal = true;
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
.search {
  margin-top: 10px;
}
.input {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 8px 12px;
  margin-left: 12px;
  border-radius: 3px;
  font-size: 14px;
  outline: none;
}

.content__heading {
  margin: 8px 0;
}
.content__adding {
  margin-left: -14px;
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
th:last-child,
td:last-child {
  text-align: center;
}
.btn-add,
.remove-btn {
  background-color: transparent;
}
.btn-add:hover,
.remove-btn:hover {
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
.edit-btn {
  background-color: transparent;
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
