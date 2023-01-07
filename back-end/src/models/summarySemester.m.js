const DB = require('../connect/db');
var db;
try {
	db = DB.connect;
	console.log('summarySemester model connect database successfully!');
} catch (error) {
	console.log('summarySemester model connect database fail!');
}

const summarySemesterModel = {
	fieldClassId: (classId) => (classId == undefined ? true : "ma_lop = '" + classId + "'"),
	fieldStudentId: (studentId) => (studentId == undefined ? true : "ma_hs = '" + studentId + "'"),
	fieldSubjectId: (subjectId) => (subjectId == undefined ? true : "ma_mh = '" + subjectId + "'"),

	findsummarySemester_1Class: async (classId, semester) => {
		const minMark = await db.any(
			`select diem_chuan_dat_mon
			from qui_dinh
			`
		);
		var diemChuan = minMark[0].diem_chuan_dat_mon;

		const subjects = await db.any(
			`select *
		    from mon_hoc
		    `
		);
		const students = await db.any(
			`select *
		    from hoc_sinh
		    where ma_lop = $1;
		    `,
			[classId]
		);
		var diem;
		var diemTB = [];
		var soLuongDat = 0;
		for (let j = 0; j < students.length; j++) {
			diemTB[j] = 0;
			for (let i = 0; i < subjects.length; i++) {
				diem = await db.any(
					`SELECT diem_tk
		             FROM diem
		             WHERE ${summarySemesterModel.fieldSubjectId(subjects[i].ma_mh)}
		             AND ${summarySemesterModel.fieldStudentId(students[j].ma_hs)}
		             AND hoc_ki = $1 ;`,
					[semester]
				);
				diemTB[j] = diemTB[j] + diem[0].diem_tk;
			}
			diemTB[j] = diemTB[j] / subjects.length;
			if (diemTB[j] >= diemChuan) {
				soLuongDat++;
			}
		}
		console.log('soLuongDat', soLuongDat);
		const lopValue = await db.any(`SELECT * from lop where ma_lop = $1`, [classId]);
		var lop = lopValue[0].ma_lop; //lớp
		var siSo = lopValue[0].si_so_lop; //sĩ số
		var tiLe = 0;
		if (siSo != 0) {
			tiLe = (soLuongDat / siSo) * 100; //tỉ lệ đơn vị là %
		}

		var result = {
			lop,
			siSo,
			soLuongDat,
			tiLe,
		};
		console.log(lop);
		console.log(siSo);
		console.log(soLuongDat);
		console.log(tiLe);
		return result;
	},
	findsummarySemester: async (semester) => {
		var listSummary = [];
		const lopValue = await db.any(`SELECT * from lop`);

		for (let i = 0; i < lopValue.length; i++) {
			var summaryValue = await summarySemesterModel.findsummarySemester_1Class(
				lopValue[i].ma_lop,
				semester
			);
			listSummary[i] = summaryValue;
		}
		return listSummary;
	},
};

module.exports = summarySemesterModel;
