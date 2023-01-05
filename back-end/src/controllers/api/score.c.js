const scoreM = require('../../models/score.m');

class scoreC {
	async search(req, res) {
		const response = { status: true, scores: [] };
		const score = req.query;
		console.log(score);
		const result = await scoreM.findScores(score.classId, score.subjectId, score.semester);
		if (result != [] && result != false) response.scores = result;
		else response.status = false; // khi tìm sai id
		res.status(200).json(response);
	}
	reset(req, res) {
		const response = { status: true, scores: [] };
		res.status(200).json(response);
	}
	async add(req, res) {
		const response = { status: true, scores: [] };
		const score = req.body;
		console.log(score);
		const result = await scoreM.addScoresIntoDatabaseReturnScores(
			score.idStudent,
			score.idSubject,
			score.semester,
			score.mark_15,
			score.mark_1t,
			score.mark_gk,
			score.mark_ck,
			score.mark_tk
		);
		console.log(result);
		if (result != [] && result != false) response.scores = result;
		else response.status = false; // lỗi mã học sinh, mã môn học
		res.status(200).json(response);
	}
	async modify(req, res) {
		const response = { status: true, scores: [] };
		const score = req.body;
		const result = await scoreM.updateScoreIntoDatabaseReturnScores(
			score.idStudent,
			score.idSubject,
			score.semester,
			score.mark_15,
			score.mark_1t,
			score.mark_gk,
			score.mark_ck,
			score.mark_tk
		);
		if (result != [] && result != false) response.scores = result;
		else response.status = false; // lỗi mã học sinh, mã môn học
		res.status(200).json(response);
	}
	async remove(req, res) {
		const response = { status: true, scores: [] };
		const score = req.body;
		const result = await scoreM.removeScoreFromDatabase(
			score.className,
			score.subjectName,
			score.semester
		);
		if (result != [] && result != false) response.scores = result;
		else response.status = false; // lỗi mã học sinh, mã môn học
		res.status(200).json(response);
	}
}

module.exports = new scoreC();
