require('dotenv').config();
apiQaIntUrl = process.env.API_QA_INT_URL

module.exports = {
    sendResultsToApiQa : async (results) => {
        return new Promise((res, rej) => {
            fetch(`${apiQaIntUrl}/reports/runner/newman`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(results)
            }).then((response) => response.text()).then((response) => {
                res({ msg: response })
            }).catch(err => {
                rej({status: "err", log: err, msg: "execution finished but an error occured when trying to send results to api-qa"})
            })
        })
    }
}