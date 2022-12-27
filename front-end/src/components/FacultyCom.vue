<template>
  <div class="pageContent">
    <h2 class="pageContent__heading">Khoa</h2>
    <div class="content">
      <h4 class="content__heading">Thêm khoa</h4>
      <div class="content__adding">
        <input
          class="input"
          v-model="addedFaculty.ma_khoa"
          type="text"
          placeholder="Mã khoa"
        />
        <input
          class="input"
          v-model="addedFaculty.ten_khoa"
          type="text"
          placeholder="Tên khoa"
        />
        <ButtonVue title="Thêm" @click="addFaculty()" primary="true" />
      </div>
      <table>
        <caption>
          Danh sách khoa
        </caption>
        <tr>
          <th width="10%">STT</th>
          <th width="20%">Mã khoa</th>
          <th width="50%">Tên khoa</th>
          <th width="20%">
            <button class="btn-add">
              <font-awesome-icon icon="fa-solid fa-circle-plus" />
            </button>
          </th>
        </tr>
        <tr v-for="(item, index) in list" :key="item.stt">
          <td>{{ index + 1 }}</td>
          <td>{{ item.ma_khoa }}</td>
          <td>{{ item.ten_khoa }}</td>
          <td>
            <button class="remove-btn" @click="remove(item)">
              <font-awesome-icon icon="fa-solid fa-circle-minus" />
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import ButtonVue from "./Button.vue";
import FacultyService from "../services/FacultyService";

export default {
  name: "FacultyCom",
  components: { ButtonVue },
  data() {
    return {
      list: [],
      backupList: [],
      addedFaculty: {
        ma_khoa: "",
        ten_khoa: "",
      },
    };
  },
  mounted() {
    FacultyService.searchFaculty()
      .then(({ data }) => {
        this.list = data.faculties;
        console.log(data);
      })
      .catch((e) => console.log(e));
  },
  methods: {
    addFaculty() {
      //Check if exists
      if (
        this.addedFaculty.ma_khoa.length > 0 &&
        this.addedFaculty.ten_khoa.length > 0
      ) {
        let result = this.list.some(
          (e) => e.ma_khoa == this.addedFaculty.ma_khoa
        );
        if (!result) {
          //Send API to add new item
          FacultyService.addFaculty({
            id: this.addedFaculty.ma_khoa,
            facultyName: this.addedFaculty.ten_khoa,
          })
            .then(({ data }) => {
              if (data.status) {
                this.list.push({
                  stt: this.list[this.list.length - 1].stt + 1,
                  ...this.addedFaculty,
                });
                this.addedFaculty.ma_khoa = "";
                this.addedFaculty.ten_khoa = "";
              }
            })
            .catch((e) => console.log(e));
        } else {
          alert("Mã khoa đã tồn tại");
        }
      }
    },
    remove(item) {
      let result = confirm(`Bạn chắc chắn muốn xóa lớp ${item.ten_khoa}`);
      if (result == true) {
        this.list = this.list.filter((e) => e != item);
        this.list.forEach((e, index) => {
          e.stt = index + 1;
        });
        //SendAPI
        FacultyService.deleteFaculty({ data: { id: item.ma_khoa } });
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
