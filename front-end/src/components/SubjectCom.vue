
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
        <ButtonVue title="Thêm" @click="add()" primary="true" />
      </div>
      <table>
        <caption>
          Danh sách môn học
        </caption>
        <tr>
          <th width="10%">STT</th>
          <th width="30%">Mã môn học</th>
          <th width="40%">Tên môn học</th>
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
          type="text"
          placeholder="Mã môn học"      
        />
        <input
          class="input"
          v-model="editSubject.subjectName"
          type="text"
          placeholder="Tên môn học"
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

import SubjectService from "../services/SubjectService";

export default {
  fullName: "SubjectCom",
  components: { ButtonVue },
  data() {
    return {
      editSubject: {
        subjectId: "",
        subjectName: "",
      },
      addedSubject: {
        subjectId: "",
        subjectName: "",
      },
      showModal: false,
      list: [
        {
          subjectId: "MATH1",
          subjectName: "Toán",         
        },
        {
          subjectId: "PHYS2",
          subjectName: "Thể dục",
        },
        {
          subjectId: "LITE3",
          subjectName: "Văn",
        },
      ],
      searchValue: {
        subjectId: "",
        subjectName: "",
      },
    };
  },
  
  mounted() {
    
    //API for list subjects
    SubjectService.searchSubject()
      .then(({ data }) => {
        console.log(data);
        if (data.status) {
          this.list = this.convertData(data.subjects);
        }
      })
      .catch((e) => console.log(e));
  },
  
  methods: {
    
    convertData(rawData) {
      return rawData.map((e) => {
        return {
          subjectId: e.ma_mh,
          subjectName: e.ten_mh,
        };
      });
    },
    remove(item) {
      let result = confirm(`Bạn chắc chắn muốn xóa môn ${item.subjectId}`);
      if (result == true) {
        this.list = this.list.filter((e) => e != item);
        SubjectService.deleteSubject({ data: { subjectId: item.subjectId } });
      }
    },
    add() {
      if (
        this.addedSubject.subjectId &&
        this.addedSubject.subjectId 
      ) {
        if (true) {
          const item = {
            subjectId: this.addedSubject.subjectId,
            subjectName: this.addedSubject.subjectName,
          };
          //Send API
          SubjectService.addSubject({
            ...item,
            
          })
            .then(({ data }) => {
              if (data.status) {
                //update result
                this.list.push({
                  ...item,
                  subjectId: this.addedSubject.subjectId,
                });
                this.addedSubject.subjectId = "";
                this.addedSubject.subjectName = "";
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
    
    showModalAndEdit(item) {
      this.showModal = true;
      this.editSubject = { ...item };
    },
    
    edit() {
      //Send API
      SubjectService.editSubject({
        subjectId: this.editSubject.subjectId,
        subjectName: this.editSubject.subjectName,       
      })
        .then(({ data }) => {
          if (data.status) {
            this.showModal = false;
            alert("Sửa thành công");
            this.list.forEach((e) => {
              if (e.subjectId == this.editSubject.subjectId) {
                e.subjectName = this.editSubject.subjectName;
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
