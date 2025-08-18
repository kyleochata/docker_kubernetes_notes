const rootRouter = require('express').Router()
const { getHostname } = require('../utils')
const { getColor } = require('../db/color')

const hostname = getHostname()


rootRouter.get("/", async (req, res) => {
    const { colorKey } = req.query
    const color = await getColor({ key: colorKey })

    res.send(`<h1 style="color:${color}"> Hello from Color-API </h1>
<h2>Hostname: ${hostname}</h2>`)
})

module.exports = {
    rootRouter
}