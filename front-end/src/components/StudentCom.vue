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
      <ButtonVue class="ml-12" title="Reset" @click="reset()" />
      <ButtonVue
        title="Tuổi hợp lệ"
        primary="true"
        @click="showEditRegulationModal()"
      />
    </div>
    <div class="content">
      <div class="search">
        <h4>Thêm học sinh</h4>
        <input
          class="input ml-0"
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
        <select class="input" v-model="addedStudent.classID" @change="checkClassAmount(addedStudent.classID)" >
          <option value="" disabled>Chọn lớp</option>
          <option v-for="classID in classesList" v-bind:key="classID">
            {{ classID }}
          </option>
        </select>
        <input
          class="input"
          v-model="addedStudent.birthday"
          type="date"
          data-date
          placeholder="Ngày sinh (01/01/2000)"
        />

        <select class="input" v-model="addedStudent.gender">
          <option value="" disabled>Giới tính</option>
          <option>Nam</option>
          <option>Nữ</option>
          <option>Khác</option>
        </select>

        <input
          class="input"
          v-model="addedStudent.address"
          type="text"
          placeholder="Địa chỉ"
        />
        <div class="search">
          <ButtonVue title="Thêm" @click="add()" primary="true" />
        </div>
      </div>

      <table>
        <caption>
          Danh sách học sinh
        </caption>
        <tr>
          <th width="5%">STT</th>
          <th width="10%">
            Mã HS
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
          <th width="25%">
            Họ và tên
            <button @click="sortByGivenName('fullName')" className="sort-btn">
              <font-awesome-icon
                v-if="sortBy.sortedByASCFullName == false"
                icon="fa-solid fa-arrow-down-a-z"
              />
              <font-awesome-icon
                v-else-if="sortBy.sortedByASCFullName == true"
                icon="fa-solid fa-arrow-down-z-a"
              />
              <font-awesome-icon v-else icon="fa-solid fa-arrows-up-down" />
            </button>
          </th>
          <th width="5%">
            Lớp
            <button @click="sortByGivenName('classID')" className="sort-btn">
              <font-awesome-icon
                v-if="sortBy.sortedByASCClassName == false"
                icon="fa-solid fa-arrow-down-a-z"
              />
              <font-awesome-icon
                v-else-if="sortBy.sortedByASCClassName == true"
                icon="fa-solid fa-arrow-down-z-a"
              />
              <font-awesome-icon v-else icon="fa-solid fa-arrows-up-down" />
            </button>
          </th>
          <th width="12%">Ngày sinh</th>
          <th width="10%">Giới tính</th>
          <th width="23%">Địa chỉ</th>
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
          <td>{{ item.gender }}</td>
          <td>{{ item.address }}</td>
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
      v-model="showModalRegulation"
      classes="modal-container"
      content-class="modal-content"
    >
      <span class="modal__title">Tuổi hợp lệ</span>
      <div class="modal__content">
        <input
          class="input"
          v-model="editedRegulation.minAge"
          type="number"
          placeholder="Tối thiểu"
        />
        <input
          class="input"
          v-model="editedRegulation.maxAge"
          type="number"
          placeholder="Tối đa"
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

        <select class="input" v-model="editStudent.classID" @change="checkClassAmount(editStudent.classID)">
          <option value="" disabled>Chọn lớp</option>
          <option  v-for="(item, index) in classesList"
            :key="index"
            :selected="item == editStudent.classID ? true : false"
          >
            {{ item }}
          </option>
        </select>

        <input
          class="input"
          v-model="editStudent.birthday"
          type="date"
          data-date
          placeholder="Ngày sinh (01/01/2000)"
        />
        <select class="input" v-model="editStudent.gender">
          <option value="" disabled>Giới tính</option>
          <option>Nam</option>
          <option>Nữ</option>
          <option>Khác</option>
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
import StudentService from "../services/StudentService";
import ClassService from "../services/ClassService";
import RoleService from "../services/RoleService";
export default {
  fullName: "StudentCom",
  components: { ButtonVue },
  data() {
    return {
      addedStudent: {
        id: "",
        fullName: "",
        classID: "",
        birthday: "",
        gender: "",
        address: "",
      },
      editStudent: {
        id: "",
        fullName: "",
        classID: "",
        birthday: "",
        gender: "",
        address: "",
        oldClassID:"",
<<<<<<< HEAD
        amount: "",
=======
>>>>>>> e8bda3e0150a6ab00d6754ae3958ee9dcc57ccf8
      },
      showModal: false,
      showModalRegulation: false,

      regulation: {
        minAge: "",
        maxAge: "",
        maxAmount: "",
        amount: "",
      },
      amount: 5,
      editedRegulation: {
        minAge: "",
        maxAge: "",
        maxAmount: "",
      },
      list: [],
      searchValue: {
        id: "",
        fullName: "",
      },
      classesList: [],
      sortBy: {
        sortedByASCId: true,
        sortedByASCClassName: undefined,
        sortedByASCFullName: undefined,
      },
    };
  },

  mounted() {
    RoleService.getAllRole()
      .then(({ data }) => {
        if (data.status) {
          this.regulation.minAge = data.roles.tuoi_toi_thieu;
          this.regulation.maxAge = data.roles.tuoi_toi_da;
          this.regulation.maxAmount= data.roles.si_so_toi_da;
          this.editedRegulation = { ...this.regulation };
        }
      })
      .catch((e) => console.log(e));
    //API for list students
    StudentService.searchStudent({
      params: {
        id: "",
        fullName: "",
      },
    })
      .then(({ data }) => {
        this.list = this.convertData(data.students).sort(function (a, b) {
          if (a["id"] < b["id"]) return -1;
          if (a["id"] > b["id"]) return 1;
          return 0;
        });
      })
      .catch((e) => console.log(e));

    //API for list classes
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
      } else if (item == "classID") {
        if (this.sortBy.sortedByASCClassName == undefined) {
          this.sortBy.sortedByASCClassName = false;
        }
        ASC = !this.sortBy.sortedByASCClassName;
        this.sortBy.sortedByASCClassName = !this.sortBy.sortedByASCClassName;
      } else if (item == "fullName") {
        if (this.sortBy.sortedByASCFullName == undefined) {
          this.sortBy.sortedByASCFullName = false;
        }
        this.sortBy.sortedByASCFullName = !this.sortBy.sortedByASCFullName;
        ASC = this.sortBy.sortedByASCFullName;
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
        if (e.ngay_sinh_hs != null) {
          birthdayDate = new Date(e.ngay_sinh_hs);
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
          id: e.ma_hs,
          fullName: e.ten_hs,
          classID: e.ma_lop.trim(),
          birthday,
          gender: e.gioi_tinh_hs,
          address: e.dia_chi_hs,
        };
      });
    },

    reset() {
      this.searchValue.id = "";
      this.searchValue.fullName = "";
      this.searchValue.classID = "";
      this.searchValue.birthday = "";
      this.searchValue.gender = "";
      this.searchValue.address = "";
      //Gọi API để reset lại list
      StudentService.searchStudent()
        .then(({ data }) => {
          this.list = this.convertData(data.students);
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
      StudentService.searchStudent(data)
        .then(({ data }) => {
          this.list = this.convertData(data.students);
        })
        .catch((e) => console.log(e));
    },

    remove(item) {
      let result = confirm(`Bạn chắc chắn muốn xóa học sinh ${item.id}`);
      if (result == true) {
        this.list = this.list.filter((e) => e != item);
        StudentService.deleteStudent({ data: { id: item.id } });
      }
    },

    convertBirthday(birthday) {
      let tokens = birthday.split("-");
      return `${tokens[2]}/${tokens[1]}/${tokens[0]}`;
    },
    calculateAge(birthday) {
      let tokens = birthday.split("-");
      const date = new Date(tokens[0], tokens[1], tokens[2]);
      const now = new Date();
      const diff = Math.abs(now - date);
      const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      return age;
    },
    validateAge(birthday) {
      if (
        this.calculateAge(birthday) >= this.regulation.minAge &&
        this.calculateAge(birthday) <= this.regulation.maxAge
      ) {
        return true;
      }
      return false;
    },
    
    checkClassAmount(classID)
    {
      ClassService.searchClass({
        params: {
          id: classID,
          grade: "",
        },})
      .then(({ data }) => {
        if (data.status) {
          this.regulation.amount = data.classes[0].si_so_lop;
          console.log(this.regulation.amount);
        }
      })
      .catch((e) => console.log(e));
    },
    add() {
      if (this.addedStudent.fullName &&
        this.addedStudent.classID &&
        this.addedStudent.birthday &&
        this.addedStudent.gender &&
        this.addedStudent.address) 
        {
          console.log(this.regulation.amount,this.regulation.maxAmount);
          if(this.regulation.amount<this.regulation.maxAmount){
            if (this.validateAge(this.addedStudent.birthday)) {
            const item = {
              id: this.addedStudent.id,
              fullName: this.addedStudent.fullName,
              idClass: this.addedStudent.classID,
              sex: this.addedStudent.gender,
              birthDay: this.addedStudent.birthday,
              address: this.addedStudent.address,
            };
            //Send API
            StudentService.addStudent({
              ...item,
            })
              .then(({ data }) => {
                console.log(data.status);
                if (data.status) {
                  //update result
                  this.list = [...this.list, ...this.convertData(data.students)];
                  this.addedStudent.id = "";
                  this.addedStudent.fullName = "";
                  this.addedStudent.classID = "";
                  this.addedStudent.birthday = "";
                  this.addedStudent.gender = "";
                  this.addedStudent.address = "";
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
            alert("Lớp đạt tối đa!")
          }

        } else {
          alert("Vui lòng điền đẩy đủ các thông tin");
      }
    },

    edit() {
<<<<<<< HEAD
      
   
        if (this.validateAge(this.editStudent.birthday)) {
          console.log(this.editStudent.classID,this.editStudent.oldClassID.trim());
          if (this.editStudent.oldClassID.trim() != this.editStudent.classID && this.regulation.amount>= this.regulation.maxAmount) {
            alert("Lớp đã đạt sỉ số tối đa");
            return;
          }
          //Send API
            StudentService.editStudent({
              id: this.editStudent.id,
              fullName: this.editStudent.fullName,
              idClass: this.editStudent.classID,
              sex: this.editStudent.gender,
              birthDay: this.editStudent.birthday,
              address: this.editStudent.address,
              oldIdClass: this.editStudent.oldClassID,
            })
              .then(({ data }) => {
                if (data.status) {
                  this.showModal = false;
                  alert("Sửa thành công");
                  this.list.forEach((e) => {
                    if (e.id == this.editStudent.id) {
                      e.fullName = this.editStudent.fullName;
                      e.birthday = this.convertBirthday(this.editStudent.birthday);
                      e.gender = this.editStudent.gender;
                      e.classID = this.editStudent.classID;
                      e.address = this.editStudent.address;
                    }
                  });
=======
      if (this.validateAge(this.editStudent.birthday)) {
        //Send API

        StudentService.editStudent({
          id: this.editStudent.id,
          fullName: this.editStudent.fullName,
          idClass: this.editStudent.classID,
          sex: this.editStudent.gender,
          birthDay: this.editStudent.birthday,
          address: this.editStudent.address,
          oldIdClass: this.editStudent.oldClassID,
        })
          .then(({ data }) => {
            if (data.status) {
              this.showModal = false;
              alert("Sửa thành công");
              this.list.forEach((e) => {
                if (e.id == this.editStudent.id) {
                  e.fullName = this.editStudent.fullName;
                  e.birthday = this.convertBirthday(this.editStudent.birthday);
                  e.gender = this.editStudent.gender;
                  e.classID = this.editStudent.classID;
                  e.address = this.editStudent.address;
>>>>>>> e8bda3e0150a6ab00d6754ae3958ee9dcc57ccf8
                }
              })
              .catch((e) => console.log(e));
        
        } else alert("Ngày sinh không hợp lệ! Vui lòng nhập lại");
  
      
    },
    editRegulation() {
      //Validate
      if (this.editedRegulation.minAge && this.editedRegulation.maxAge) {
        this.regulation = { ...this.editedRegulation };
        //Call API for updating
        RoleService.updateValidAge({
          minAge: this.editedRegulation.minAge,
          maxAge: this.editedRegulation.maxAge,
        }).then(({ data }) => {
          if (data.status) {
            alert("Cập nhật qui định thành công");
          }
        });

        this.showModalRegulation = false;
      }
    },
    showModalAndEdit(item) {
      this.showModal = true;
      this.editStudent = { ...item };
      this.editStudent.classID = item.classID;
      this.editStudent.oldClassID = this.editStudent.classID ;
    },
    showEditRegulationModal() {
      this.showModalRegulation = true;
      this.editedRegulation = { ...this.regulation };
    
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
  width: 128px;
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
.sort-btn svg {
  color: green;
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
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
