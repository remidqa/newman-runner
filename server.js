const fastify = require('fastify')({ logger: true })
const { runNewman } = require("./functions/newman.js")
const { getReports, getReport, deleteReport} = require("./functions/reports.js")

fastify.get('/reports/coll_id/:coll_id', async (req, rep) => {
    let collId = req.params.coll_id
    return getReports(collId)
})

fastify.get('/report', async (req, rep) => {
    let reportName = req.query.report_name
    return getReport(reportName)
})

fastify.delete('/report', async (req, rep) => {
    let reportName = req.query.report_name
    return deleteReport(reportName)
})

fastify.post('/run', async (req, rep) => {
    console.log(req.body)
    let coll_id = req.body.coll_id
    let env_id = req.body.env_id
    let folder = req.body.folder
    return await runNewman(coll_id, env_id, folder);
})

// Run the server!
fastify.listen({ host: "0.0.0.0", port: 5030 }, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})