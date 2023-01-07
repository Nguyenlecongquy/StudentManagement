const summarySemesterM = require('../../models/summarySemester.m');

class summarySemesterC {
	async search(req, res) {
		const response = { status: true, summarySemesters: [] };
		const summarySemester = req.query;
		const result = await summarySemesterM.findsummarySemester(summarySemester.semester);
		if (result != [] && result != false) response.summarySemesters = result;
		else response.status = false;
		res.status(200).json(response);
	}
	reset(req, res) {
		const response = { status: true, summarySemesters: [] };
		res.status(200).json(response);
	}
}

module.exports = new summarySemesterC();
