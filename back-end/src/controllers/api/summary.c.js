const summaryM = require('../../models/summary.m')

class summaryC {
    async search(req, res) {
        const response = {status:true, summarys: [] };
        const summary = req.query;
        const result = await summaryM.findsummarys(summary.className, summary.subjectName,summary.semester);
        if(result!= [] && result!= false ) response.summarys = result;
        else response.status = false; // khi tìm sai id 
        res.status(200).json(response);
    }
    reset(req, res) {
        const response = {status:true, summarys: [] };
        res.status(200).json(response);
    }
   
}

module.exports = new summaryC;