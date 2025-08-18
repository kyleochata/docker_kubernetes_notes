const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { healthRouter } = require("./routes/health")
const { apiRouter } = require('./routes/api')
const { rootRouter } = require('./routes/root')


const app = express()
const port = 80
const delay_startup = process.env.DELAY_STARTUP === 'true'
console.log(`Delay startup: ${delay_startup}`)
app.use(bodyParser.json())
// CENTRAL ERROR-HANDLE
app.use((err, req, res, next) => {
    console.error(err)
    const status = err.status || 500
    const message = err.message || "Internal Server Error"
    res.status(status).json({error: message})
})

app.use("/", rootRouter)
app.use("/api", apiRouter)

// For probes: health, readiness, startup
app.use("/", healthRouter)


if (delay_startup) {
    const start = Date.now()

    //Purposefully block event loop and execution for 60s.
    // Illustrate startup probes
    while (Date.now() - start < 60000) { }
}

mongoose.connect(process.env.DB_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`server connected. Listening on port: ${port}`)
        })
        console.log('connected to colorsdb')
    }).catch(err => console.error(err))
