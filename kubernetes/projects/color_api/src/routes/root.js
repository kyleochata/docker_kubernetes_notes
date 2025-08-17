const rootRouter = require('express').Router()
const {getColor, getHostname} = require('../utils')

const hostname = getHostname()
const color = getColor()

rootRouter.get("/", (req, res) => {
    res.send(`<h1 style="color:${color}"> Hello from Color-API </h1>
<h2>Hostname: ${hostname}</h2>`)
})

module.exports = {
    rootRouter
}