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

fastify.post('/run/coll_id/:coll_id', async (req, rep) => {
    let coll_id = req.params.coll_id
    let env_id = req.query.env_id ? req.query.env_id : null
    return await runNewman(coll_id, env_id);
})

// Run the server!
fastify.listen({ host: "0.0.0.0", port: 5030 }, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})