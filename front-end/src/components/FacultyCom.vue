<template>
  <div class="pageContent">
    <h2 class="pageContent__heading">Khối</h2>
    <div class="content">
      <h4 class="content__heading">Thêm khối</h4>
      <div class="content__adding">
        <input
          class="input"
          v-model="addedFaculty.facultyID"
          type="text"
          placeholder="Mã khối"
        />
        <input
          class="input"
          v-model="addedFaculty.facultyName"
          type="text"
          placeholder="Tên khối"
        />
        <ButtonVue title="Thêm" @click="addFaculty()" primary="true" />
      </div>
      <table>
        <caption>
          Danh sách khối
        </caption>
        <tr>
          <th width="10%">STT</th>
          <th width="20%">Mã khối</th>
          <th width="50%">Tên khối</th>
          <th width="20%">
            <button class="btn-add">
              <font-awesome-icon icon="fa-solid fa-circle-plus" />
            </button>
          </th>
        </tr>
        <tr v-for="item in list" :key="item.stt">
          <td>{{ item.stt }}</td>
          <td>{{ item.facultyID }}</td>
          <td>{{ item.facultyName }}</td>
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
export default {
  name: "FacultyCom",
  components: { ButtonVue },
  data() {
    return {
      list: [
        {
          stt: 1,
          facultyID: "TN",
          facultyName: "Tự nhiên",
        },
        {
          stt: 2,
          facultyID: "XH",
          facultyName: "Xã hội",
        },
      ],
      backupList: [],
      addedFaculty: {
        facultyID: "",
        facultyName: "",
      },
    };
  },
  methods: {
    addFaculty() {
      //Check if exists
      if (
        this.addedFaculty.facultyID.length > 0 &&
        this.addedFaculty.facultyName.length > 0
      ) {
        let result = this.list.some(
          (e) => e.facultyID == this.addedFaculty.facultyID
        );
        if (!result) {
          this.list.push({
            stt: this.list[this.list.length - 1].stt + 1,
            ...this.addedFaculty,
          });
          this.addedFaculty.facultyID = "";
          this.addedFaculty.facultyName = "";
        } else {
          alert("Mã khối đã tồn tại");
        }
      }
    },
    remove(item) {
      let result = confirm(`Bạn chắc chắn muốn xóa lớp ${item.facultyName}`);
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
