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
        v-model="searchValue.name"
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
          v-model="addedTeacher.name"
          type="text"
          placeholder="Họ tên"
        />
        <input
          class="input"
          v-model="addedTeacher.birthday"
          type="text"
          placeholder="Ngày sinh"
        />
        <input
          class="input"
          v-model="addedTeacher.faculty"
          type="text"
          placeholder="Mã khoa"
        />
        <ButtonVue title="Thêm" @click="add()" primary="true" />
      </div>
      <table>
        <caption>
          Danh sách giáo viên
        </caption>
        <tr>
          <th width="10%">STT</th>
          <th width="20%">Mã GV</th>
          <th width="40%">Họ và tên</th>
          <th width="20%">Ngày sinh</th>
          <th width="10%">
            <button class="btn-add">
              <font-awesome-icon icon="fa-solid fa-circle-plus" />
            </button>
          </th>
        </tr>
        <tr v-for="item in list" :key="item.stt">
          <td>{{ item.stt }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.birthday }}</td>
          <td>
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
  </div>
</template>

<script>
import ButtonVue from "./Button.vue";
export default {
  name: "TeacherCom",
  components: { ButtonVue },
  data() {
    return {
      addedTeacher: {
        name: "",
        birthday: "",
      },
      list: [
        {
          stt: 1,
          id: "GV001",
          name: "Nguyen VAn A",
          birthday: "10/10/1999",
        },
        {
          stt: 2,
          id: "GV002",
          name: "Nguyen VAn B",
          birthday: "10/10/1999",
        },
        {
          stt: 3,
          id: "GV003",
          name: "Nguyen VAn C",
          birthday: "10/10/1999",
        },
      ],
      backupList: [],
      searchValue: {
        id: "",
        name: "",
      },
    };
  },
  mounted() {
    this.backupList = this.list.filter(() => true);
  },
  methods: {
    reset() {
      this.searchValue.id = "";
      this.searchValue.name = "";
      this.searchValue.faculty = "";

      //Gọi API để reset lại list
      this.list = this.backupList;
    },
    search() {
      //Send API and get result
      var result = [];
      var searchedId = this.searchValue.id;
      var searchedName = this.searchValue.name;

      if (searchedId != "") {
        result = this.backupList.filter((e) => {
          return e.id.toLowerCase().includes(searchedId.toLowerCase());
        });
      }

      if (searchedName != "") {
        this.backupList.forEach((e) => {
          if (e.name.toLowerCase().includes(searchedName.toLowerCase())) {
            if (!result.includes(e)) {
              result.push(e);
            }
          }
        });
      }

      if (searchedId && searchedName) {
        result = this.backupList.filter((e) => {
          return (
            e.id.toLowerCase().includes(searchedId.toLowerCase()) &&
            e.name.toLowerCase().includes(searchedName.toLowerCase())
          );
        });
      }
      this.list = result;
    },
    remove(item) {
      let result = confirm(`Bạn chắc chắn muốn xóa giáo viên ${item.name}`);
      if (result == true) {
        this.list = this.list.filter((e) => e != item);
        this.list.forEach((e, index) => {
          e.stt = index + 1;
        });

        //SendAPI
      }
    },
    validateTeacher() {},
    add() {
      const item = {
        stt: this.list[this.list.length - 1].stt + 1,
        id: "GV00x",
        name: this.addedTeacher.name,
        birthday: this.addedTeacher.birthday,
      };
      let checkExistTeacher = this.backupList.some(
        (e) => e.id.toLowerCase() == item.id.toLowerCase()
      );
      if (!checkExistTeacher) {
        //update result
        this.backupList.push(item);
        this.list = this.backupList;
        this.addedTeacher.name = "";
        this.addedTeacher.birthday = "";
        //Send API
      }
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
</style>
