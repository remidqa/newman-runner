require('dotenv').config();
const { exec } = require("child_process");
const fs = require("fs")

const postmanApiUrl = "https://api.postman.com"
const postmanApiKey = process.env.POSTMAN_API_KEY

module.exports = {
    runNewman: async (coll_id, env_id) => {
        coll_url = `${postmanApiUrl}/collections/${coll_id}?apikey=${postmanApiKey}`
        env_url = `${postmanApiUrl}/environments/${env_id}?apikey=${postmanApiKey}`
        report_output = `reports/${coll_id}_${env_id}_${Date.now()}.json`
        cmd = `newman run ${coll_url} -e ${env_url} -r json-summary,cli --reporter-summary-json-export ${report_output}`
        return new Promise(async (res, rej) => {
            exec(cmd, (err, stdout, stderr) => {
                fs.readFile(report_output, "utf-8", (err, data) => {
                    if (err) {
                        rej({ err: "something wrong after execution, when trying to fetch .json report" })
                    };
                    const fileExist = fs.existsSync(report_output)
                    if (fileExist) { fs.rmSync(report_output) }
                    data = JSON.parse(data)
                    res(data)
                })
            })
        })
    }
}