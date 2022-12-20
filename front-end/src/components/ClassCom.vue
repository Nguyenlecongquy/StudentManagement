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
      <input
        class="input"
        v-model="searchValue.faculty"
        type="text"
        placeholder="Khối"
      />
      <ButtonVue title="Reset" @click="reset()" />
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
        <input
          class="input"
          v-model="addedClass.faculty"
          type="text"
          placeholder="Khối"
        />
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
        <tr v-for="item in list" :key="item.stt">
          <td>{{ item.stt }}</td>
          <td>{{ item.className }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.faculty }}</td>
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
  name: "ClassCom",
  components: { ButtonVue },
  data() {
    return {
      searchValue: {
        faculty: "",
        className: "",
      },
      list: [
        {
          stt: 1,
          faculty: "Tự nhiên",
          className: "11A1",
          amount: 20,
        },
        {
          stt: 2,
          faculty: "Tự nhiên",
          className: "10A1",
          amount: 20,
        },
        {
          stt: 3,
          faculty: "Xã hội",
          className: "11B",
          amount: 20,
        },
        {
          stt: 4,
          faculty: "Tự nhiên",
          className: "12C1",
          amount: 20,
        },
      ],
      backupList: [],
      addedClass: {
        faculty: "",
        className: "",
        amount: 0,
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    reset() {
      this.searchValue.faculty = "";
      this.searchValue.className = "";

      //Gọi API để reset lại list
      this.list = this.backupList;
    },
    getData() {
      //Call API
      this.backupList = this.list.filter(() => true);
    },
    search() {
      var result = [];
      let searchedFaculty = this.searchValue.faculty;
      let searchedClassName = this.searchValue.className;

      if (searchedFaculty != "") {
        result = this.backupList.filter((e) => {
          return e.faculty
            .toLowerCase()
            .includes(searchedFaculty.toLowerCase());
        });
      }

      if (searchedClassName != "") {
        this.backupList.forEach((e) => {
          if (
            e.className.toLowerCase().includes(searchedClassName.toLowerCase())
          ) {
            if (!result.includes(e)) {
              result.push(e);
            }
          }
        });
      }
      if (searchedFaculty != "" && searchedClassName != "") {
        result = this.backupList.filter(
          (e) =>
            e.faculty.toLowerCase().includes(searchedFaculty.toLowerCase()) &&
            e.className.toLowerCase().includes(searchedClassName.toLowerCase())
        );
      }
      this.list = result;
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
        this.list.forEach((e, index) => {
          e.stt = index + 1;
        });

        //SendAPI
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
.search {
  margin-top: 10px;
}
.input {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 8px 12px;
  margin-left: 12px;
  border-radius: 3px;
  font-size: 14px;
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
</style>
