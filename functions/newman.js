require('dotenv').config();
const { exec } = require("child_process");

const postmanApiUrl = "https://api.postman.com"
const postmanApiKey = process.env.POSTMAN_API_KEY

function addApiKey(key){
    return key ? `apikey=${key}` : ""
}

module.exports = {
    runNewman: async (coll_id, env_id) => {
        let coll_url = `${postmanApiUrl}/collections/${coll_id}?${addApiKey(postmanApiKey)}`
        let env_url = env_id !== null ? `${postmanApiUrl}/environments/${env_id}?${addApiKey(postmanApiKey)}` : ""
        let report_name = `${coll_id}_${env_id ? env_id : ""}_${Date.now()}`
        cmd = `newman run ${coll_url} ${env_id !== null ? '-e '+env_url : ''} -r json-summary,cli --reporter-summary-json-export reports/${report_name}.json`
        return new Promise(async (res, rej) => {
            exec(cmd, (err, stdout, stderr) => {
                res({status: 200, msg: "execution ended", report_name: report_name})
            })
        })
    }
}