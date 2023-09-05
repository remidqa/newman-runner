const fastify = require('fastify')({ logger: true })
const { runNewman } = require("./functions/newman.js")
const { sendResultsToApiQa } = require("./functions/reports.js")

fastify.post('/run/coll_id/:coll_id/env_id/:env_id', async (req, rep) => {
    let coll_id = req.params.coll_id
    let env_id = req.params.env_id
    let newmanResults = await runNewman(coll_id, env_id);
    let postedResults = await sendResultsToApiQa(newmanResults)
    return postedResults
})

// Run the server!
fastify.listen({ host: "0.0.0.0", port: 5030 }, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})