
const DB = require('../connect/db')
var db;
try {
   db = DB.connect;
   console.log("Connect database success!")
} catch (error) {
   console.log("Connect database failure!")
}

const teacherModel = {
   /**
    * Tìm kiếm(mã số,họ tên)
    * Tìm kiếm tất cả(không tham số) 
    * Reset()
    * Thêm thông tin giáo viên(STT,Mã số, ngày sinh)
    * Xóa 1 hàng( xóa trong database) (Mã số)
    */
   findEmpty: async () => {
      return true;
   },
   findGVById: async (id) => {
      // try {
      const result = await db.one('select * from giao_vien where ma_gv=$1', [id]);
      return result;
      // } catch (error) {
      //    error.message = "Khng co id nay trong database";
      //    return {};
      // }
   },
   findGVsByFullName: async (fullName) => {
      const result = await db.any('select * from giao_vien where ten_gv=$1', [fullName]);
      return result;
   },
   findGVsByIdAndFullName: async (id, fullName) => {
      const result = await db.one('select * from giao_vien where ma_gv=$1 and ten_gv=$2', [id, fullName]);
      return result;
   },
   findAllGVs: async () => {
      const result = await db.any('select * from giao_vien');
      return result;
   },
   findGVs: async (id, fullName) => {
      if (id == undefined && fullName == undefined) {
         return teacherModel.findAllGVs();
      } else if (id == undefined) {
         return teacherModel.findGVsByFullName(fullName);
      } else if (fullName == undefined) {
         return teacherModel.findGVById(id);
      }
   },
   addGVIntoDatabaseReturnGV: async (id, fullName, birthDay) => {
      const result = await db.one(`insert into giao_vien(ma_gv,ten_gv,ngay_sinh_gv) 
         values($1,$2,$3) returning *`,
         [id, fullName, birthDay]);
      return result;
   },
   addGVIntoDatabaseReturnAll: async (id, fullName, birthDay) => {
      teacherModel.addGVIntoDatabase(id, fullName, birthDay);
      return teacherModel.findAllGVs();
   },
   updateGVIntoDatabase: async (id, fullName, birthDay, idFaculty) => {
      try {
         const result = await db.one(`update giao_vien 
                                 set  ten_gv=$1, ngay_sinh_gv=$2 ,ma_khoa=$3
                                 where ma_gv=$4 returning *`, [fullName, birthDay, idFaculty, id]);
         return result;
      } catch (error) {
         return id + ' notExist';
      }
   },
   removeGVfromDatabase: async (id) => {
      try {
         await db.any('delete from giao_vien where ma_gv=$1;', [id]);
         return true;
      } catch (error) {
         return false;
      }
   },




};

module.exports = teacherModel;