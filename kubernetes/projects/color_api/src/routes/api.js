const os = require('os')
const apiRouter = require('express').Router()
const {getColor, getHostname} = require('../utils')

apiRouter.get('/', (req, res) => {
    const {format} = req.query //localhost/api?format=<text | json>
    
    const color = getColor()
    const hostname = getHostname()

    if (format === 'json') {
        return  res.json({
        color,
        hostname
    })
    }
    return res.send(`Color: ${color}\t Hostname: ${hostname} `)
})

module.exports = {
    apiRouter
}