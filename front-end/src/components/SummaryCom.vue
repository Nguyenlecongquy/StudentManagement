<template>
  <div class="pageContent">
    <h2 class="pageContent__heading">Tổng kết</h2>
    <div class="search">
      <ButtonVue title="Tìm kiếm" primary="true" @click="search()" />         
      <select class="input" v-model="searchValue.subjectName">
        <option value="" disabled>Môn học</option>
        <option v-for="subjectName in subjectsList" v-bind:key="subjectName">
          {{ subjectName }}
        </option>
      </select>
      <select class="input" v-model="searchValue.semester">
          <option value="" disabled>Học kỳ</option>
          <option v-for="semester in semesters" v-bind:key="semester">
            {{ semester }}
          </option>
      </select>
      <!--- --->
      <ButtonVue title="Reset" @click="reset()" />
    </div>
    <div class="content">
      <table>
        <caption>
          Tổng kết các lớp
        </caption>
        <tr>
          <th width="10%">STT</th>
          <th width="20%">Lớp</th>
          <th width="25%">Sỉ số</th>
          <th width="20%">Đạt</th>
          <th width="25%">Tỉ lệ</th>      
        </tr>
        <tr v-for="(item, index) in list" :key="item">
          <td>{{ index + 1 }}</td>
          <td>{{ item.classID }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.passNumber }}</td>
          <td>{{ item.passPercent}}%</td>
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

import SubjectService from "../services/SubjectService";
import SummaryService from "../services/SummaryService";

export default {
  fullName: "SummaryCom",
  components: { ButtonVue },
  data() {
    return {
      
      list: [
      
      ],
      searchValue: {
        subjectName: "",
        semester:"",
      },
      classesList: [
       
      ],
      subjectsList: [
        
      ],
      semesters:[
        "HK1",
        "HK2",
      ]
    };
  },
  
  mounted() {
    
    //API for list teachers
    SummaryService.searchSummary()
      .then(({ data }) => {
        console.log(data);
        if (data.status) {
          this.list = this.convertData(data.summarys);
        }
      })
      .catch((e) => console.log(e));
    //API for list classes
    SubjectService.searchSubject()
      .then(({ data }) => {
        if (data.status) {
          this.subjectsList = Array.from(data.subjects).map((e) => {
            return e.ma_mh;
          });
        }
      })
      .catch((e) => console.log(e));
  },
  
  methods: {
    convertData(rawData) {
      return rawData.map((e) => {
        return {
          classID: e.lop,
          amount: e.siSo,
          passNumber: e.soLuongDat,
          passPercent: e.tiLe,
        };
      });
    },
    
    reset() {
      this.searchValue.subjectName = "";
      this.searchValue.semester = "";
      //Gọi API để reset lại list
      
      SummaryService.searchSummary()
        .then(({ data }) => {
          this.list = this.convertData(data.summaries);
        })
        .catch((e) => console.log(e));
      
    },
    
    search() {
      //Send API and get result
      const data = {
        params: {
          subjectId: this.searchValue.subjectName,
          semester: this.searchValue.semester,
        },
      };
      SummaryService.searchSummary(data)
        .then(({ data }) => {
          this.list = this.convertData(data.summarys);
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
  width: 150px;
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
