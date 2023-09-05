require('dotenv').config();
const { exec } = require("child_process");
const fs = require("fs")

const postmanApiUrl = "https://api.postman.com"
const postmanApiKey = process.env.POSTMAN_API_KEY

// newman run https://api.postman.com/collections/3868907-833eff2a-946d-40ab-bcc1-82ea0b8155c7?apikey=PMAK-64e7586a37769907b2b15d08-0d4a5fd6f7e65591c1cdb510d45f80b6f6 -e https://api.postman.com/environments/3868907-c722c767-e711-4467-9cb2-27d12cfa7d14?apikey=PMAK-64e7586a37769907b2b15d08-0d4a5fd6f7e65591c1cdb510d45f80b6f6 -r json,cli --reporter-json-export reports/3868907-833eff2a-946d-40ab-bcc1-82ea0b8155c7_3868907-c722c767-e711-4467-9cb2-27d12cfa7d14_245456415654051321.json

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