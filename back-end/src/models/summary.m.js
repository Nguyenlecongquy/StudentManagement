const DB = require('../connect/db');
var db;
try {
	db = DB.connect;
	console.log('summary model connect database successfully!');
} catch (error) {
	console.log('summary model connect database fail!');
}

const minMark = 5; // điểm tối thiểu đạt môn, mình sẽ lấy từ database sau, giờ gán bằng 5 trước

const summaryModel = {
	fieldClassId: (classId) => (classId == undefined ? true : "hs.ma_lop = '" + classId + "'"),
	fieldSubjectId: (subjectId) =>
		subjectId == undefined ? true : "d.ma_mh = '" + subjectId + "'",

	findSummary_1Class: async (classId, subjectId, semester) => {
		const soLuongDatValue = await db.any(
			`SELECT count(*) as number
			 FROM diem d JOIN hoc_sinh hs ON d.ma_hs = hs.ma_hs
			 WHERE ${summaryModel.fieldClassId(classId)}
			 AND ${summaryModel.fieldSubjectId(subjectId)}
			 AND d.hoc_ki = $1
			 AND d.diem_tk >= $2 ;`,
			[semester, minMark]
		);
		const lopValue = await db.any(`SELECT * from lop where ma_lop = $1`, [classId]);
		var lop = lopValue[0].ten_lop; //lớp
		var siSo = lopValue[0].si_so_lop; //sĩ số
		var soLuongDat = soLuongDatValue[0].number;
		var tiLe = (soLuongDat / siSo) * 100; //tỉ lệ đơn vị là %

		var result = {
			lop,
			siSo,
			soLuongDat,
			tiLe,
		};

		return result;
	},

	findSummary: async (subjectId, semester) => {
		var listSummary = [];
		const lopValue = await db.any(`SELECT * from lop`);

		for (let i = 0; i < lopValue.length; i++) {
			var summaryValue = await summaryModel.findSummary_1Class(
				lopValue[i].ma_lop,
				subjectId,
				semester
			);
			listSummary[i] = summaryValue;
		}
		return listSummary;
	},
};

module.exports = summaryModel;
