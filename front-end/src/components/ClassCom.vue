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
      <ButtonVue class="ml-12" title="Reset" @click="reset()" />
      <ButtonVue
        title="Thay đổi quy định lớp"
        primary="true"
        @click="showModalRegulation = true"
      />
    </div>

    <div class="content">
      <h4 class="content__heading">Thêm giáo viên</h4>
      <div class="content__adding">
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
        <select class="input" v-model="addedClass.facultyId">
          <option value="" disabled>Chọn khoa</option>
          <option v-for="e in facultiesId" v-bind:key="e">
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
          <th width="10%">Khối</th>
          <th width="10%">Khối</th>
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
      <span class="modal__title">Chỉnh sửa lớp</span>
      <div class="modal__content">
        <input
          class="input"
          v-model="editClass.className"
          type="text"
          placeholder="Lớp"
          disabled
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
        <select class="input" v-model="editClass.facultyId">
          <option value="" disabled>Chọn khoa</option>
          <option v-for="e in facultiesId" v-bind:key="e">
            {{ e }}
          </option>
        </select>
      </div>
      <div class="modal__action">
        <ButtonVue title="Sửa" @click="edit()" primary="true" />
        <ButtonVue title="Hủy" @click="showModal = false" />
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="showModalRegulation"
      classes="modal-container"
      content-class="modal-content"
    >
      <span class="modal__title">Thay đổi quy định về lớp</span>
      <div class="modal__content">
        <FormGroup
          label="Số lượng lớp khối 10"
          typeOfInput="number"
          v-model="editedRegulation.amountOfGrade10"
          valueOfPlaceholder="Số lượng"
        />
        <FormGroup
          label="Số lượng lớp khối 11"
          typeOfInput="number"
          v-model="editedRegulation.amountOfGrade11"
          valueOfPlaceholder="Số lượng"
        />
        <FormGroup
          label="Số lượng lớp khối 12"
          typeOfInput="number"
          v-model="editedRegulation.amountOfGrade12"
          valueOfPlaceholder="Số lượng"
        />
      </div>
      <div class="modal__action">
        <ButtonVue title="Sửa" @click="editRegulation()" primary="true" />
        <ButtonVue title="Hủy" @click="cancelEditRegulation()" />
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import ButtonVue from "./Button.vue";
import ClassService from "../services/ClassService";
import FacultyService from "../services/FacultyService";
import FormGroup from "./FormGroup.vue";

export default {
  name: "ClassCom",
  components: { ButtonVue, FormGroup },
  data() {
    return {
      showModal: false,
      showModalRegulation: false,
      searchValue: {
        grade: "",
        className: "",
      },
      listGrade: [10, 11, 12],
      facultiesId: [],
      list: [],
      addedClass: {
        className: "",
        facultyId: "",
        amount: 0,
        grade: 10,
      },
      editClass: {
        className: "",
        facultyId: "",
        amount: 0,
        grade: 0,
      },
      regulation: {
        amountOfGrade10: 4,
        amountOfGrade11: 3,
        amountOfGrade12: 2,
      },
      editedRegulation: {
        amountOfGrade10: 4,
        amountOfGrade11: 3,
        amountOfGrade12: 2,
      },
    };
  },
  mounted() {
    //Call API for list class
    ClassService.searchClass()
      .then(({ data }) => {
        if (data.status) {
          this.list = this.convertData(data.classes);
          console.log(this.list);
        }
      })
      .catch((e) => console.log(e));

    //Call API for list faculty
    FacultyService.searchFaculty()
      .then(({ data }) => {
        this.facultiesId = data.faculties.map((e) => {
          return e.ma_khoa;
        });
      })
      .catch((e) => console.log(e));

    //Call API for regulation
  },
  methods: {
    convertData(rawData) {
      return rawData.map((e) => {
        return {
          className: e.ma_lop.trim(),
          amount: e.si_so_lop,
          grade: e.khoi,
          facultyId: e.ma_khoa.trim(),
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
    validate(className, amount, grade, facultyId) {
      let result = true;
      if (className && facultyId && amount > 0 && grade > 0) {
        if (parseInt(className.slice(0, 2)) == parseInt(grade)) {
          //Check if number of class is already enough
          let numberOfCurrentClassInGrade = 0;
          let currentGrade = parseInt(grade);
          this.list.forEach((e) => {
            if (parseInt(e.grade) == currentGrade) {
              numberOfCurrentClassInGrade += 1;
            }
          });
          if (currentGrade == 10) {
            if (
              numberOfCurrentClassInGrade <
              this.regulation[`amountOfGrade${currentGrade}`]
            ) {
              result = true;
            } else {
              alert(
                `Bạn sẽ không thể thêm / chỉnh sửa lớp này vì số lượng lớp trong khối ${currentGrade} đã đủ`
              );
              result = false;
            }
          }
        } else {
          alert("Tên lớp phải chứa khối. Ví dụ 10A1 thuộc khối 10");
          result = false;
        }
      } else {
        alert("Vui lòng điền đẩy đủ các trường");
        result = false;
      }
      return result;
    },
    add() {
      if (
        this.validate(
          this.addedClass.className,
          this.addedClass.facultyId,
          this.addedClass.amount,
          this.addedClass.grade
        )
      ) {
        ClassService.addClass({
          id: this.addedClass.className,
          number: this.addedClass.amount,
          grade: this.addedClass.grade,
          facultyId: this.addedClass.facultyId,
        })
          .then(({ data }) => {
            if (data.status) {
              this.list.push({
                ...this.addedClass,
              });
              this.addedClass.className = "";
              this.addedClass.amount = 0;
              this.addedClass.grade = 0;
              this.addedClass.facultyId = "";
            } else {
              alert("Lớp đã tồn tại");
            }
          })
          .catch((e) => console.log(e));
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
      if (
        this.validate(
          this.editClass.className,
          this.editClass.facultyId,
          this.editClass.amount,
          this.editClass.grade
        )
      ) {
        ClassService.editClass({
          id: this.editClass.className,
          number: this.editClass.amount,
          grade: this.editClass.grade,
          idFaculty: this.editClass.facultyId,
        })
          .then(({ data }) => {
            if (data.status) {
              this.showModal = false;
              alert("Sửa thành công");
              this.list.forEach((e) => {
                if (e.className == this.editClass.className) {
                  e.amount = this.editClass.amount;
                  e.grade = this.editClass.grade;
                  e.facultyId = this.editClass.facultyId;
                }
              });
            }
          })
          .catch((e) => console.log(e));
      }
    },
    editRegulation() {
      this.regulation = { ...this.editedRegulation };
      //Call API for updating
    },
    cancelEditRegulation() {
      //Reset regulation
      this.editedRegulation = { ...this.regulation };
      //close modal
      this.showModalRegulation = false;
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
.edit-btn,
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
