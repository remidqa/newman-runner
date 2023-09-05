const {globSync} = require("glob")
const fs = require("fs")

require('dotenv').config();
apiQaIntUrl = process.env.API_QA_INT_URL

module.exports = {
    getReports: (coll_id) => {
        var f = []
        files = globSync(`reports/${coll_id}*.json`)
        files.forEach(file => {
            f.push(file.slice("reports/".length, file.length - ".json".length))
        });
        return { status: 200, msg: `report folder scanned for collection: '${coll_id}'`, reports: f }
    },
    getReport: (reportName) => {
        return JSON.parse(fs.readFileSync(`reports/${reportName}.json`, "utf-8"))
    },
    deleteReport: (reportName) => {
        fileExist = fs.existsSync(`reports/${reportName}.json`)
        if(!fileExist) {return {msg : `unable to find a report with name '${reportName}' (reports/${reportName}.json)`}}
        fs.unlinkSync(`reports/${reportName}.json`)
        return {status: 200, msg : `report removed succesfully`}
    }
}