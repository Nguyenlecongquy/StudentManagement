const DB = require('../connect/db');
var db;
try {
	db = DB.connect;
	console.log('student model connect database successfully!');
} catch (error) {
	console.log('student model connect database fail!');
}

const studentModel = {
	fieldId: (id) => (id == '' ? true : "ma_hs ='" + id + "'"),
	fieldFullName: (fullName) => (fullName == '' ? true : "ten_hs ='" + fullName + "'"),

	findHSs: async (id, fullName) => {
		const result = await db.any(
			`select * from hoc_sinh 
         where ${studentModel.fieldId(id)} 
         and ${studentModel.fieldFullName(fullName)} ;`
		);
		return result;
	},
	addHSIntoDatabaseReturnHS: async (id, fullName, sex, birthDay, address, idClass) => {
		try {
			const result = await db.any(
				`insert into hoc_sinh(ma_hs, ten_hs, ma_lop, ngay_sinh_hs, gioi_tinh_hs, dia_chi_hs) 
            values($1,$2,$3,$4,$5,$6) returning *`,
				[id, fullName, idClass, birthDay, sex, address]
			);
			return result;
		} catch (error) {
			return false;
		}
	},
	updateHSIntoDatabase: async (id, fullName, sex, birthDay, address, idClass) => {
		try {
			const result = await db.any(
				`update hoc_sinh 
                                 set  ten_hs=$1, ma_lop=$2, ngay_sinh_hs=$3, gioi_tinh_hs=$4, dia_chi_hs=$5
                                 where ma_hs=$6 returning *`,
				[fullName, idClass, birthDay, sex, address, id]
			);
			return result;
		} catch (error) {
			return false;
		}
	},
	removeHSfromDatabase: async (id) => {
		try {
			const result = await db.any('delete from hoc_sinh where ma_hs=$1 returning *;', [id]);
			return result;
		} catch (error) {
			return false;
		}
	},
};

module.exports = studentModel;
