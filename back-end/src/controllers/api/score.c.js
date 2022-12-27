const scoreM = require('../../models/score.m')

class scoreC {
   async search(req, res) {
      const response = {status:true, scores: [] };
      const score = req.query;
      const result = await scoreM.findScores(score.className, score.subjectName,score.semester);
      if(result!= [] && result!= false ) response.scores = result;
      else response.status = false; // khi tìm sai id 
      res.status(200).json(response);
   }
   reset(req, res) {
      const response = {status:true, scores: [] };
      res.status(200).json(response);
   }
   async add(req, res) {
      const response = {status:true, scores: [] };
      const score = req.body;
      const result = await scoreM.addScoresIntoDatabaseReturnScores(
        score.className,score.subjectName,score.semester,score.mark_15,score.mark_1t, score.mark_gk, score.mark_ck, score.mark_tk);
      if(result!= [] && result!= false ) response.scores = result;
      else response.status = false; // lỗi mã học sinh, mã môn học
      res.status(200).json(response);
   }
   async modify(req, res) {
      const response = {status:true, scores: [] };
      const score = req.body;
      const result = await scoreM.updateScoreIntoDatabaseReturnScores(
        score.className,score.subjectName,score.semester,score.mark_15,score.mark_1t, score.mark_gk, score.mark_ck, score.mark_tk);
      if(result!= [] && result!= false ) response.scores = result;
      else response.status = false; // lỗi mã học sinh, mã môn học
      res.status(200).json(response);
   }
   async remove(req, res) {
      const response = {status:true, scores: [] };
      const score = req.body;
      const result = await scoreM.removeScoreFromDatabase(
        score.className,score.subjectName,score.semester);
      if(result!= [] && result!= false ) response.scores = result;
      else response.status = false; // lỗi mã học sinh, mã môn học
      res.status(200).json(response);
   }
}

module.exports = new scoreC;