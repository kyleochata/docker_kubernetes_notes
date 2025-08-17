const express = require('express')

const {healthRouter} = require("./routes/health")
const { apiRouter } = require('./routes/api')
const { rootRouter } = require('./routes/root')


const app = express()
const port= 80
const delay_startup = process.env.DELAY_STARTUP === 'true'
console.log(`Delay startup: ${delay_startup}`)

app.use("/", rootRouter)
app.use("/api", apiRouter)

// For probes: health, readiness, startup
app.use("/", healthRouter)


if (delay_startup) {
    const start = Date.now()

    //Purposefully block event loop and execution for 60s.
    // Illustrate startup probes
    while (Date.now() - start < 60000) {}
}

app.listen(port, () => {
    console.log(`server connected. Listening on port: ${port}`)
})